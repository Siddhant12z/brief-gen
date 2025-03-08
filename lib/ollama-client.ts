import { createParser } from "eventsource-parser"

interface AIResponse {
  text: string
}

export class AIClient {
  private apiKey: string
  private model: string

  constructor(apiKey: string = "tgp_v1_oxOYjYkajjY0QlWL5_SXh1LywDqziIHt6V7LDnu-FBQ", model: string = "mistralai/Mixtral-8x7B-Instruct-v0.1") {
    this.apiKey = apiKey
    this.model = model
  }

  async generateResponse(prompt: string, imageBase64?: string) {
    const response = await fetch("https://api.together.xyz/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${this.apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: this.model,
        messages: [
          {
            role: "system",
            content: "You are a professional design consultant providing feedback and guidance on design projects. Format your responses in a clear, structured way with the following sections:\n\n# Overview\n[Brief summary of the design challenge or feedback]\n\n# Requirements\n- [Key requirements and constraints]\n- [Technical specifications if applicable]\n- [Design goals and objectives]\n\n# Design Guidelines\n- [Specific design recommendations]\n- [Visual style guidance]\n- [UX considerations]\n\n# Inspiration Sources\n- [Relevant examples and references]\n- [Design patterns to consider]"
          },
          {
            role: "user",
            content: imageBase64 
              ? `[Image analysis request] ${prompt}\n\nImage data: ${imageBase64}`
              : prompt
          }
        ],
        stream: true,
        temperature: 0.7,
        max_tokens: 1000
      })
    })

    if (!response.ok) {
      throw new Error(`AI request failed: ${response.statusText}`)
    }

    const reader = response.body?.getReader()
    const decoder = new TextDecoder()

    if (!reader) {
      throw new Error("No response body available")
    }

    let responseText = ""

    try {
      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        const chunk = decoder.decode(value)
        const lines = chunk.split('\n').filter(line => line.trim())

        for (const line of lines) {
          try {
            if (line.startsWith('data: ')) {
              const data = JSON.parse(line.slice(6)) as AIResponse
              if (data.text) {
                responseText += data.text
              }
            }
          } catch (e) {
            console.error("Failed to parse SSE message:", e)
          }
        }
      }
    } finally {
      reader.releaseLock()
    }

    return responseText
  }

  async analyzeImage(imageBase64: string) {
    const prompt = "Please analyze this design and provide detailed feedback on its visual elements, layout, color scheme, and overall effectiveness. Include specific suggestions for improvement."
    return this.generateResponse(prompt, imageBase64)
  }
}