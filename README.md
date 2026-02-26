# GrappleAI - Active Defense Layer for Consumers

An AI-driven dispute resolution platform built with React frontend and AWS CDK Lambda backend. GrappleAI advocates for consumers in post-purchase disputes using autonomous agents and the Model Context Protocol (MCP).

## 🚀 Quick Start

Get up and running in 5 minutes:

```bash
# Frontend
cd app && npm install && npm run dev

# Backend (separate terminal)
cd backend && npm install && npm run cdk:deploy
```

See [QUICKSTART.md](./QUICKSTART.md) for detailed instructions.

## 📚 Documentation

### Getting Started
- **[Quick Start Guide](./QUICKSTART.md)** - Get running in 5 minutes
- **[Complete Setup Guide](./SETUP.md)** - Detailed setup instructions
- **[Project Overview](./PROJECT_OVERVIEW.md)** - Architecture and features

### Methodology & Vision
- **[AI-DLC Methodology](./SDLC%20to%20AIDLC/AIDLC.md)** - AI-Driven Development Life Cycle
- **[Traditional SDLC](./SDLC%20to%20AIDLC/SDLC.md)** - SDLC vs AIDLC comparison
- **[GrappleAI Concept](./ProblemStatement.md)** - Problem statement and vision
- **[AI-DLC Details](./AI-DLC/AI-DLC.md)** - Active Defense Layer for Consumers

### Component Documentation
- **[Frontend README](./app/README.md)** - React app details
- **[Backend README](./backend/README.md)** - AWS CDK backend details

## 🏗️ Architecture

```
React Frontend (Vite)
        ↓ HTTP/REST
API Gateway (AWS)
        ↓
Lambda Function (Node.js 20.x)
        ├─ MCP Server
        ├─ Request Handler
        └─ Business Logic
        ↓
    ┌───┴───┬────────┐
    ↓       ↓        ↓
DynamoDB  S3      DynamoDB
Disputes  Evidence Negotiations
```

## ✨ Features

- **Dispute Management** - Create, track, and manage disputes
- **Evidence Verification** - Automatic confidence scoring and secure storage
- **Autonomous Negotiation** - AI-driven negotiation with sellers
- **Consumer Rights** - Consumer Protection Act 2019 integration
- **Dashboard Analytics** - Real-time dispute statistics
- **Multi-language Support** - Vernacular interface support

## 🛠️ Tech Stack

### Frontend
- React 18 + TypeScript
- Vite (build tool)
- Tailwind CSS (styling)
- Zustand (state management)
- React Router (navigation)

### Backend
- AWS CDK (infrastructure as code)
- AWS Lambda (serverless compute)
- AWS API Gateway (REST API)
- AWS DynamoDB (database)
- AWS S3 (storage)
- Node.js 20.x

## 📁 Project Structure

```
grappleai/
├── app/                    # React frontend
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── pages/         # Page components
│   │   ├── services/      # API client
│   │   ├── store/         # State management
│   │   └── types/         # TypeScript types
│   └── package.json
│
├── backend/               # AWS CDK backend
│   ├── lib/
│   │   ├── cdk/          # CDK stack
│   │   ├── lambda/       # Lambda handler
│   │   ├── mcp/          # MCP server
│   │   └── types/        # TypeScript types
│   └── package.json
│
├── SDLC to AIDLC/        # Methodology docs
│   ├── AIDLC.md
│   └── SDLC.md
│
├── AI-DLC/               # AI-DLC documentation
│   └── AI-DLC.md
│
├── QUICKSTART.md         # 5-minute setup
├── SETUP.md              # Complete setup guide
├── PROJECT_OVERVIEW.md   # Architecture overview
└── README.md             # This file
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- AWS Account
- AWS CLI configured

### Frontend Setup
```bash
cd app
npm install
npm run dev
```

Visit: `http://localhost:5173`

### Backend Setup
```bash
cd backend
npm install
npm run cdk:deploy
```

### Connect Frontend to Backend
Update `app/.env.local`:
```
VITE_API_URL=https://your-api-endpoint.com/api
```

## 📖 API Endpoints

### Disputes
- `POST /disputes` - Create dispute
- `GET /disputes` - List disputes
- `GET /disputes/{id}` - Get dispute details
- `PUT /disputes/{id}` - Update dispute

### Evidence
- `POST /evidence/upload` - Upload evidence
- `GET /evidence/{id}` - Get evidence
- `POST /evidence/{id}/verify` - Verify evidence

### Negotiation
- `POST /negotiation/initiate` - Start negotiation
- `GET /negotiation/{txId}` - Get status

## 🔧 MCP Server Tools

The backend implements these MCP tools:

1. **secureEvidence** - Clutch evidence securely with confidence scoring
2. **negotiateRefund** - Initiate autonomous negotiation
3. **generateDisputeNotice** - Generate formal dispute notice
4. **verifyConsumerRights** - Verify Consumer Protection Act rights

## 📊 Dashboard Features

- **Statistics** - Total disputes, resolved, in-progress, success rate
- **Dispute List** - View all disputes with status indicators
- **Create Dispute** - File new disputes with evidence
- **Real-time Updates** - Track dispute progress

## 🔐 Security

- JWT/OAuth2 ready
- Input validation
- IAM roles with least privilege
- Encryption at rest and in transit
- CORS enabled
- API rate limiting ready

## 📈 Performance

- Frontend: ~50KB gzipped
- Lambda: 512MB memory, 30s timeout
- DynamoDB: On-demand billing
- API: <100ms response time

## 💰 Cost Estimation

**Monthly (small-medium usage):**
- Lambda: $0.20 per 1M requests
- DynamoDB: $1.25 per 100 write units
- S3: $0.023 per GB
- API Gateway: $3.50 per 1M requests
- **Total: ~$50-200/month**

## 🧪 Development

### Frontend Commands
```bash
npm run dev          # Start dev server
npm run build        # Build for production
npm run lint         # Run linter
npm run type-check   # Check types
```

### Backend Commands
```bash
npm run build        # Compile TypeScript
npm run cdk:deploy   # Deploy to AWS
npm run cdk:destroy  # Destroy stack
npm run cdk:diff     # Preview changes
```

## 🚢 Deployment

### Frontend
- Vercel: `vercel deploy`
- Netlify: `netlify deploy --prod --dir=dist`
- AWS S3: `aws s3 sync dist/ s3://bucket/`

### Backend
```bash
cd backend
npm run cdk:deploy
```

## 📚 Learn More

- [AWS CDK Documentation](https://docs.aws.amazon.com/cdk/)
- [React Documentation](https://react.dev)
- [Model Context Protocol](https://modelcontextprotocol.io)
- [Consumer Protection Act 2019](https://consumeraffairs.gov.in)

## 🤝 Contributing

1. Create feature branch
2. Make changes
3. Run linter and type-check
4. Submit PR

## 📄 License

MIT

## 🎯 Vision

GrappleAI is building the trust layer for India's digital economy. By combining AI, law, and technology, we're creating an active advocate for every consumer—ensuring that disputes are resolved fairly, quickly, and in the consumer's preferred language.

---

**Ready to build?** Start with [QUICKSTART.md](./QUICKSTART.md)!

*GrappleAI - Active Defense Layer for Consumers*
*Building trust in India's digital economy, one dispute at a time.*
