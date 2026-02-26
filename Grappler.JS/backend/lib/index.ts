import * as cdk from 'aws-cdk-lib'
import { GrappleAIStack } from './cdk/stack'

const app = new cdk.App()

new GrappleAIStack(app, 'GrappleAIStack', {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION || 'us-east-1',
  },
})

app.synth()
