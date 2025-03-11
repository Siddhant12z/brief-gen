"use client"

import { useState, useRef, useEffect } from "react"
import { ChatContainer } from "@/components/chat/chat-container"
import { ChatInput } from "@/components/chat/chat-input"
import { Message } from "@/components/chat/message"
import { UsageLimitBanner } from "@/components/chat/usage-limit-banner"
import { SubscriptionBanner } from "@/components/chat/subscription-banner"
import { AIClient } from "@/lib/ollama-client"
import { HeatmapGenerator, HeatmapResult } from '@/lib/heatmap-generator'
import { HeatmapVisualization } from '@/components/design/heatmap-visualization'

// Helper function to parse markdown sections into structured format
const parseMarkdownSections = (markdown: string) => {
  const sections = [];
  const lines = markdown.split('\n');
  let currentSection: { title: string; content: string } | null = null;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    
    // Check if line is a heading (starts with #)
    if (line.startsWith('#')) {
      // If we already have a section, push it before starting a new one
      if (currentSection) {
        sections.push(currentSection);
      }
      
      // Create a new section with the heading as title
      const title = line.replace(/^#+\s+/, '').trim();
      currentSection = { title, content: '' };
    } 
    // Add content to current section if we have one
    else if (currentSection) {
      if (line || currentSection.content) { // Only add non-empty lines or if we already have content
        currentSection.content += (currentSection.content ? '\n' : '') + line;
      }
    }
  }
  
  // Add the last section if there is one
  if (currentSection) {
    sections.push(currentSection);
  }
  
  // If no sections were found, create a default one with the entire content
  if (sections.length === 0 && markdown.trim()) {
    sections.push({
      title: 'Design Brief',
      content: markdown.trim()
    });
  }
  
  return sections;
}

// Message types
type MessageType = "text" | "image" | "options" | "heatmap" | "brief"
type Role = "user" | "assistant"

interface MessageData {
  id: string
  content: string
  role: Role
  type: MessageType
  options?: Array<{ id: string; label: string }>
  imageUrl?: string
  heatmapUrl?: string
  brief?: {
    sections: Array<{
      title: string
      content: string
    }>
  }
  images?: string[]
  heatmapResult?: HeatmapResult
}

export default function ChatPage() {
  const [messages, setMessages] = useState<MessageData[]>([
    {
      id: "1",
      content: "Welcome to Design Brief AI. I specialize in generating comprehensive design briefs and providing professional design feedback. How can I assist you with your design project today?",
      role: "assistant",
      type: "options",
      options: [
        { id: "brief", label: "Generate a detailed design brief" },
        { id: "feedback", label: "Receive design critique" },
      ],
    },
  ])

  const [usageCount, setUsageCount] = useState(0)
  const [usageLimit] = useState(5)
  const [isSubscribed] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Initialize AI client with API keys
  const aiClient = new AIClient(
    process.env.NEXT_PUBLIC_REPLICATE_API_TOKEN || '',
    process.env.NEXT_PUBLIC_MISTRAL_API_KEY || '',
    process.env.NEXT_PUBLIC_CHUTES_API_KEY || ''
  )

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const generateUniqueId = () => {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
  }

  // Handle sending a message
  const handleSendMessage = async (message: string) => {
    if (message.trim() === "") return
  
    // Add user message
    const newUserMessage: MessageData = {
      id: generateUniqueId(),
      content: message,
      role: "user",
      type: "text",
    }
  
    setMessages((prev) => [...prev, newUserMessage])
    setIsLoading(true)
  
    try {
      const lowerMessage = message.toLowerCase()
      
      // Check if it's a greeting or general conversation
      const greetings = ['hi', 'hello', 'hey', 'good morning', 'good afternoon', 'good evening']
      const acknowledgments = ['ok', 'okay', 'sure', 'alright', 'thanks', 'thank you']
      
      if (greetings.some(greeting => lowerMessage.includes(greeting))) {
        const aiResponse: MessageData = {
          id: generateUniqueId(),
          content: "Hello! I'm your design consultant. I can help you create detailed design briefs or provide feedback on your designs. What would you like to work on today?",
          role: "assistant",
          type: "options",
          options: [
            { id: "brief", label: "Generate a design brief" },
            { id: "feedback", label: "Get design feedback" },
          ],
        }
        setMessages((prev) => [...prev, aiResponse])
        return
      }

      if (acknowledgments.some(ack => lowerMessage === ack)) {
        const aiResponse: MessageData = {
          id: generateUniqueId(),
          content: "Great! I'm here to help with your design needs. Would you like to create a design brief or get feedback on a design?",
          role: "assistant",
          type: "options",
          options: [
            { id: "brief", label: "Generate a design brief" },
            { id: "feedback", label: "Get design feedback" },
          ],
        }
        setMessages((prev) => [...prev, aiResponse])
        return
      }

      // Check if it's a design-related query
      const designTerms = ['design', 'brief', 'ui', 'ux', 'layout', 'brand', 'website', 'app', 'mobile', 'interface', 'logo', 'color', 'typography']
      const isDesignRelated = designTerms.some(term => lowerMessage.includes(term))

      if (!isDesignRelated) {
        const aiResponse: MessageData = {
          id: generateUniqueId(),
          content: "I understand. While I'm happy to chat, I'm most helpful with design-related topics. Would you like to explore creating a design brief or getting design feedback?",
          role: "assistant",
          type: "options",
          options: [
            { id: "brief", label: "Generate a design brief" },
            { id: "feedback", label: "Get design feedback" },
          ],
        }
        setMessages((prev) => [...prev, aiResponse])
        return
      }

      // Handle brief-related queries
      if (lowerMessage.includes("brief")) {
        const aiResponse: MessageData = {
          id: generateUniqueId(),
          content: "I'll help you create a detailed design brief. What type of design project are you working on?",
          role: "assistant",
          type: "options",
          options: [
            { id: "web", label: "Web Design" },
            { id: "mobile", label: "Mobile App" },
            { id: "branding", label: "Brand Identity" },
            { id: "ui", label: "UI/UX Design" },
          ],
        }
        setMessages((prev) => [...prev, aiResponse])
      } else {
        // Generate AI response for other design-related queries
        const aiResponse = await aiClient.generateResponse(message)
        const newAiMessage: MessageData = {
          id: generateUniqueId(),
          content: aiResponse,
          role: "assistant",
          type: "text",
        }
        setMessages((prev) => [...prev, newAiMessage])
        setUsageCount((prev) => prev + 1)
      }
    } catch (error) {
      console.error("Error generating AI response:", error)
      const errorMessage: MessageData = {
        id: generateUniqueId(),
        content: "Sorry, I encountered an error. Please try again.",
        role: "assistant",
        type: "text",
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  // Handle file upload
  const handleFileUpload = async (file: File) => {
    if (usageCount >= usageLimit && !isSubscribed) {
      handleLimitReached()
      return
    }

    // Create object URL for the uploaded image
    const imageUrl = URL.createObjectURL(file)

    // Add user message with image
    const newUserMessage: MessageData = {
      id: generateUniqueId(),
      content: "Here's my design for feedback",
      role: "user",
      type: "image",
      imageUrl,
    }

    setMessages((prev) => [...prev, newUserMessage])
    setIsLoading(true)

    // Add loading message for heatmap generation
    const loadingMessage: MessageData = {
      id: generateUniqueId(),
      content: "Analyzing your design...",
      role: "assistant",
      type: "text",
    }
    setMessages((prev) => [...prev, loadingMessage])

    try {
      // Initialize heatmap generator
      const generator = new HeatmapGenerator()
      await generator.initialize()

      // Create image element for analysis
      const img = new Image()
      img.src = imageUrl
      await new Promise((resolve, reject) => {
        img.onload = resolve
        img.onerror = reject
      })

      // Generate heatmap
      const heatmapResult = await generator.generateHeatmap(img)

      // Remove loading message
      setMessages((prev) => prev.filter(msg => msg.id !== loadingMessage.id))

      // Add heatmap analysis message
      const heatmapMessage: MessageData = {
        id: generateUniqueId(),
        content: "I've analyzed your design's visual attention patterns. Here's what I found:",
        role: "assistant",
        type: "heatmap",
        imageUrl,
        heatmapResult,
      }
      setMessages((prev) => [...prev, heatmapMessage])

      // Generate AI feedback based on heatmap
      const analysisPrompt = `Analyze this design based on the following attention points: ${JSON.stringify(heatmapResult.attentionPoints)}. 
                             Consider:
                             1. Visual Hierarchy: How effectively does the design guide attention?
                             2. Key Areas: Are important elements receiving appropriate attention?
                             3. Balance: Is visual weight distributed appropriately?
                             4. Flow: How does attention move through the design?
                             5. Improvements: What specific changes could enhance the design?
                             
                             Format your response with clear sections and actionable recommendations.`

      const aiResponse = await aiClient.generateResponse(analysisPrompt)
      const feedbackMessage: MessageData = {
        id: generateUniqueId(),
        content: aiResponse,
        role: "assistant",
        type: "text",
      }

      setMessages((prev) => [...prev, feedbackMessage])
      setUsageCount((prev) => prev + 1)

    } catch (error) {
      console.error("Error analyzing design:", error)
      // Remove loading message
      setMessages((prev) => prev.filter(msg => msg.id !== loadingMessage.id))

      const errorMessage: MessageData = {
        id: generateUniqueId(),
        content: "Sorry, I encountered an error analyzing your design. Please try again.",
        role: "assistant",
        type: "text",
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  // Handle AI response based on user input
  const handleAIResponse = async (userMessage: string) => {
    if (usageCount >= usageLimit && !isSubscribed) {
      handleLimitReached()
      return
    }

    const message = userMessage.toLowerCase()
    setIsLoading(true)
    
    try {
      // Only respond to design-related queries
      if (!message.includes('design') && !message.includes('brief') && !message.includes('ui') && 
          !message.includes('ux') && !message.includes('layout') && !message.includes('brand')) {
        const aiResponse: MessageData = {
          id: generateUniqueId(),
          content: "I specialize in design briefs and design feedback. Please ask me about design-related topics or request a design brief.",
          role: "assistant",
          type: "text",
        }
        setMessages((prev) => [...prev, aiResponse])
        return
      }

      // Check if user is asking for a brief
      if (message.includes("brief")) {
        const aiResponse: MessageData = {
          id: generateUniqueId(),
          content: "I'll help you create a detailed design brief. What type of design project are you working on?",
          role: "assistant",
          type: "options",
          options: [
            { id: "web", label: "Web Design" },
            { id: "mobile", label: "Mobile App" },
            { id: "branding", label: "Brand Identity" },
            { id: "ui", label: "UI/UX Design" },
          ],
        }
        setMessages((prev) => [...prev, aiResponse])
      } else {
        // Generate AI response for all other design-related queries
        const aiResponse = await aiClient.generateResponse(userMessage)
        const newAiMessage: MessageData = {
          id: generateUniqueId(),
          content: aiResponse,
          role: "assistant",
          type: "text",
        }
        setMessages((prev) => [...prev, newAiMessage])
        setUsageCount((prev) => prev + 1)
      }
    } catch (error) {
      console.error("Error generating AI response:", error)
      const errorMessage: MessageData = {
        id: generateUniqueId(),
        content: "Sorry, I encountered an error. Please try again.",
        role: "assistant",
        type: "text",
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  // Handle option selection
  const handleOptionSelect = async (optionId: string) => {
    if (usageCount >= usageLimit && !isSubscribed) {
      handleLimitReached()
      return
    }

    // Add user selection as a message
    const selectedOption = messages[messages.length - 1].options?.find((opt) => opt.id === optionId)

    if (selectedOption) {
      const userSelectionMessage: MessageData = {
        id: generateUniqueId(),
        content: selectedOption.label,
        role: "user",
        type: "text",
      }

      setMessages((prev) => [...prev, userSelectionMessage])

      try {
        if (optionId === "brief") {
          setIsLoading(true)
          // Ask for category with a more contextual response
          const prompt = `Generate a brief introduction asking the user what type of design brief they would like. Make it conversational and professional.`
          const responseContent = await aiClient.generateResponse(prompt)
          
          // Extract just the question part if the response is too verbose
          const questionPart = responseContent.split('\n\n')[0] || "What type of design brief would you like?"
          
          const categoryOptions: MessageData = {
            id: generateUniqueId(),
            content: questionPart,
            role: "assistant",
            type: "options",
            options: [
              { id: "web", label: "Web Design" },
              { id: "mobile", label: "Mobile App" },
              { id: "branding", label: "Branding" },
              { id: "ui", label: "UI Design" },
            ],
          }

          setMessages((prev) => [...prev, categoryOptions])
        } else if (optionId === "feedback") {
          setIsLoading(true)
          // Ask for design upload with a more contextual response
          const prompt = `Generate a brief message asking the user to upload their design for feedback. Make it conversational and professional.`
          const responseContent = await aiClient.generateResponse(prompt)
          
          // Extract just the request part if the response is too verbose
          const requestPart = responseContent.split('\n\n')[0] || "Please upload your design, and I'll provide feedback with a heatmap analysis."
          
          const uploadPrompt: MessageData = {
            id: generateUniqueId(),
            content: requestPart,
            role: "assistant",
            type: "text",
          }

          setMessages((prev) => [...prev, uploadPrompt])
        } else if (["web", "mobile", "branding", "ui"].includes(optionId)) {
          // Add a loading message
          const loadingMessage: MessageData = {
            id: generateUniqueId(),
            content: "Generating your design brief...",
            role: "assistant",
            type: "text",
          }
          setMessages((prev) => [...prev, loadingMessage])
          setIsLoading(true)
          
          // Generate a brief based on category
          await generateBrief(optionId)
          setUsageCount((prev) => prev + 1)
          
          // Remove the loading message
          setMessages((prev) => prev.filter(msg => msg.content !== "Generating your design brief..."))
        }
      } catch (error) {
        console.error("Error in option selection:", error)
        const errorMessage: MessageData = {
          id: generateUniqueId(),
          content: "Sorry, I encountered an error. Please try again.",
          role: "assistant",
          type: "text",
        }
        setMessages((prev) => [...prev, errorMessage])
      } finally {
        setIsLoading(false)
      }
    }
  }

  // Generate a design brief
  const generateBrief = async (category: string) => {
    // Show loading state
    setIsLoading(true)
    
    try {
      // Create prompt based on category
      const prompt = `Generate a structured design brief for a ${category} project.
      
      Format the response with clear sections:
      
      # Project Overview
      [Brief description of the project and its goals]
      
      # Target Audience
      [Description of the target users/audience]
      
      # Design Requirements
      [List of design requirements and constraints]
      
      # Key Sections/Features
      [List of important sections or features]
      
      # Technical Specifications
      [Technical requirements and specifications]
      
      # Deliverables
      [Expected deliverables]
      
      Make the brief detailed, professional, and immediately actionable for a designer.`
      
      // Generate AI response
      const briefContent = await aiClient.generateResponse(prompt)
      
      // Parse the markdown sections into structured brief format
      const sections = parseMarkdownSections(briefContent)
      
      const aiResponse: MessageData = {
        id: generateUniqueId(),
        content: "Here's your design brief:",
        role: "assistant",
        type: "brief",
        brief: {
          sections: sections
        }
      }
      
      setMessages((prev) => [...prev, aiResponse])
      setUsageCount((prev) => prev + 1)
    } catch (error) {
      console.error("Error generating brief:", error)
      const errorMessage: MessageData = {
        id: generateUniqueId(),
        content: "Sorry, I encountered an error generating your design brief. Please try again.",
        role: "assistant",
        type: "text",
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  // Handle reaching the usage limit
  const handleLimitReached = () => {
    const limitMessage: MessageData = {
      id: Date.now().toString(),
      content: "You've reached your daily limit of 5 briefs or feedback sessions. Subscribe for unlimited access.",
      role: "assistant",
      type: "text",
    }

    setMessages((prev) => [...prev, limitMessage])
  }

  const handleDesignAnalysis = (result: {
    originalUrl: string;
    heatmapUrl: string;
    analysis: {
      imageSize: { width: number; height: number };
      attentionPoints: Array<{x: number; y: number; weight: number}>;
      dominantAreas: string[];
      visualFlow: string;
    }
  }) => {
    const prompt = `
      I'm analyzing a design with dimensions ${result.analysis.imageSize.width}x${result.analysis.imageSize.height}px.
      
      Based on the attention heatmap analysis:
      
      1. Dominant Areas of Focus:
      ${result.analysis.dominantAreas.join('\n')}
      
      2. Visual Flow Pattern:
      ${result.analysis.visualFlow}
      
      Please provide:
      1. An assessment of the current visual hierarchy
      2. How well the design guides user attention
      3. Specific recommendations for improving the design's effectiveness
      4. Any potential issues with the current attention flow
      
      Consider principles of:
      - Visual hierarchy and emphasis
      - F-pattern and Z-pattern reading behaviors
      - Gestalt principles
      - Call-to-action placement
      - White space usage
    `

    // Add images and prompt to chat
    setMessages(prev => [
      ...prev,
      {
        id: generateUniqueId(),
        role: "user",
        type: "text",
        content: "Please analyze this design",
        imageUrl: result.originalUrl,
        heatmapUrl: result.heatmapUrl
      } as MessageData
    ])

    handleSendMessage(prompt)
  }

  return (
    <div className="dark" suppressHydrationWarning>
      <main className="min-h-screen bg-black bg-gradient-to-br from-black via-purple-950/10 to-black relative overflow-hidden">
        {/* Ambient glow effects */}
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px] opacity-60" suppressHydrationWarning></div>
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-[100px] opacity-50" suppressHydrationWarning></div>

        <div className="max-w-4xl mx-auto h-screen flex flex-col relative z-10 p-4" suppressHydrationWarning>
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-white tracking-tight">
              Chat with{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-300">
                briefAI
              </span>
            </h1>
          </div>

          {/* Usage limit banner */}
          <UsageLimitBanner usageCount={usageCount} usageLimit={usageLimit} isSubscribed={isSubscribed} />

          {/* Chat container */}
          <ChatContainer className="flex-1 overflow-y-auto" isTyping={isLoading}>
            {messages.map((message) => (
              <Message key={message.id} message={message} onOptionSelect={handleOptionSelect} />
            ))}

            <div ref={messagesEndRef} />
          </ChatContainer>

          {/* Subscription banner */}
          {!isSubscribed && usageCount >= usageLimit && <SubscriptionBanner />}

          {/* Chat input */}
          <ChatInput
            onSendMessage={handleSendMessage}
            onFileUpload={handleFileUpload}
            disabled={usageCount >= usageLimit && !isSubscribed}
          />
        </div>
      </main>
    </div>
  )
}

