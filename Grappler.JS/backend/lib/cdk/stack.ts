import * as cdk from 'aws-cdk-lib'
import * as lambda from 'aws-cdk-lib/aws-lambda'
import * as apigateway from 'aws-cdk-lib/aws-apigateway'
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb'
import * as s3 from 'aws-cdk-lib/aws-s3'
import * as iam from 'aws-cdk-lib/aws-iam'
import { Construct } from 'constructs'
import * as path from 'path'

export class GrappleAIStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props)

    // S3 bucket for evidence storage
    const evidenceBucket = new s3.Bucket(this, 'EvidenceBucket', {
      versioned: true,
      encryption: s3.BucketEncryption.S3_MANAGED,
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
      removalPolicy: cdk.RemovalPolicy.RETAIN,
    })

    // DynamoDB table for disputes
    const disputesTable = new dynamodb.Table(this, 'DisputesTable', {
      partitionKey: { name: 'id', type: dynamodb.AttributeType.STRING },
      sortKey: { name: 'createdAt', type: dynamodb.AttributeType.STRING },
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    })

    // Add GSI for transaction ID lookup
    disputesTable.addGlobalSecondaryIndex({
      indexName: 'transactionIdIndex',
      partitionKey: { name: 'transactionId', type: dynamodb.AttributeType.STRING },
      projectionType: dynamodb.ProjectionType.ALL,
    })

    // DynamoDB table for negotiations
    const negotiationsTable = new dynamodb.Table(this, 'NegotiationsTable', {
      partitionKey: { name: 'transactionId', type: dynamodb.AttributeType.STRING },
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    })

    // Lambda execution role
    const lambdaRole = new iam.Role(this, 'LambdaExecutionRole', {
      assumedBy: new iam.ServicePrincipal('lambda.amazonaws.com'),
      managedPolicies: [
        iam.ManagedPolicy.fromAwsManagedPolicyName('service-role/AWSLambdaBasicExecutionRole'),
      ],
    })

    // Grant permissions
    evidenceBucket.grantReadWrite(lambdaRole)
    disputesTable.grantReadWriteData(lambdaRole)
    negotiationsTable.grantReadWriteData(lambdaRole)

    // Lambda function for MCP server
    const mcpLambda = new lambda.Function(this, 'MCPServerFunction', {
      runtime: lambda.Runtime.NODEJS_20_X,
      handler: 'index.handler',
      code: lambda.Code.fromAsset(path.join(__dirname, '../lambda'), {
        bundling: {
          image: lambda.Runtime.NODEJS_20_X.bundlingImage,
          command: [
            'bash',
            '-c',
            'npm install && npm run build && cp -r dist/* /asset-output/',
          ],
        },
      }),
      role: lambdaRole,
      timeout: cdk.Duration.seconds(30),
      memorySize: 512,
      environment: {
        DISPUTES_TABLE: disputesTable.tableName,
        NEGOTIATIONS_TABLE: negotiationsTable.tableName,
        EVIDENCE_BUCKET: evidenceBucket.bucketName,
      },
    })

    // API Gateway
    const api = new apigateway.RestApi(this, 'GrappleAIAPI', {
      restApiName: 'GrappleAI API',
      description: 'API for GrappleAI dispute resolution',
      defaultCorsPreflightOptions: {
        allowOrigins: apigateway.Cors.ALL_ORIGINS,
        allowMethods: apigateway.Cors.ALL_METHODS,
        allowHeaders: ['Content-Type', 'Authorization'],
      },
    })

    // API Gateway integration
    const integration = new apigateway.LambdaIntegration(mcpLambda)

    // Routes
    const disputes = api.root.addResource('disputes')
    disputes.addMethod('GET', integration)
    disputes.addMethod('POST', integration)

    const dispute = disputes.addResource('{id}')
    dispute.addMethod('GET', integration)
    dispute.addMethod('PUT', integration)

    const evidence = api.root.addResource('evidence')
    const uploadEvidence = evidence.addResource('upload')
    uploadEvidence.addMethod('POST', integration)

    const negotiation = api.root.addResource('negotiation')
    const initiateNegotiation = negotiation.addResource('initiate')
    initiateNegotiation.addMethod('POST', integration)

    const negotiationStatus = negotiation.addResource('{transactionId}')
    negotiationStatus.addMethod('GET', integration)

    // Outputs
    new cdk.CfnOutput(this, 'APIEndpoint', {
      value: api.url,
      description: 'GrappleAI API Endpoint',
    })

    new cdk.CfnOutput(this, 'DisputesTableName', {
      value: disputesTable.tableName,
      description: 'DynamoDB Disputes Table Name',
    })

    new cdk.CfnOutput(this, 'EvidenceBucketName', {
      value: evidenceBucket.bucketName,
      description: 'S3 Evidence Bucket Name',
    })
  }
}
