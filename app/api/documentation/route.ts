import { NextResponse } from 'next/server';

// The documentation content as a markdown string
const documentationMarkdown = `
# Brief Gen Documentation

## Table of Contents
- [Introduction](#introduction)
- [Codebase Structure](#codebase-structure)
- [Technology Stack](#technology-stack)
- [Implementation Details](#implementation-details)
- [Page Flows](#page-flows)
- [Module Usage](#module-usage)
- [Application Flow Diagrams](#application-flow-diagrams)
- [Future Goals and Enhancements](#future-goals-and-enhancements)

## Introduction

Brief Gen is a web application designed to help UI/UX designers improve their skills through practice and briefs. The platform provides design challenges, a chat interface for design discussions, and a timer-based practice system to help designers build skills in a focused manner.

## Codebase Structure

The application follows Next.js 15 app directory structure:

\`\`\`
/app                    # Main application code (Next.js App Router)
  /api                  # API routes for backend functionality
    /documentation      # Documentation API endpoint
  /chat                 # Chat interface with AI assistant
  /practice             # Practice challenges interface
  /briefs               # Design briefs browsing interface
  /doc-flow-admin       # Admin section for documentation flow
  /page.tsx             # Home page with main navigation
  /layout.tsx           # Root layout with global providers
/components             # Reusable UI components
  /ui                   # UI component library (based on shadcn/ui)
  /brief-card.tsx       # Card component for displaying briefs
  /glassmorphic-card    # Styled card for home page navigation
  /practice             # Components specific to practice functionality
/lib                    # Utility functions and services
  /ollama-client.ts     # AI client for generating briefs and analyzing designs
  /predefined-briefs.ts # Collection of predefined design briefs
  /heatmap-generator.ts # Visualization tool for user activity
  /utils.ts             # General utility functions
/public                 # Static assets and images
/styles                 # Global CSS and styling utilities
/hooks                  # Custom React hooks for state management
/types                  # TypeScript type definitions
/tests                  # Test files and test utilities
/__mocks__              # Mock files for testing
\`\`\`

## Technology Stack

The application uses the following technologies:

### Frontend
- **Next.js 15**: For server-side rendering, client-side routing, and API routes
- **React 18**: For building the user interface with functional components and hooks
- **TypeScript**: For type safety, better developer experience, and code documentation
- **Tailwind CSS**: For utility-first styling approach with responsive design
- **Shadcn/UI**: For consistent UI components and design system with full customization

### UI Components and Design
- **Radix UI**: Low-level, accessible UI primitives used by shadcn/ui
- **Lucide React**: Lightweight icon components
- **Recharts**: For data visualization components
- **Embla Carousel**: For responsive, touch-friendly carousels
- **React Markdown**: For rendering markdown content in briefs and documentation

### Backend & APIs
- **Next.js API Routes**: For serverless backend functionality
- **Mistral AI API**: For generating design briefs and challenges
- **OpenRouter API**: For flexible AI model selection
- **Chutes API**: For additional AI services

### State Management
- **React Hooks**: For local component state and effects
- **React Context API**: For global state accessible across components
- **Local Storage**: For persisting user preferences and session data

### Testing and Quality Assurance
- **Jest**: For unit and integration testing
- **React Testing Library**: For component testing
- **TypeScript**: For static type checking

### Deployment
- **Vercel**: For hosting, CI/CD, and edge functions

## Implementation Details

### AI Integration Architecture

The application integrates AI capabilities through a dedicated client implementation in \`lib/ollama-client.ts\`. This client provides:

1. **Text Generation**: For creating design briefs, challenges, and responding to user questions
2. **Image Analysis**: For providing feedback on user-uploaded design work

The AI client implements:
- **Multiple Model Support**: Can work with different AI models based on the use case
- **Retry Logic**: Handles rate limiting, network errors, and other API issues with exponential backoff
- **Streaming Responses**: Enables real-time streaming of AI responses for better UX
- **Error Handling**: Graceful degradation when AI services are unavailable

### Core Application Components

#### 1. Home Page (app/page.tsx)
The home page serves as the entry point, showcasing three main features through GlassmorphicCard components:
- Curated Briefs
- Chat with AI
- Practice Mode

The page employs a dark theme with subtle ambient glow effects created using absolute positioned divs with blur and gradient effects.

#### 2. Practice Session (app/practice/page.tsx)
The practice session is a complex feature that:
- Allows users to select design categories and time duration
- Generates appropriate design challenges based on user selections
- Implements a countdown timer to track practice sessions
- Provides a structured format for displaying challenge information
- Uses state management to track session progress

#### 3. Chat Interface
The chat interface enables:
- Real-time conversations with the AI assistant
- Design feedback on uploaded images
- Markdown rendering for rich text responses
- Persistent chat history within the session

### State Management Approach

The application uses a combination of:
- **React useState**: For component-level state
- **React useContext**: For sharing state across components without prop drilling
- **React useReducer**: For complex state logic in features like the practice session
- **localStorage**: For persisting user preferences and session data between visits

## Page Flows

### Home Page Flow
1. User lands on the home page
2. Three main features are presented as interactive cards
3. User selects one of the three paths based on their goals

### Practice Page Flow
1. **Category Selection**: User selects a design category (web, mobile, etc.)
2. **Duration Selection**: User selects a practice duration
3. **Challenge Generation**: System generates challenges based on selection
4. **Practice Session**: 
   - Timer counts down from selected duration
   - Challenge is displayed with specific requirements
   - Resources and tools are suggested to help with the challenge
5. **Session Completion**: User completes the practice session
   - Option to restart or exit
   - Prompt to save or share work (future feature)

### Chat Interface Flow
The chat interface allows users to:
1. Start a new conversation or continue existing one
2. Type questions about design principles or request new briefs
3. Upload designs for feedback (using the file upload button)
4. Receive AI-generated responses with markdown formatting
5. Use the conversation history for context in follow-up questions

### Briefs Browsing Flow
1. User browses available design brief categories
2. Filters briefs by difficulty level, design type, or industry
3. Selects a brief to view detailed requirements
4. Can bookmark briefs for later reference
5. Option to start a practice session based on the selected brief

## Module Usage

### Why Next.js App Router
The application leverages Next.js App Router architecture for:
- **Server Components**: Reducing client-side JavaScript bundle size
- **Nested Routing**: Creating intuitive URL structures matching the UI hierarchy
- **API Routes**: Implementing serverless backend functionality
- **Metadata API**: Improving SEO and social sharing capabilities
- **Progressive Enhancement**: Ensuring functionality across different client capabilities

### Why Shadcn/UI Components
The UI components are built on shadcn/ui for:
- **Accessibility**: Ensuring WCAG compliance through Radix UI primitives
- **Customization**: Complete control over styling and behavior
- **Developer Experience**: Consistency and predictability in component APIs
- **Performance**: Optimized rendering and minimal bundle size
- **Type Safety**: Full TypeScript support for component props

### Why AI Integration
The application integrates AI capabilities to:
- **Generate Unique Briefs**: Create personalized design challenges
- **Provide Feedback**: Offer constructive feedback on design work
- **Guide Learning**: Suggest resources and approaches for skill improvement
- **Scale Content**: Enable a wide variety of briefs without manual creation

### Why Custom AI Client
A custom AI client was implemented to:
- **Abstract Complexity**: Shield the application from API-specific implementation details
- **Enhance Reliability**: Implement retry logic and error handling
- **Enable Flexibility**: Switch between different AI providers or models
- **Optimize Performance**: Implement caching and response streaming
- **Secure Credentials**: Properly manage API keys and authentication

## Application Flow Diagrams

### Overall Application Architecture

\`\`\`
┌─────────────────────────────────────┐
│            Client Browser            │
└───────────────┬─────────────────────┘
                │
                ▼
┌─────────────────────────────────────┐
│         Next.js Application         │
│                                     │
│  ┌─────────────┐    ┌─────────────┐ │
│  │    Pages    │    │  API Routes  │ │
│  └──────┬──────┘    └───────┬─────┘ │
│         │                   │       │
│  ┌──────▼──────┐    ┌───────▼─────┐ │
│  │  Components │    │    Services  │ │
│  └──────┬──────┘    └───────┬─────┘ │
│         │                   │       │
│  ┌──────▼──────┐            │       │
│  │     Hooks   │◄───────────┘       │
│  └─────────────┘                    │
└─────────────────┬───────────────────┘
                  │
                  ▼
┌─────────────────────────────────────┐
│           External APIs             │
│                                     │
│  ┌─────────────┐    ┌─────────────┐ │
│  │  Mistral AI │    │  OpenRouter │ │
│  └─────────────┘    └─────────────┘ │
│                                     │
│  ┌─────────────┐    ┌─────────────┐ │
│  │   Chutes    │    │  Other APIs │ │
│  └─────────────┘    └─────────────┘ │
└─────────────────────────────────────┘
\`\`\`

### Practice Session Flow

\`\`\`
┌────────────┐     ┌────────────┐     ┌────────────┐
│   Select   │     │   Select   │     │  Generate  │
│  Category  │────►│  Duration  │────►│  Challenge │
└────────────┘     └────────────┘     └─────┬──────┘
                                            │
                                            ▼
┌────────────┐     ┌────────────┐     ┌────────────┐
│  Session   │     │  Practice  │     │  Display   │
│ Completion │◄────│   Timer    │◄────│  Challenge │
└──────┬─────┘     └────────────┘     └────────────┘
       │
       ▼
┌────────────┐     ┌────────────┐
│ Save/Share │     │ Start New  │
│    Work    │     │  Session   │
└────────────┘     └────────────┘
\`\`\`

### AI Chat Flow

\`\`\`
┌────────────┐     ┌────────────┐     ┌────────────┐
│  User      │     │   Send     │     │  Process   │
│  Input     │────►│  Request   │────►│  Request   │
└────────────┘     └────────────┘     └─────┬──────┘
                                            │
                                            ▼
┌────────────┐     ┌────────────┐     ┌────────────┐
│  Display   │     │   Parse    │     │  Call AI   │
│  Response  │◄────│  Response  │◄────│   API      │
└────────────┘     └────────────┘     └────────────┘
\`\`\`

### AI Client Operation

\`\`\`
┌────────────┐     ┌────────────┐     ┌────────────┐
│  Request   │     │  Validate  │     │  Select    │
│  Initiated │────►│  Request   │────►│   Model    │
└────────────┘     └────────────┘     └─────┬──────┘
                                            │
                                            ▼
┌────────────┐     ┌────────────┐     ┌────────────┐
│ Handle     │     │ Process    │     │  Send API  │
│ Response   │◄────│ Response   │◄────│  Request   │
└──────┬─────┘     └────────────┘     └────────────┘
       │                                     ▲
       │                                     │
       │           ┌────────────┐            │
       │           │  Retry on  │            │
       └──────────►│   Error    │────────────┘
                   └────────────┘
\`\`\`

## Key Components

### BriefCard Component
- Displays design briefs with markdown support
- Uses responsive design for different device sizes
- Includes action buttons for brief interaction
- Implements shadow and hover effects for better UX
- Supports different states for selected/unselected briefs

### ChallengeTimer Component
- Displays the current challenge with a countdown timer
- Shows practice session progress
- Provides controls for pausing, resuming, or exiting the session
- Renders challenge content in a structured format with proper styling
- Implements audio notifications for time milestones

### AIClient
- Handles communication with AI APIs (Mistral, OpenRouter, Chutes)
- Manages API keys and authentication securely
- Generates design briefs and challenges
- Provides design feedback based on prompts
- Includes retry logic for API failures
- Implements streaming responses for better UX
- Handles error states gracefully

### GlassmorphicCard
- Creates a modern UI card with frosted glass effect
- Implements custom gradients and glow effects
- Supports responsive design principles
- Includes interactive hover and focus states
- Uses accessible markup for keyboard navigation

## Future Goals and Enhancements

### Short-term Improvements
1. **Enhanced Analytics**: Track user progress and practice statistics
2. **Social Sharing**: Allow users to share their completed challenges
3. **Expanded Challenge Categories**: Add more specialized design categories
4. **Offline Support**: Enable offline practice sessions
5. **Multi-language Support**: Translate the interface to other languages

### Mid-term Goals
1. **User Accounts**: Implement authentication and user profiles
2. **Community Features**: Enable comments and feedback from other designers
3. **Challenge Library**: Create a searchable library of past challenges
4. **Custom Challenge Creation**: Allow users to create and share their own challenges

### Long-term Vision
1. **Advanced Design Analysis**: Implement more sophisticated AI feedback on uploaded designs
2. **Personalized Learning Paths**: Create custom skill development journeys
3. **Design Mentor Matching**: Connect users with design mentors
4. **Design Competition Platform**: Host design competitions and challenges
5. **Integration with Design Tools**: Connect with popular design applications

## Implementation Notes

### AI Prompt Engineering
The application uses carefully crafted prompts to generate focused design challenges:
- Challenges are specific to a single UI component or interaction
- Resource suggestions include actual tools and inspiration links
- Prompts emphasize clarity and achievable goals
- System messages establish clear context and boundaries for AI responses
- Prompt templates are parameterized to allow for customization

### UI/UX Considerations
- Dark mode interface for reduced eye strain during long design sessions
- Accessibility features for inclusive design (ARIA attributes, keyboard navigation)
- Responsive layouts for all device sizes (mobile, tablet, desktop)
- Clear typography hierarchy for readability
- Motion design principles applied for meaningful animations
- Color theory applied for visual hierarchy and emotional impact

### Performance Optimization
- API request throttling and caching
- Optimized image handling with next/image
- Progressive enhancement for better UX
- Code splitting for reduced initial load time
- Server components for reduced client-side JavaScript
- Prefetching for anticipated user journeys
`;

export async function GET() {
  return NextResponse.json({
    content: documentationMarkdown,
  });
} 