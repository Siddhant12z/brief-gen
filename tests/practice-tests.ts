import { AIClient } from '../lib/ollama-client'
import dotenv from 'dotenv'

// Load environment variables
dotenv.config({ path: '.env.test' })

describe('Practice AI Tests', () => {
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

  describe('Challenge Generation Tests', () => {
    test('should generate a mobile app challenge', async () => {
      const prompt = `You are a professional design mentor creating a focused practice challenge. Generate a brief design challenge for a mobile-app project titled "Social Media App".

      The challenge should be:
      1. Specific and focused on a single UI component or interaction
      2. Achievable within 10 minutes
      3. Clear and actionable
      4. Include specific requirements and constraints

      Format your response EXACTLY with these sections and headings:

      # Challenge
      [One sentence describing the specific UI component or interaction to design]

      # Requirements
      • [3-4 specific requirements, use bullet points (•) not numbers]
      • [Each requirement on a new line]
      • [Be specific and actionable]

      # Constraints
      • [2-3 design constraints, use bullet points (•) not numbers]
      • [Each constraint on a new line]

      # Success Criteria
      • [2-3 measurable success criteria, use bullet points (•) not numbers]
      • [Each criterion on a new line]

      Keep the response focused and concise. Each section should be short and actionable.
      IMPORTANT: Use bullet points (•) not numbers for Requirements, Constraints, and Success Criteria.`

      const response = await aiClient.generateResponse(prompt)
      
      // Check for required sections
      expect(response).toMatch(/# Challenge\n/i)
      expect(response).toMatch(/# Requirements\n/i)
      expect(response).toMatch(/# Constraints\n/i)
      expect(response).toMatch(/# Success Criteria\n/i)

      // Check for bullet points in sections
      const sections = response.split('#').filter(Boolean)
      sections.forEach(section => {
        if (section.includes('Requirements') || 
            section.includes('Constraints') || 
            section.includes('Success Criteria')) {
          expect(section).toMatch(/[•]\s/)  // Check specifically for bullet point character
        }
      })
    }, 30000)

    test('should generate a web app challenge', async () => {
      const prompt = `You are a professional design mentor creating a focused practice challenge. Generate a brief design challenge for a web-app project titled "Dashboard Interface".

      The challenge should be:
      1. Specific and focused on a single UI component or interaction
      2. Achievable within 10 minutes
      3. Clear and actionable
      4. Include specific requirements and constraints

      Format your response EXACTLY with these sections and headings:

      # Challenge
      [One sentence describing the specific UI component or interaction to design]

      # Requirements
      • [3-4 specific requirements, use bullet points (•) not numbers]
      • [Each requirement on a new line]
      • [Be specific and actionable]

      # Constraints
      • [2-3 design constraints, use bullet points (•) not numbers]
      • [Each constraint on a new line]

      # Success Criteria
      • [2-3 measurable success criteria, use bullet points (•) not numbers]
      • [Each criterion on a new line]

      Keep the response focused and concise. Each section should be short and actionable.
      IMPORTANT: Use bullet points (•) not numbers for Requirements, Constraints, and Success Criteria.`

      const response = await aiClient.generateResponse(prompt)
      
      // Check for required sections
      expect(response).toMatch(/# Challenge\n/i)
      expect(response).toMatch(/# Requirements\n/i)
      expect(response).toMatch(/# Constraints\n/i)
      expect(response).toMatch(/# Success Criteria\n/i)

      // Check for bullet points in sections
      const sections = response.split('#').filter(Boolean)
      sections.forEach(section => {
        if (section.includes('Requirements') || 
            section.includes('Constraints') || 
            section.includes('Success Criteria')) {
          expect(section).toMatch(/[•]\s/)  // Check specifically for bullet point character
        }
      })
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

  describe('Challenge Format Tests', () => {
    test('should generate properly formatted challenges', async () => {
      const prompt = `You are a professional design mentor creating a focused practice challenge. Generate a brief design challenge for a branding project titled "Logo Design".

      The challenge should be:
      1. Specific and focused on a single UI component or interaction
      2. Achievable within 10 minutes
      3. Clear and actionable
      4. Include specific requirements and constraints

      Format your response EXACTLY with these sections and headings:

      # Challenge
      [One sentence describing the specific UI component or interaction to design]

      # Requirements
      • [3-4 specific requirements, use bullet points (•) not numbers]
      • [Each requirement on a new line]
      • [Be specific and actionable]

      # Constraints
      • [2-3 design constraints, use bullet points (•) not numbers]
      • [Each constraint on a new line]

      # Success Criteria
      • [2-3 measurable success criteria, use bullet points (•) not numbers]
      • [Each criterion on a new line]

      Keep the response focused and concise. Each section should be short and actionable.
      IMPORTANT: Use bullet points (•) not numbers for Requirements, Constraints, and Success Criteria.`

      const response = await aiClient.generateResponse(prompt)
      
      // Check for required sections
      expect(response).toMatch(/# Challenge\n/i)
      expect(response).toMatch(/# Requirements\n/i)
      expect(response).toMatch(/# Constraints\n/i)
      expect(response).toMatch(/# Success Criteria\n/i)

      // Check for bullet points in sections
      const sections = response.split('#').filter(Boolean)
      sections.forEach(section => {
        if (section.includes('Requirements') || 
            section.includes('Constraints') || 
            section.includes('Success Criteria')) {
          expect(section).toMatch(/[•]\s/)  // Check specifically for bullet point character
        }
      })
    }, 30000)

    test('should generate time-appropriate challenges', async () => {
      const prompt = `You are a professional design mentor creating a focused practice challenge. Generate a brief design challenge for a product-design project titled "Smart Home Device".

      The challenge should be:
      1. Specific and focused on a single UI component or interaction
      2. Achievable within 15 minutes
      3. Clear and actionable
      4. Include specific requirements and constraints

      Format your response EXACTLY with these sections and headings:

      # Challenge
      [One sentence describing the specific UI component or interaction to design]

      # Requirements
      • [3-4 specific requirements, use bullet points (•) not numbers]
      • [Each requirement on a new line]
      • [Be specific and actionable]

      # Constraints
      • [2-3 design constraints, use bullet points (•) not numbers]
      • [Each constraint on a new line]

      # Success Criteria
      • [2-3 measurable success criteria, use bullet points (•) not numbers]
      • [Each criterion on a new line]

      Keep the response focused and concise. Each section should be short and actionable.
      IMPORTANT: Use bullet points (•) not numbers for Requirements, Constraints, and Success Criteria.`

      const response = await aiClient.generateResponse(prompt)
      
      // Check that the challenge scope is appropriate for the time
      expect(response.toLowerCase()).not.toMatch(/complex|extensive|comprehensive/)
      expect(response.toLowerCase()).toMatch(/specific|focused|single/)

      // Check for bullet points in sections
      const sections = response.split('#').filter(Boolean)
      sections.forEach(section => {
        if (section.includes('Requirements') || 
            section.includes('Constraints') || 
            section.includes('Success Criteria')) {
          expect(section).toMatch(/[•]\s/)  // Check specifically for bullet point character
        }
      })
    }, 30000)
  })
}) 