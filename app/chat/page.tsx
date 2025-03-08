"use client"

import { useState, useRef, useEffect } from "react"
import { ChatContainer } from "@/components/chat/chat-container"
import { ChatInput } from "@/components/chat/chat-input"
import { Message } from "@/components/chat/message"
import { UsageLimitBanner } from "@/components/chat/usage-limit-banner"
import { SubscriptionBanner } from "@/components/chat/subscription-banner"
import { AIClient } from "@/lib/ollama-client"

// Message types
type MessageType = "text" | "image" | "options" | "heatmap"
type Role = "user" | "assistant"

interface MessageData {
  id: string
  content: string
  role: Role
  type: MessageType
  options?: Array<{ id: string; label: string }>
  imageUrl?: string
  heatmapUrl?: string
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
  const [usageLimit] = useState(3)
  const [isSubscribed] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const aiClient = new AIClient()

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
      // First check if it's a design-related query
      const lowerMessage = message.toLowerCase()
      if (!lowerMessage.includes('design') && !lowerMessage.includes('brief') && 
          !lowerMessage.includes('ui') && !lowerMessage.includes('ux') && 
          !lowerMessage.includes('layout') && !lowerMessage.includes('brand')) {
        const aiResponse: MessageData = {
          id: generateUniqueId(),
          content: "I specialize in design briefs and design feedback. Please ask me about design-related topics or request a design brief.",
          role: "assistant",
          type: "text",
        }
        setMessages((prev) => [...prev, aiResponse])
        setIsLoading(false)
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
          id: Date.now().toString(),
          content: aiResponse,
          role: "assistant",
          type: "text",
        }
        setMessages((prev) => [...prev, newAiMessage])
      }
    } catch (error) {
      console.error("Error generating AI response:", error)
      const errorMessage: MessageData = {
        id: Date.now().toString(),
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

    try {
      // Convert image to base64
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = async () => {
        const base64Image = reader.result?.toString().split(',')[1]
        if (!base64Image) throw new Error('Failed to convert image to base64')

        const aiResponse = await aiClient.analyzeImage(base64Image)
        const newAiMessage: MessageData = {
          id: generateUniqueId(),
          content: aiResponse,
          role: "assistant",
          type: "text",
          imageUrl,
        }

        setMessages((prev) => [...prev, newAiMessage])
        setUsageCount((prev) => prev + 1)
        setIsLoading(false)
      }
    } catch (error) {
      console.error('Error analyzing image:', error)
      const errorMessage: MessageData = {
        id: generateUniqueId(),
        content: "Sorry, I encountered an error analyzing the image. Please try again.",
        role: "assistant",
        type: "text",
      }
      setMessages((prev) => [...prev, errorMessage])
      setIsLoading(false)
    }
  }

  // Handle AI response based on user input
  const handleAIResponse = (userMessage: string) => {
    if (usageCount >= usageLimit && !isSubscribed) {
      handleLimitReached()
      return
    }

    const message = userMessage.toLowerCase()
    
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
      // Design-related response
      const aiResponse: MessageData = {
        id: generateUniqueId(),
        content: "I can help you with creating comprehensive design briefs or provide professional design feedback. Would you like to generate a design brief or receive a design critique?",
        role: "assistant",
        type: "options",
        options: [
          { id: "brief", label: "Generate a design brief" },
          { id: "feedback", label: "Get design feedback" },
        ],
      }
      setMessages((prev) => [...prev, aiResponse])
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
      setIsLoading(true)

      // Generate response based on selection
      setTimeout(() => {
        if (optionId === "brief") {
          // Ask for category
          const categoryOptions: MessageData = {
            id: (Date.now() + 1).toString(),
            content: "What type of design brief would you like?",
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
          // Ask for design upload
          const uploadPrompt: MessageData = {
            id: (Date.now() + 1).toString(),
            content: "Please upload your design, and I'll provide feedback with a heatmap analysis.",
            role: "assistant",
            type: "text",
          }

          setMessages((prev) => [...prev, uploadPrompt])
        } else if (["web", "mobile", "branding", "ui"].includes(optionId)) {
          // Generate a brief based on category
          generateBrief(optionId)
          setUsageCount((prev) => prev + 1)
        }

        setIsLoading(false)
      }, 1000)
    }
  }

  // Generate a design brief
  const generateBrief = (category: string) => {
    const briefs: Record<string, string> = {
      web: `Project Overview:
- Design a responsive landing page for a sustainable fashion brand
- Focus on showcasing eco-conscious fashion and ethical practices

Target Audience:
- Environmentally conscious fashion consumers
- Age range: 25-45
- Values sustainability and ethical manufacturing

Design Requirements:
- Modern, clean aesthetic that emphasizes sustainability
- Responsive design for all devices
- Emphasis on visual storytelling

Key Sections:
1. Hero section with brand mission
2. Product showcase with sustainability features
3. Brand story and ethical manufacturing process
4. Newsletter signup with eco-impact messaging

Technical Specifications:
- Mobile-first approach
- Optimal performance and loading times
- Accessibility compliance (WCAG 2.1)

Deliverables:
- Responsive webpage designs (mobile, tablet, desktop)
- Interactive prototypes
- Style guide with sustainable design elements`,
      mobile: `Project Overview:
- Develop a meal planning mobile application
- Focus on personalized dietary preferences and convenience

Target Audience:
- Health-conscious individuals
- Busy professionals and families
- Users interested in organized meal preparation

Design Requirements:
- Intuitive and efficient user interface
- Clear visual hierarchy
- Seamless user experience

Key Features:
1. Recipe discovery with dietary filters
2. Drag-and-drop meal calendar
3. Smart shopping list generator
4. Nutritional information display

Technical Specifications:
- Native mobile app design principles
- Offline functionality
- Performance optimization

Deliverables:
- UI design for all key screens
- Interactive prototype
- Design system documentation`,
      branding: `Project Overview:
- Create brand identity for an artisanal coffee shop
- Emphasize direct trade relationships with farmers

Target Audience:
- Coffee enthusiasts and connoisseurs
- Socially conscious consumers
- Urban professionals and creatives

Design Requirements:
- Sophisticated yet approachable aesthetic
- Versatile brand elements
- Cohesive visual language

Brand Elements:
1. Logo suite (primary, secondary, icon)
2. Color palette reflecting warmth and quality
3. Typography system (primary and secondary)
4. Pattern and texture library

Application Examples:
- Packaging and labels
- Store signage and environment
- Digital presence

Deliverables:
- Comprehensive brand guidelines
- Logo files in all formats
- Brand application mockups`,
      ui: `Project Overview:
- Design a personal finance dashboard interface
- Focus on data visualization and user engagement

Target Audience:
- Individual financial planning users
- Various financial literacy levels
- Goal-oriented individuals

Design Requirements:
- Clear data visualization
- Intuitive navigation
- Accessible financial insights

Key Features:
1. Expense tracking dashboard
2. Goal setting and progress visualization
3. Spending pattern analysis
4. Budget management tools

Technical Specifications:
- Responsive dashboard layout
- Real-time data updates
- Cross-device compatibility

Deliverables:
- UI component library
- Interactive dashboard prototype
- User flow documentation`,
    }

    const aiResponse: MessageData = {
      id: Date.now().toString(),
      content: briefs[category] || "Here's your design brief...",
      role: "assistant",
      type: "text",
    }

    setMessages((prev) => [...prev, aiResponse])
  }

  // Handle reaching the usage limit
  const handleLimitReached = () => {
    const limitMessage: MessageData = {
      id: Date.now().toString(),
      content: "You've reached your daily limit of 3 briefs or feedback sessions. Subscribe for unlimited access.",
      role: "assistant",
      type: "text",
    }

    setMessages((prev) => [...prev, limitMessage])
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
..


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

