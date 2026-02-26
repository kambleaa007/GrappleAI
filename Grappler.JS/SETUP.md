# GrappleAI - Setup Guide

Complete setup guide for GrappleAI application with React frontend and AWS CDK Lambda backend.

## Project Structure

```
grappleai/
├── app/                    # React frontend
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── pages/         # Page components
│   │   ├── services/      # API services
│   │   ├── store/         # Zustand state management
│   │   ├── types/         # TypeScript types
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── index.css
│   ├── package.json
│   ├── tsconfig.json
│   ├── vite.config.ts
│   └── tailwind.config.js
│
├── backend/               # AWS CDK + Lambda + MCP Server
│   ├── lib/
│   │   ├── cdk/          # CDK stack definitions
│   │   ├── lambda/       # Lambda handler
│   │   ├── mcp/          # MCP server implementation
│   │   ├── types/        # TypeScript types
│   │   └── index.ts
│   ├── package.json
│   ├── tsconfig.json
│   └── cdk.json
│
└── SETUP.md              # This file
```

## Prerequisites

- Node.js 18+ and npm
- AWS Account with credentials configured
- AWS CDK CLI: `npm install -g aws-cdk`
- Git

## Frontend Setup (React)

### 1. Install Dependencies

```bash
cd app
npm install
```

### 2. Configure Environment

```bash
cp .env.example .env.local
```

Edit `.env.local` to set your API endpoint:

```
VITE_API_URL=http://localhost:3001/api
```

### 3. Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### 4. Build for Production

```bash
npm run build
npm run preview
```

## Backend Setup (AWS CDK + Lambda)

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Configure AWS Credentials

```bash
aws configure
```

Provide your AWS Access Key ID, Secret Access Key, and default region.

### 3. Bootstrap CDK (First time only)

```bash
cdk bootstrap
```

### 4. Deploy to AWS

```bash
npm run cdk:deploy
```

This will:
- Create S3 bucket for evidence storage
- Create DynamoDB tables for disputes and negotiations
- Deploy Lambda function with MCP server
- Create API Gateway endpoints
- Output the API endpoint URL

### 5. Get API Endpoint

After deployment, the API endpoint will be displayed. Update your frontend `.env.local`:

```
VITE_API_URL=https://your-api-id.execute-api.region.amazonaws.com/prod/api
```

## API Endpoints

### Disputes

- `POST /disputes` - Create a new dispute
- `GET /disputes` - List all disputes
- `GET /disputes/{id}` - Get dispute details
- `PUT /disputes/{id}` - Update dispute status

### Evidence

- `POST /evidence/upload` - Upload evidence (image/video)
- `GET /evidence/{id}` - Get evidence details
- `POST /evidence/{id}/verify` - Verify evidence

### Negotiation

- `POST /negotiation/initiate` - Start negotiation with seller
- `GET /negotiation/{transactionId}` - Get negotiation status

## MCP Server Tools

The backend exposes these MCP tools:

### 1. Secure Evidence

```typescript
secureEvidence(
  transactionId: string,
  damageDescription: string,
  confidenceScore: number
): Promise<Dispute>
```

Clutches evidence securely. If confidence > 0.8, freezes payment.

### 2. Negotiate Refund

```typescript
negotiateRefund(
  transactionId: string,
  sellerAgentId: string
): Promise<NegotiationResult>
```

Initiates autonomous negotiation with seller's agent.

### 3. Generate Dispute Notice

```typescript
generateDisputeNotice(
  transactionId: string,
  language?: string
): Promise<string>
```

Generates formal dispute notice in specified language.

### 4. Verify Consumer Rights

```typescript
verifyConsumerRights(
  transactionId: string,
  disputeType: string
): Promise<string[]>
```

Checks Consumer Protection Act 2019 for applicable rights.

## Development Workflow

### Frontend Development

```bash
cd app
npm run dev          # Start dev server
npm run lint         # Run linter
npm run type-check   # Check TypeScript
npm run build        # Build for production
```

### Backend Development

```bash
cd backend
npm run build        # Compile TypeScript
npm run watch        # Watch for changes
npm run cdk:diff     # See what will be deployed
npm run cdk:deploy   # Deploy to AWS
npm run cdk:destroy  # Destroy stack
```

## Testing

### Frontend Tests

```bash
cd app
npm run test
```

### Backend Tests

```bash
cd backend
npm run test
```

## Deployment

### Frontend Deployment

Deploy to AWS S3 + CloudFront:

```bash
cd app
npm run build
# Upload dist/ to S3 bucket
```

Or use Vercel/Netlify:

```bash
npm run build
# Connect to Vercel/Netlify
```

### Backend Deployment

```bash
cd backend
npm run cdk:deploy
```

## Monitoring & Logs

### Lambda Logs

```bash
aws logs tail /aws/lambda/GrappleAIStack-MCPServerFunction --follow
```

### API Gateway Logs

Enable in AWS Console:
- API Gateway → Stages → Logs

### CloudWatch Metrics

Monitor in AWS Console:
- CloudWatch → Dashboards
- Lambda → Monitoring
- DynamoDB → Monitoring

## Troubleshooting

### Frontend Issues

**Port already in use:**
```bash
# Kill process on port 5173
lsof -ti:5173 | xargs kill -9
```

**API connection errors:**
- Check `VITE_API_URL` in `.env.local`
- Ensure backend is running
- Check CORS settings in API Gateway

### Backend Issues

**CDK deployment fails:**
```bash
# Check AWS credentials
aws sts get-caller-identity

# Bootstrap if needed
cdk bootstrap

# Check for syntax errors
npm run build
```

**Lambda timeout:**
- Increase timeout in `lib/cdk/stack.ts`
- Check CloudWatch logs for errors

**DynamoDB errors:**
- Verify table exists: `aws dynamodb list-tables`
- Check IAM permissions

## Environment Variables

### Frontend (.env.local)

```
VITE_API_URL=http://localhost:3001/api
VITE_APP_NAME=GrappleAI
VITE_APP_VERSION=1.0.0
```

### Backend (AWS Lambda)

Set via CDK environment variables:

```typescript
environment: {
  DISPUTES_TABLE: disputesTable.tableName,
  NEGOTIATIONS_TABLE: negotiationsTable.tableName,
  EVIDENCE_BUCKET: evidenceBucket.bucketName,
}
```

## Security Best Practices

1. **API Keys:** Implement API key authentication
2. **CORS:** Restrict to your domain in production
3. **Data Encryption:** Enable encryption at rest and in transit
4. **IAM Roles:** Use least privilege principle
5. **Secrets:** Use AWS Secrets Manager for sensitive data
6. **Input Validation:** Validate all user inputs
7. **Rate Limiting:** Implement rate limiting on API Gateway

## Performance Optimization

### Frontend

- Code splitting with React Router
- Image optimization
- Lazy loading components
- Minification and compression

### Backend

- Lambda provisioned concurrency
- DynamoDB on-demand billing
- CloudFront caching
- API Gateway caching

## Next Steps

1. Implement authentication (OAuth2/JWT)
2. Add database persistence (DynamoDB integration)
3. Implement file upload to S3
4. Add email notifications
5. Implement multi-language support
6. Add analytics and monitoring
7. Set up CI/CD pipeline

## Support

For issues or questions:
1. Check CloudWatch logs
2. Review AWS CDK documentation
3. Check React/Vite documentation
4. Open an issue on GitHub

---

*GrappleAI - Active Defense Layer for Consumers*
