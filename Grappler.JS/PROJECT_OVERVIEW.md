# GrappleAI - Complete Project Overview

## Project Summary

GrappleAI is an AI-driven dispute resolution platform built with React frontend and AWS CDK Lambda backend. It implements the Active Defense Layer for Consumers (AI-DLC) using the Model Context Protocol (MCP) for autonomous dispute negotiation.

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     React Frontend (Vite)                    │
│  ┌──────────────────────────────────────────────────────┐   │
│  │ Dashboard | Create Dispute | Dispute Details        │   │
│  │ Components: DisputeForm, DisputeCard, Dashboard      │   │
│  │ State: Zustand (useDisputeStore)                     │   │
│  │ Styling: Tailwind CSS                               │   │
│  └──────────────────────────────────────────────────────┘   │
└────────────────────────┬────────────────────────────────────┘
                         │ HTTP/REST
                         ▼
┌─────────────────────────────────────────────────────────────┐
│              AWS API Gateway (REST API)                      │
│  ┌──────────────────────────────────────────────────────┐   │
│  │ /disputes, /evidence, /negotiation endpoints        │   │
│  │ CORS enabled, request validation                    │   │
│  └──────────────────────────────────────────────────────┘   │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│         AWS Lambda (Node.js 20.x, 512MB)                    │
│  ┌──────────────────────────────────────────────────────┐   │
│  │ MCP Server Implementation                           │   │
│  │ ├─ secureEvidence()                                 │   │
│  │ ├─ negotiateRefund()                                │   │
│  │ ├─ generateDisputeNotice()                          │   │
│  │ └─ verifyConsumerRights()                           │   │
│  │                                                      │   │
│  │ Request Handler (handler.ts)                        │   │
│  │ ├─ Route requests to MCP tools                      │   │
│  │ ├─ Validate inputs                                 │   │
│  │ └─ Return responses                                │   │
│  └──────────────────────────────────────────────────────┘   │
└────────────────────────┬────────────────────────────────────┘
                         │
        ┌────────────────┼────────────────┐
        ▼                ▼                ▼
┌──────────────┐  ┌──────────────┐  ┌──────────────┐
│  DynamoDB    │  │  DynamoDB    │  │   S3 Bucket  │
│  Disputes    │  │ Negotiations │  │  Evidence    │
│  Table       │  │  Table       │  │  Storage     │
└──────────────┘  └──────────────┘  └──────────────┘
```

## Technology Stack

### Frontend
- **React 18.3.1** - UI framework
- **TypeScript 5.3.3** - Type safety
- **Vite 5.0.8** - Build tool
- **Tailwind CSS 3.4.1** - Styling
- **Zustand 4.4.7** - State management
- **React Router 6.20.1** - Navigation
- **Axios 1.6.5** - HTTP client
- **Lucide React 0.294.0** - Icons

### Backend
- **AWS CDK 2.120.0** - Infrastructure as code
- **AWS Lambda** - Serverless compute
- **AWS API Gateway** - REST API
- **AWS DynamoDB** - NoSQL database
- **AWS S3** - Object storage
- **TypeScript 5.3.3** - Type safety
- **Node.js 20.x** - Runtime

## File Structure

```
grappleai/
├── app/                          # React Frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── DisputeForm.tsx   # Form for creating disputes
│   │   │   └── DisputeCard.tsx   # Card displaying dispute
│   │   ├── pages/
│   │   │   ├── Dashboard.tsx     # Main dashboard
│   │   │   └── CreateDispute.tsx # Create dispute page
│   │   ├── services/
│   │   │   └── api.ts            # API client
│   │   ├── store/
│   │   │   └── useDisputeStore.ts # Zustand store
│   │   ├── types/
│   │   │   └── index.ts          # TypeScript types
│   │   ├── App.tsx               # Main app component
│   │   ├── main.tsx              # Entry point
│   │   └── index.css             # Global styles
│   ├── index.html                # HTML template
│   ├── package.json
│   ├── tsconfig.json
│   ├── vite.config.ts
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   ├── .env.example
│   ├── .gitignore
│   └── README.md
│
├── backend/                      # AWS CDK Backend
│   ├── lib/
│   │   ├── cdk/
│   │   │   └── stack.ts          # CDK stack definition
│   │   ├── lambda/
│   │   │   └── handler.ts        # Lambda handler
│   │   ├── mcp/
│   │   │   └── server.ts         # MCP server implementation
│   │   ├── types/
│   │   │   └── index.ts          # TypeScript types
│   │   └── index.ts              # CDK app entry
│   ├── package.json
│   ├── tsconfig.json
│   ├── cdk.json
│   ├── .gitignore
│   └── README.md
│
├── SETUP.md                      # Setup guide
├── PROJECT_OVERVIEW.md           # This file
└── README.md                     # Main README
```

## Key Features

### 1. Dispute Management
- Create disputes with transaction details
- Upload evidence (images/videos)
- Track dispute status in real-time
- View dispute history

### 2. Evidence Verification
- Automatic confidence scoring
- Evidence clutching (secure storage)
- Tamper-proof evidence vault
- Multi-format support (image, video, document)

### 3. Autonomous Negotiation
- AI-driven negotiation strategies
- Confidence-based demand calculation
- Seller agent integration
- Negotiation status tracking

### 4. Consumer Rights
- Consumer Protection Act 2019 integration
- Automatic rights verification
- Multi-language dispute notices
- Legal framework compliance

### 5. Dashboard Analytics
- Total disputes count
- Resolution rate
- In-progress disputes
- Success metrics

## API Endpoints

### Disputes
```
POST   /disputes              Create new dispute
GET    /disputes              List all disputes
GET    /disputes/{id}         Get dispute details
PUT    /disputes/{id}         Update dispute status
```

### Evidence
```
POST   /evidence/upload       Upload evidence file
GET    /evidence/{id}         Get evidence details
POST   /evidence/{id}/verify  Verify evidence
```

### Negotiation
```
POST   /negotiation/initiate  Start negotiation
GET    /negotiation/{txId}    Get negotiation status
```

## MCP Server Tools

### 1. secureEvidence
Clutches evidence securely with confidence scoring.

**Input:**
- `transactionId`: Transaction identifier
- `damageDescription`: Description of damage/issue
- `confidenceScore`: Confidence score (0-1)

**Output:**
- Dispute object with secured evidence
- Fund freeze status if confidence > 0.8

### 2. negotiateRefund
Initiates autonomous negotiation with seller.

**Input:**
- `transactionId`: Transaction identifier
- `sellerAgentId`: Seller's agent identifier

**Output:**
- Negotiation strategy (aggressive/balanced/conservative)
- Demand amount
- Negotiation status

### 3. generateDisputeNotice
Generates formal dispute notice.

**Input:**
- `transactionId`: Transaction identifier
- `language`: Language code (en/hi/mr)

**Output:**
- Formal dispute notice text
- Legal references
- Requested resolution

### 4. verifyConsumerRights
Verifies applicable consumer rights.

**Input:**
- `transactionId`: Transaction identifier
- `disputeType`: Type of dispute

**Output:**
- List of applicable rights
- Legal sections
- Consumer entitlements

## Data Models

### Dispute
```typescript
{
  id: string                    // Unique identifier
  transactionId: string         // Associated transaction
  status: 'open' | 'in_progress' | 'resolved' | 'closed'
  damageDescription: string     // Issue description
  confidenceScore: number       // 0-1 confidence
  evidenceId?: string          // Associated evidence
  createdAt: string            // ISO timestamp
  updatedAt: string            // ISO timestamp
}
```

### Evidence
```typescript
{
  id: string                    // Unique identifier
  disputeId: string            // Associated dispute
  type: 'image' | 'video' | 'document'
  url: string                  // S3 URL
  confidenceScore: number      // 0-1 confidence
  verified: boolean            // Verification status
  uploadedAt: string           // ISO timestamp
}
```

### NegotiationResult
```typescript
{
  transactionId: string
  strategy: 'aggressive' | 'balanced' | 'conservative'
  demand: string               // Requested resolution
  status: 'pending' | 'accepted' | 'rejected' | 'counter_offered'
  counterOffer?: string        // Seller's counter offer
}
```

## Deployment

### Frontend Deployment
1. Build: `npm run build`
2. Deploy to Vercel, Netlify, or AWS S3 + CloudFront

### Backend Deployment
1. Configure AWS credentials: `aws configure`
2. Bootstrap CDK: `cdk bootstrap`
3. Deploy: `npm run cdk:deploy`

## Environment Setup

### Frontend (.env.local)
```
VITE_API_URL=https://your-api-endpoint.com/api
VITE_APP_NAME=GrappleAI
VITE_APP_VERSION=1.0.0
```

### Backend (AWS Lambda)
```
DISPUTES_TABLE=GrappleAIStack-DisputesTable-xxx
NEGOTIATIONS_TABLE=GrappleAIStack-NegotiationsTable-xxx
EVIDENCE_BUCKET=grappleaistack-evidencebucket-xxx
```

## Development Workflow

### Frontend Development
```bash
cd app
npm install
npm run dev              # Start dev server
npm run lint            # Run linter
npm run type-check      # Check types
npm run build           # Build for production
```

### Backend Development
```bash
cd backend
npm install
npm run build           # Compile TypeScript
npm run watch           # Watch for changes
npm run cdk:diff        # Preview changes
npm run cdk:deploy      # Deploy to AWS
```

## Security Considerations

1. **Authentication:** Implement JWT/OAuth2
2. **Authorization:** Role-based access control
3. **Data Encryption:** Enable encryption at rest and in transit
4. **Input Validation:** Validate all user inputs
5. **Rate Limiting:** Implement API rate limiting
6. **CORS:** Restrict to trusted domains
7. **Secrets Management:** Use AWS Secrets Manager

## Performance Optimization

### Frontend
- Code splitting with React Router
- Lazy loading components
- Image optimization
- CSS minification
- Gzip compression

### Backend
- Lambda provisioned concurrency
- DynamoDB on-demand billing
- API Gateway caching
- CloudFront distribution
- Connection pooling

## Monitoring & Logging

### CloudWatch Logs
- Lambda execution logs
- API Gateway access logs
- Application errors

### CloudWatch Metrics
- Lambda invocations
- Lambda duration
- Lambda errors
- DynamoDB read/write capacity
- API Gateway requests

### X-Ray Tracing
- Request tracing
- Service map
- Performance analysis

## Future Enhancements

1. **Multi-language Support:** Full vernacular interface
2. **Voice Interface:** Voice-first interaction
3. **Mobile App:** Native iOS/Android apps
4. **Advanced Analytics:** ML-based dispute prediction
5. **Integration:** ONDC, UPI, payment gateway integration
6. **Automation:** Fully autonomous dispute resolution
7. **Blockchain:** Immutable evidence storage
8. **Predictive Prevention:** Prevent disputes before they occur

## Cost Estimation (Monthly)

### Frontend
- Vercel/Netlify: $0-20
- AWS S3 + CloudFront: $5-50

### Backend
- Lambda: $0.20 per 1M requests
- DynamoDB: $1.25 per 100 write units
- S3: $0.023 per GB stored
- API Gateway: $3.50 per 1M requests

**Estimated Total:** $50-200/month for small-medium usage

## Support & Documentation

- **Setup Guide:** See SETUP.md
- **Frontend README:** app/README.md
- **Backend README:** backend/README.md
- **API Documentation:** See API Endpoints section
- **MCP Server:** See MCP Server Tools section

## License

MIT

---

*GrappleAI - Active Defense Layer for Consumers*
*Building trust in India's digital economy, one dispute at a time.*
