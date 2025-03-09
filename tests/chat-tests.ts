import { AIClient } from '../lib/ollama-client'
import dotenv from 'dotenv'

// Load environment variables
dotenv.config({ path: '.env.test' })

describe('Chat AI Tests', () => {
  let aiClient: AIClient

  beforeAll(() => {
    // Get API keys from environment variables
    const openRouterKey = process.env.OPENROUTER_API_KEY
    const mistralKey = process.env.MISTRAL_API_KEY
    const chutesKey = process.env.CHUTES_API_KEY

    if (!openRouterKey || !mistralKey || !chutesKey) {
      throw new Error('Required API keys not found in environment variables')
    }
    
    aiClient = new AIClient(openRouterKey, mistralKey, chutesKey)
  })

  describe('Brief Generation Tests', () => {
    test('should generate a web design brief', async () => {
      const prompt = 'Generate a design brief for an e-commerce website selling handmade jewelry.'
      const response = await aiClient.generateResponse(prompt)
      
      expect(response).toBeTruthy()
      expect(typeof response).toBe('string')
      expect(response.toLowerCase()).toMatch(/challenge/i)
      expect(response.toLowerCase()).toMatch(/requirements/i)
      expect(response.toLowerCase()).toMatch(/constraints/i)
      expect(response.toLowerCase()).toMatch(/success criteria/i)
    }, 30000)

    test('should generate a mobile app brief', async () => {
      const prompt = 'Generate a design brief for a mobile banking app.'
      const response = await aiClient.generateResponse(prompt)
      
      expect(response).toBeTruthy()
      expect(typeof response).toBe('string')
      expect(response.toLowerCase()).toMatch(/challenge/i)
      expect(response.toLowerCase()).toMatch(/requirements/i)
      expect(response.toLowerCase()).toMatch(/constraints/i)
      expect(response.toLowerCase()).toMatch(/success criteria/i)
    }, 30000)

    test('should handle empty prompt', async () => {
      await expect(aiClient.generateResponse('')).rejects.toThrow('Empty prompt')
    })
  })

  describe('Edge Cases', () => {
    test('should handle API errors gracefully', async () => {
      const invalidClient = new AIClient('invalid-token', 'invalid-token', 'invalid-token')
      await expect(invalidClient.generateResponse('test')).rejects.toThrow()
    }, 30000)

    test('should handle very long prompts', async () => {
      const longPrompt = 'design '.repeat(1000) + 'challenge for mobile app'
      const response = await aiClient.generateResponse(longPrompt)
      expect(response).toBeTruthy()
      expect(typeof response).toBe('string')
      expect(response.toLowerCase()).toMatch(/challenge/i)
      expect(response.toLowerCase()).toMatch(/requirements/i)
      expect(response.toLowerCase()).toMatch(/constraints/i)
      expect(response.toLowerCase()).toMatch(/success criteria/i)
    }, 30000)

    test('should handle special characters in prompt', async () => {
      const promptWithSpecialChars = 'Design challenge for mobile app with €#@&* characters'
      const response = await aiClient.generateResponse(promptWithSpecialChars)
      expect(response).toBeTruthy()
      expect(typeof response).toBe('string')
      expect(response.toLowerCase()).toMatch(/challenge/i)
      expect(response.toLowerCase()).toMatch(/requirements/i)
      expect(response.toLowerCase()).toMatch(/constraints/i)
      expect(response.toLowerCase()).toMatch(/success criteria/i)
    }, 30000)
  })
}) 