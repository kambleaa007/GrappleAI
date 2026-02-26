import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { mcpServer } from '@/mcp/server'
import type { MCPRequest, MCPResponse } from '@/types'

const headers = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
}

/**
 * Main Lambda handler for GrappleAI API
 */
export async function handler(
  event: APIGatewayProxyEvent,
): Promise<APIGatewayProxyResult> {
  console.log('Received event:', JSON.stringify(event, null, 2))

  // Handle CORS preflight
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: '',
    }
  }

  try {
    const path = event.path
    const method = event.httpMethod
    const body = event.body ? JSON.parse(event.body) : {}

    // Route requests to appropriate handlers
    if (path === '/disputes' && method === 'POST') {
      return await handleCreateDispute(body)
    } else if (path.startsWith('/disputes/') && method === 'GET') {
      const disputeId = path.split('/')[2]
      return await handleGetDispute(disputeId)
    } else if (path === '/disputes' && method === 'GET') {
      return await handleListDisputes()
    } else if (path.startsWith('/evidence/upload') && method === 'POST') {
      return await handleUploadEvidence(body)
    } else if (path.startsWith('/negotiation/initiate') && method === 'POST') {
      return await handleInitiateNegotiation(body)
    } else if (path.startsWith('/negotiation/') && method === 'GET') {
      const transactionId = path.split('/')[2]
      return await handleGetNegotiationStatus(transactionId)
    } else {
      return {
        statusCode: 404,
        headers,
        body: JSON.stringify({ success: false, error: 'Not found' }),
      }
    }
  } catch (error) {
    console.error('Error:', error)
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : 'Internal server error',
      }),
    }
  }
}

async function handleCreateDispute(body: any): Promise<APIGatewayProxyResult> {
  const { transactionId, damageDescription, confidenceScore } = body

  if (!transactionId || !damageDescription || confidenceScore === undefined) {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({
        success: false,
        error: 'Missing required fields',
      }),
    }
  }

  const result = await mcpServer.secureEvidence(
    transactionId,
    damageDescription,
    confidenceScore,
  )

  return {
    statusCode: result.success ? 201 : 400,
    headers,
    body: JSON.stringify(result),
  }
}

async function handleGetDispute(disputeId: string): Promise<APIGatewayProxyResult> {
  const result = await mcpServer.getDisputeStatus(disputeId)

  return {
    statusCode: result.success ? 200 : 404,
    headers,
    body: JSON.stringify(result),
  }
}

async function handleListDisputes(): Promise<APIGatewayProxyResult> {
  // Placeholder - would fetch from DynamoDB in production
  return {
    statusCode: 200,
    headers,
    body: JSON.stringify({
      success: true,
      data: [],
    }),
  }
}

async function handleUploadEvidence(body: any): Promise<APIGatewayProxyResult> {
  const { disputeId, fileUrl, confidenceScore } = body

  if (!disputeId || !fileUrl) {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({
        success: false,
        error: 'Missing required fields',
      }),
    }
  }

  // Placeholder - would upload to S3 and verify in production
  return {
    statusCode: 201,
    headers,
    body: JSON.stringify({
      success: true,
      data: {
        id: `evidence-${Date.now()}`,
        disputeId,
        url: fileUrl,
        confidenceScore: confidenceScore || 0.8,
        verified: true,
      },
    }),
  }
}

async function handleInitiateNegotiation(body: any): Promise<APIGatewayProxyResult> {
  const { transactionId, sellerId } = body

  if (!transactionId || !sellerId) {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({
        success: false,
        error: 'Missing required fields',
      }),
    }
  }

  const result = await mcpServer.negotiateRefund(transactionId, sellerId)

  return {
    statusCode: result.success ? 200 : 400,
    headers,
    body: JSON.stringify(result),
  }
}

async function handleGetNegotiationStatus(
  transactionId: string,
): Promise<APIGatewayProxyResult> {
  // Placeholder - would fetch from DynamoDB in production
  return {
    statusCode: 200,
    headers,
    body: JSON.stringify({
      success: true,
      data: {
        transactionId,
        status: 'pending',
      },
    }),
  }
}
