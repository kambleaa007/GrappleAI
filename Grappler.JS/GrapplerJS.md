# Grappler: Active Defense Layer for Consumers

## What is Project Grappler.JS?

(Active Defense Layer for Consumers) is the core dispute resolution engine powering **GrappleAI**. It's an autonomous agent framework built on the Model Context Protocol (MCP) that actively advocates for consumers in post-purchase disputes.

Unlike traditional Online Dispute Resolution (ODR) platforms that act as neutral judges, Grappler is an **active advocate** that:
- Secures and verifies evidence automatically using edge AI
- Negotiates autonomously with sellers and logistics providers
- Generates formal dispute notices in multiple languages
- Executes resolution strategies based on consumer protection laws

---

## Why Grappler?

### The Problem It Solves

By 2026, India's digital commerce ecosystem (ONDC, UPI) has created a massive **"Trust & Dispute Gap"**:

- **Millions of first-time rural buyers** are entering digital commerce but lack protection mechanisms
- **Dispute resolution is slow, manual, and biased** — farmers can't afford to spend hours on support calls in English
- **No active advocate exists** — existing platforms are neutral judges, not defenders
- **Edge connectivity is unreliable** — rural areas need offline-first evidence collection

### Why Now?

1. **Digital Public Infrastructure Saturation** — UPI and ONDC are everywhere, but disputes are overwhelming manual support systems
2. **Voice-First & Vernacular Adoption** — Users interact exclusively through local languages; they need agents that speak their dialect
3. **Edge AI Maturity** — Local vision models can verify damage claims without cloud dependency
4. **Consumer Protection Framework** — India's Consumer Protection Act 2019 provides legal backing for automated dispute resolution

### The Market Gap

Tech giants focus on **selling** (recommendation engines), not **protecting** (post-purchase support). GrappleAI occupies the white space as the first **Active Defense Agent** for the informal economy.

---

## How Grappler Works

### Core Architecture

Grappler operates as an MCP server that exposes dispute resolution tools to LLM agents:

```
User (with dispute) 
    ↓
GrappleAI Agent (LLM + MCP Client)
    ↓
Grappler Server (MCP Protocol)
    ├── Evidence Vault (Secure Storage)
    ├── Negotiation Engine (Autonomous Haggling)
    ├── Legal Knowledge Base (Consumer Protection Act)
    └── Multi-Language Interface (Vernacular Support)
    ↓
External Systems (Seller APIs, Payment Gateways, Logistics)
```

### Key Components

#### 1. **Evidence Clutching**
- User captures photo/video of damaged item
- Local vision model verifies damage with confidence score
- Evidence is locked into tamper-proof storage before internet sync
- High-confidence cases (>0.8) trigger automatic fund freezes

#### 2. **Autonomous Negotiation**
- Connects to seller's MCP server
- Executes negotiation strategy based on evidence strength:
  - **Strong case (>0.9):** Demand 100% refund (aggressive)
  - **Medium case (0.7-0.9):** Negotiate 50% refund or replacement (balanced)
  - **Weak case (<0.7):** Escalate to human review
- Uses Consumer Protection Act 2019 as legal framework

#### 3. **Vernacular Communication**
- Generates formal dispute notices in English/Legalese for official records
- Explains status to user in colloquial local language (Marathi, Hindi, etc.)
- Voice-first interface for users with low literacy

#### 4. **Edge-First Design**
- Evidence collection works offline
- Syncs with cloud when connectivity available
- Reduces dependency on unreliable rural internet

### Implementation: MCP Tools

Grappler exposes these core tools via MCP:

```python
@mcp.tool()
def secure_evidence(transaction_id, damage_description, confidence_score):
    """
    Clutches evidence securely. If confidence > 0.8, freezes payment.
    Returns: Status of evidence lock and fund freeze
    """

@mcp.tool()
def negotiate_refund(transaction_id, seller_agent_id):
    """
    Initiates autonomous negotiation with seller's agent.
    Returns: Negotiation strategy and demand based on evidence strength
    """

@mcp.tool()
def generate_dispute_notice(transaction_id, language):
    """
    Generates formal dispute notice in specified language.
    Returns: Legal document ready for filing
    """

@mcp.tool()
def verify_consumer_rights(transaction_id, dispute_type):
    """
    Checks Consumer Protection Act 2019 for applicable rights.
    Returns: Relevant sections and user entitlements
    """
```

### Workflow Example

**Scenario:** Farmer buys damaged fertilizer via ONDC

1. **Evidence Phase**
   - Farmer takes photo of damaged package
   - Local vision model confirms damage (confidence: 0.92)
   - `secure_evidence()` locks the case and freezes payment

2. **Negotiation Phase**
   - `negotiate_refund()` connects to seller's agent
   - Strategy: Aggressive (high confidence)
   - Demand: 100% refund under Consumer Protection Act Sec 35

3. **Communication Phase**
   - `generate_dispute_notice()` creates formal English notice
   - Agent explains status to farmer in Marathi voice
   - Farmer receives updates in his preferred language

4. **Resolution Phase**
   - Seller accepts or counter-offers
   - Grappler evaluates response against legal framework
   - Executes settlement or escalates to human arbitration

---

## Integration Points

### With GrappleAI Agent
- Grappler provides the dispute resolution "muscles"
- GrappleAI agent provides the "brain" (LLM reasoning)
- Together they form an autonomous advocate

### With External Systems
- **Seller APIs:** Negotiate directly via MCP
- **Payment Gateways:** Trigger fund freezes/releases
- **Logistics Providers:** Verify delivery claims
- **Legal Databases:** Cross-reference consumer rights

### With Users
- **Voice Interface:** Vernacular support via Bhashini
- **Mobile App:** Evidence capture and status tracking
- **WhatsApp Integration:** Dispute initiation via chat

---

## Key Differentiators

| Aspect | Traditional ODR | Grappler |
|--------|-----------------|--------|
| **Approach** | Neutral judge | Active advocate |
| **Speed** | Days/weeks | Minutes/hours |
| **Language** | English/Hindi only | Vernacular (Marathi, Tamil, etc.) |
| **Evidence** | Manual upload | Automated verification |
| **Negotiation** | Human mediator | Autonomous agent |
| **Offline Support** | No | Yes (edge-first) |
| **Legal Framework** | Generic | India-specific (CPA 2019) |

---

## Future Roadmap

- **Phase 1:** Core MCP tools for evidence and negotiation
- **Phase 2:** Multi-language support and voice interface
- **Phase 3:** Integration with ONDC and UPI ecosystems
- **Phase 4:** Predictive dispute prevention (ML-based risk scoring)
- **Phase 5:** Cross-border dispute resolution (SAARC expansion)

---

## Getting Started

### For Developers
1. Review the MCP server implementation in `MCP_SERVER/src/index.ts`
2. Understand the evidence vault and negotiation logic
3. Extend with custom dispute types and resolution strategies

### For Integration
1. Connect your LLM agent to the Grappler MCP server
2. Call `secure_evidence()` when a dispute is initiated
3. Use `negotiate_refund()` for autonomous resolution
4. Monitor `generate_dispute_notice()` for legal compliance

---

*Grappler: Building trust in India's digital economy, one dispute at a time.*
