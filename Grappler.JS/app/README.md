# GrappleAI Frontend

React-based frontend for GrappleAI - Active Defense Layer for Consumers.

## Features

- **Dashboard:** View all disputes and statistics
- **Create Dispute:** File new disputes with evidence
- **Real-time Updates:** Track dispute status in real-time
- **Responsive Design:** Works on desktop, tablet, and mobile
- **Multi-language Support:** Vernacular interface support

## Tech Stack

- **React 18:** UI framework
- **TypeScript:** Type safety
- **Vite:** Build tool
- **Tailwind CSS:** Styling
- **Zustand:** State management
- **React Router:** Navigation
- **Axios:** HTTP client

## Quick Start

```bash
npm install
npm run dev
```

Visit `http://localhost:5173`

## Project Structure

```
src/
├── components/      # Reusable React components
├── pages/          # Page components
├── services/       # API integration
├── store/          # Zustand state management
├── types/          # TypeScript type definitions
├── App.tsx         # Main app component
├── main.tsx        # Entry point
└── index.css       # Global styles
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run type-check` - Check TypeScript types

## Environment Variables

Create `.env.local`:

```
VITE_API_URL=http://localhost:3001/api
```

## Components

### DisputeForm
Form for creating new disputes with confidence score slider.

### DisputeCard
Card component displaying dispute information with status indicator.

### Dashboard
Main dashboard showing statistics and dispute list.

## State Management

Using Zustand for global state:

```typescript
const { disputes, selectedDispute, setDisputes } = useDisputeStore()
```

## API Integration

All API calls go through `src/services/api.ts`:

```typescript
import { disputeApi } from '@/services/api'

const response = await disputeApi.getDisputes()
```

## Styling

Tailwind CSS with custom configuration in `tailwind.config.js`.

## Building for Production

```bash
npm run build
```

Output in `dist/` directory.

## Deployment

### Vercel

```bash
vercel deploy
```

### Netlify

```bash
netlify deploy --prod --dir=dist
```

### AWS S3 + CloudFront

```bash
npm run build
aws s3 sync dist/ s3://your-bucket/
```

## Performance

- Code splitting with React Router
- Lazy loading components
- Image optimization
- CSS minification

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Create feature branch
2. Make changes
3. Run linter: `npm run lint`
4. Check types: `npm run type-check`
5. Submit PR

## License

MIT
