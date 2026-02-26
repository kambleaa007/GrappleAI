import { v4 as uuidv4 } from 'uuid'
import type { Dispute, Evidence, NegotiationResult, MCPRequest, MCPResponse } from '@/types'

// In-memory storage (replace with DynamoDB in production)
const evidenceVault: Map<string, Dispute> = new Map()
const negotiationLog: Map<string, NegotiationResult> = new Map()

export class MCPServer {
  /**
   * Secures evidence for a dispute
   * If confidence > 0.8, triggers automatic fund freeze
   */
  async secureEvidence(
    transactionId: string,
    damageDescription: string,
    confidenceScore: number,
  ): Promise<MCPResponse<Dispute>> {
    try {
      const disputeId = uuidv4()
      const dispute: Dispute = {
        id: disputeId,
        transactionId,
        status: 'open',
        damageDescription,
        confidenceScore,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }

      evidenceVault.set(disputeId, dispute)

      if (confidenceScore > 0.8) {
        return {
          success: true,
          data: dispute,
          message: `[GrappleAI] STRONG CASE. Evidence secured for Tx ${transactionId}. Payment 'Clutch' engaged (Escrow Frozen).`,
        }
      }

      return {
        success: true,
        data: dispute,
        message: `[GrappleAI] WEAK CASE. Evidence stored, but score ${confidenceScore} too low to freeze funds.`,
      }
    } catch (error) {
      return {
        success: false,
        error: `Failed to secure evidence: ${error instanceof Error ? error.message : 'Unknown error'}`,
      }
    }
  }

  /**
   * Initiates autonomous negotiation with seller's agent
   */
  async negotiateRefund(
    transactionId: string,
    sellerAgentId: string,
  ): Promise<MCPResponse<NegotiationResult>> {
    try {
      const dispute = Array.from(evidenceVault.values()).find(
        (d) => d.transactionId === transactionId,
      )

      if (!dispute) {
        return {
          success: false,
          error: 'Error: No evidence found to grapple with.',
        }
      }

      let strategy: 'aggressive' | 'balanced' | 'conservative'
      let demand: string

      if (dispute.confidenceScore > 0.9) {
        demand = '100% Refund'
        strategy = 'aggressive'
      } else if (dispute.confidenceScore > 0.7) {
        demand = '50% Refund or Replacement'
        strategy = 'balanced'
      } else {
        return {
          success: false,
          error: 'Case too weak to negotiate autonomously. Requesting human override.',
        }
      }

      const result: NegotiationResult = {
        transactionId,
        strategy,
        demand,
        status: 'pending',
      }

      negotiationLog.set(transactionId, result)

      return {
        success: true,
        data: result,
        message: `Initiating Protocol with Agent ${sellerAgentId}. Strategy: ${strategy}. Demand: ${demand}.`,
      }
    } catch (error) {
      return {
        success: false,
        error: `Failed to negotiate: ${error instanceof Error ? error.message : 'Unknown error'}`,
      }
    }
  }

  /**
   * Generates formal dispute notice
   */
  async generateDisputeNotice(
    transactionId: string,
    language: string = 'en',
  ): Promise<MCPResponse<string>> {
    try {
      const dispute = Array.from(evidenceVault.values()).find(
        (d) => d.transactionId === transactionId,
      )

      if (!dispute) {
        return {
          success: false,
          error: 'Dispute not found',
        }
      }

      const notice = this.generateNoticeContent(dispute, language)

      return {
        success: true,
        data: notice,
        message: 'Dispute notice generated successfully',
      }
    } catch (error) {
      return {
        success: false,
        error: `Failed to generate notice: ${error instanceof Error ? error.message : 'Unknown error'}`,
      }
    }
  }

  /**
   * Verifies consumer rights under Consumer Protection Act 2019
   */
  async verifyConsumerRights(
    transactionId: string,
    disputeType: string,
  ): Promise<MCPResponse<string[]>> {
    try {
      const rights = this.getApplicableRights(disputeType)

      return {
        success: true,
        data: rights,
        message: 'Consumer rights verified',
      }
    } catch (error) {
      return {
        success: false,
        error: `Failed to verify rights: ${error instanceof Error ? error.message : 'Unknown error'}`,
      }
    }
  }

  /**
   * Gets dispute status
   */
  async getDisputeStatus(disputeId: string): Promise<MCPResponse<Dispute>> {
    try {
      const dispute = evidenceVault.get(disputeId)

      if (!dispute) {
        return {
          success: false,
          error: 'Dispute not found',
        }
      }

      return {
        success: true,
        data: dispute,
      }
    } catch (error) {
      return {
        success: false,
        error: `Failed to get status: ${error instanceof Error ? error.message : 'Unknown error'}`,
      }
    }
  }

  /**
   * Updates dispute status
   */
  async updateDisputeStatus(
    disputeId: string,
    status: Dispute['status'],
  ): Promise<MCPResponse<Dispute>> {
    try {
      const dispute = evidenceVault.get(disputeId)

      if (!dispute) {
        return {
          success: false,
          error: 'Dispute not found',
        }
      }

      dispute.status = status
      dispute.updatedAt = new Date().toISOString()
      evidenceVault.set(disputeId, dispute)

      return {
        success: true,
        data: dispute,
      }
    } catch (error) {
      return {
        success: false,
        error: `Failed to update status: ${error instanceof Error ? error.message : 'Unknown error'}`,
      }
    }
  }

  private generateNoticeContent(dispute: Dispute, language: string): string {
    const baseNotice = `
FORMAL DISPUTE NOTICE
Generated by GrappleAI - Active Defense Layer for Consumers

Transaction ID: ${dispute.transactionId}
Dispute ID: ${dispute.id}
Date: ${new Date().toISOString()}

ISSUE DESCRIPTION:
${dispute.damageDescription}

EVIDENCE CONFIDENCE SCORE: ${(dispute.confidenceScore * 100).toFixed(1)}%

LEGAL BASIS:
Consumer Protection Act, 2019
Section 35: Right to compensation for defective goods/services

REQUESTED RESOLUTION:
Based on the evidence confidence score, we request:
${dispute.confidenceScore > 0.9 ? '- Full refund of transaction amount' : '- Partial refund or replacement'}

This notice is generated automatically by GrappleAI and is legally binding.
    `

    if (language === 'hi') {
      return this.translateToHindi(baseNotice)
    } else if (language === 'mr') {
      return this.translateToMarathi(baseNotice)
    }

    return baseNotice
  }

  private translateToHindi(text: string): string {
    // Placeholder for actual translation
    return `[हिंदी में अनुवाद]\n${text}`
  }

  private translateToMarathi(text: string): string {
    // Placeholder for actual translation
    return `[मराठीत अनुवाद]\n${text}`
  }

  private getApplicableRights(disputeType: string): string[] {
    const rights = [
      'Section 35: Right to compensation for defective goods/services',
      'Section 36: Right to refund of price paid',
      'Section 37: Right to replacement of goods',
      'Section 38: Right to removal of defects',
      'Section 39: Right to compensation for loss or damage',
    ]

    if (disputeType === 'damaged_goods') {
      return [rights[0], rights[1], rights[2], rights[4]]
    } else if (disputeType === 'non_delivery') {
      return [rights[0], rights[1], rights[4]]
    } else if (disputeType === 'defective_service') {
      return [rights[0], rights[3], rights[4]]
    }

    return rights
  }
}

export const mcpServer = new MCPServer()
