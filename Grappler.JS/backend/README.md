# GrappleAI Backend

AWS CDK-based backend for GrappleAI with Lambda functions and MCP server.

## Features

- **AWS Lambda:** Serverless compute
- **API Gateway:** REST API endpoints
- **DynamoDB:** NoSQL database
- **S3:** Evidence storage
- **MCP Server:** Model Context Protocol integration
- **Infrastructure as Code:** AWS CDK

## Tech Stack

- **AWS CDK:** Infrastructure as code
- **TypeScript:** Type-safe code
- **AWS Lambda:** Serverless functions
- **DynamoDB:** Database
- **S3:** Object storage
- **API Gateway:** REST API

## Quick Start

```bash
npm install
npm run cdk:deploy
```

## Project Structure

```
lib/
├── cdk/           # CDK stack definitions
├── lambda/        # Lambda handler
├── mcp/           # MCP server implementation
├── types/         # TypeScript types
└── index.ts       # CDK app entry point
```

## Available Scripts

- `npm run build` - Compile TypeScript
- `npm run watch` - Watch for changes
- `npm run cdk:deploy` - Deploy to AWS
- `npm run cdk:destroy` - Destroy stack
- `npm run cdk:diff` - Show deployment diff
- `npm run cdk:synth` - Synthesize CloudFormation

## AWS Resources

### Lambda Function
- Runtime: Node.js 20.x
- Memory: 512 MB
- Timeout: 30 seconds
- Handler: `index.handler`

### DynamoDB Tables

**Disputes Table**
- Partition Key: `id`
- Sort Key: `createdAt`
- GSI: `transactionIdIndex`

**Negotiations Table**
- Partition Key: `transactionId`

### S3 Bucket
- Versioning: Enabled
- Encryption: S3-managed
- Public Access: Blocked

### API Gateway
- REST API
- CORS enabled
- Integrated with Lambda

## MCP Server

The backend implements a Model Context Protocol server with these tools:

### secureEvidence
```typescript
secureEvidence(
  transactionId: string,
  damageDescription: string,
  confidenceScore: number
): Promise<Dispute>
```

Clutches evidence securely. If confidence > 0.8, freezes payment.

### negotiateRefund
```typescript
negotiateRefund(
  transactionId: string,
  sellerAgentId: string
): Promise<NegotiationResult>
```

Initiates autonomous negotiation with seller's agent.

### generateDisputeNotice
```typescript
generateDisputeNotice(
  transactionId: string,
  language?: string
): Promise<string>
```

Generates formal dispute notice in specified language.

### verifyConsumerRights
```typescript
verifyConsumerRights(
  transactionId: string,
  disputeType: string
): Promise<string[]>
```

Checks Consumer Protection Act 2019 for applicable rights.

## API Endpoints

### Disputes
- `POST /disputes` - Create dispute
- `GET /disputes` - List disputes
- `GET /disputes/{id}` - Get dispute
- `PUT /disputes/{id}` - Update dispute

### Evidence
- `POST /evidence/upload` - Upload evidence
- `GET /evidence/{id}` - Get evidence
- `POST /evidence/{id}/verify` - Verify evidence

### Negotiation
- `POST /negotiation/initiate` - Start negotiation
- `GET /negotiation/{transactionId}` - Get status

## Deployment

### Prerequisites

```bash
# Configure AWS credentials
aws configure

# Bootstrap CDK (first time only)
cdk bootstrap
```

### Deploy

```bash
npm run cdk:deploy
```

### Destroy

```bash
npm run cdk:destroy
```

## Environment Variables

Set in Lambda environment:

```
DISPUTES_TABLE=GrappleAIStack-DisputesTable-xxx
NEGOTIATIONS_TABLE=GrappleAIStack-NegotiationsTable-xxx
EVIDENCE_BUCKET=grappleaistack-evidencebucket-xxx
```

## Monitoring

### CloudWatch Logs

```bash
aws logs tail /aws/lambda/GrappleAIStack-MCPServerFunction --follow
```

### CloudWatch Metrics

- Invocations
- Duration
- Errors
- Throttles

### X-Ray Tracing

Enable in CDK stack:

```typescript
tracing: lambda.Tracing.ACTIVE
```

## Security

- IAM roles with least privilege
- Encryption at rest (S3, DynamoDB)
- Encryption in transit (HTTPS)
- VPC integration (optional)
- API key authentication (optional)

## Performance

- Lambda provisioned concurrency
- DynamoDB on-demand billing
- API Gateway caching
- CloudFront distribution

## Cost Optimization

- Use on-demand billing for DynamoDB
- Set Lambda memory appropriately
- Enable S3 lifecycle policies
- Use CloudFront for caching

## Troubleshooting

### Deployment fails
```bash
# Check AWS credentials
aws sts get-caller-identity

# Check CDK version
cdk --version

# Rebuild
npm run build
```

### Lambda timeout
- Increase timeout in `lib/cdk/stack.ts`
- Check CloudWatch logs
- Optimize code

### DynamoDB errors
- Verify table exists
- Check IAM permissions
- Monitor capacity

## Testing

```bash
npm run test
```

## Contributing

1. Create feature branch
2. Make changes
3. Run linter: `npm run lint`
4. Test changes
5. Submit PR

## License

MIT
