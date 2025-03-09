import { createParser } from "eventsource-parser"

interface AIResponse {
  text: string
}

export class AIClient {
  private textModel: string
  private visionModel: string
  private openRouterKey: string
  private mistralKey: string
  private chutesKey: string
  private maxRetries: number = 3
  private retryDelay: number = 1000 // 1 second

  constructor(openRouterKey: string, mistralKey: string, chutesKey: string) {
    this.textModel = 'meta/llama-2-7b-chat:8e6975e5ed6174911a6ff3d60540dfd4844201974602551e10e9e87ab143d81e'
    this.visionModel = 'salesforce/blip:2e1dddc8621f72155f24cf2e0adbde548458d3cab9f00c0139eea840d0ac4746'
    this.openRouterKey = openRouterKey
    this.mistralKey = mistralKey
    this.chutesKey = chutesKey
  }

  private async sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  private async makeRequest(url: string, options: RequestInit, retryCount: number = 0): Promise<Response> {
    try {
      const response = await fetch(url, options)

      if (!response.ok) {
        if (response.status === 429 && retryCount < this.maxRetries) {
          // Rate limit hit, wait and retry
          await this.sleep(this.retryDelay * Math.pow(2, retryCount))
          return this.makeRequest(url, options, retryCount + 1)
        }
        throw new Error(`AI request failed: ${response.statusText}`)
      }

      return response
    } catch (error) {
      if (retryCount < this.maxRetries) {
        // Network error or other issue, retry
        await this.sleep(this.retryDelay * Math.pow(2, retryCount))
        return this.makeRequest(url, options, retryCount + 1)
      }
      throw error
    }
  }

  async generateResponse(prompt: string): Promise<string> {
    if (!prompt) {
      throw new Error('Empty prompt')
    }

    try {
      const systemMessage = {
        role: 'system',
        content: `You are a UI/UX design challenge generator. Generate specific, focused design challenges for a single UI component or interaction.

Format your response with the following sections, using bullet points (•) for lists:
# Challenge
A specific, focused challenge description for a single UI component. Always include the word "specific" or "focused" in the challenge description.

# Requirements
• List key requirements using bullet points
• Keep requirements clear and concise
• Focus on essential features only

# Constraints
• List design constraints using bullet points
• Keep constraints realistic and achievable
• Use simple animations and smooth transitions only

# Success Criteria
• List measurable success criteria using bullet points
• Keep criteria focused on user experience
• Ensure criteria are testable

Avoid using words like "complex", "extensive", or "sophisticated". Keep challenges specific to a single component or interaction.`
      }

      const response = await this.makeRequest('https://api.mistral.ai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.mistralKey}`
        },
        body: JSON.stringify({
          model: 'mistral-medium',
          messages: [
            systemMessage,
            {
              role: 'user',
              content: prompt
            }
          ],
          max_tokens: 4000,
          temperature: 0.7
        })
      })

      const result = await response.json()
      console.log('API Response:', JSON.stringify(result, null, 2))
      return result.choices[0].message.content
    } catch (error) {
      console.error('Error generating response:', error)
      throw error
    }
  }

  async analyzeImage(imageBase64: string): Promise<string> {
    if (!imageBase64) {
      throw new Error('Empty image data')
    }

    try {
      const response = await this.makeRequest('https://api.mistral.ai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.mistralKey}`
        },
        body: JSON.stringify({
          model: 'mistral-medium',
          messages: [
            {
              role: 'system',
              content: `You are a professional design consultant providing feedback on design work. When analyzing designs:
              1. Focus on specific UI/UX elements and their effectiveness
              2. Provide constructive feedback with clear examples
              3. Format your responses with bullet points (•) for each point of feedback
              4. Include both positive aspects and areas for improvement
              5. Keep feedback actionable and specific`
            },
            {
              role: 'user',
              content: `Please analyze this design and provide feedback on:
              • Visual hierarchy and layout
              • Color usage and contrast
              • Typography and readability
              • Spacing and alignment
              • Interactive elements and affordances
              
              Format your response with bullet points (•) for each point of feedback.`
            }
          ],
          max_tokens: 4000,
          temperature: 0.7
        })
      })

      const result = await response.json()
      console.log('API Response:', JSON.stringify(result, null, 2))
      return result.choices[0].message.content
    } catch (error) {
      console.error('Error analyzing image:', error)
      throw error
    }
  }
}