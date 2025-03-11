import { NextResponse } from 'next/server';

// The documentation content as a markdown string
const documentationMarkdown = `
# Brief Gen Documentation

## Table of Contents
- [Introduction](#introduction)
- [Codebase Structure](#codebase-structure)
- [Technology Stack](#technology-stack)
- [Page Flows](#page-flows)
- [Future Goals and Enhancements](#future-goals-and-enhancements)

## Introduction

Brief Gen is a web application designed to help UI/UX designers improve their skills through practice and briefs. The platform provides design challenges, a chat interface for design discussions, and a timer-based practice system to help designers build skills in a focused manner.

## Codebase Structure

The application follows Next.js 15 app directory structure:

\`\`\`
/app                  # Main application code
  /api                # API routes
  /chat               # Chat interface
  /practice           # Practice challenges interface
  /page.tsx           # Home page
/components           # Reusable UI components
  /brief-card.tsx     # Card component for displaying briefs
  /ui                 # UI component library
  /practice           # Components specific to practice functionality
/lib                  # Utility functions and services
  /ollama-client.ts   # AI client for generating briefs and analyzing designs
/public               # Static assets
\`\`\`

## Technology Stack

The application uses the following technologies:

### Frontend
- **Next.js 15**: For server-side rendering and client-side routing
- **React**: For building the user interface
- **TypeScript**: For type safety and better developer experience
- **Tailwind CSS**: For styling
- **Shadcn/UI**: For UI components and design system

### Backend & APIs
- **Next.js API Routes**: For backend functionality
- **Mistral AI API**: For generating design briefs and challenges
- **Vercel**: For hosting and deployment

### State Management
- **React Hooks**: For local component state
- **Local Storage**: For persisting user preferences and settings

## Page Flows

### Home Page
The home page serves as the entry point to the application, providing navigation to other sections and showcasing key features.

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

### Chat Interface Flow
The chat interface allows users to:
1. Upload designs for feedback
2. Ask questions about design principles
3. Get AI-generated feedback on their work
4. Engage in conversations about design concepts and challenges

## Key Components

### BriefCard Component
- Displays design briefs with markdown support
- Uses responsive design for different device sizes
- Includes action buttons for brief interaction

### ChallengeTimer Component
- Displays the current challenge with a countdown timer
- Shows practice session progress
- Provides controls for pausing, resuming, or exiting the session
- Renders challenge content in a structured format with proper styling

### AIClient
- Handles communication with AI APIs (Mistral)
- Generates design briefs and challenges
- Provides design feedback based on prompts
- Includes retry logic for API failures

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

### UI/UX Considerations
- Dark mode interface for reduced eye strain
- Accessibility features for inclusive design
- Responsive layouts for all device sizes
- Clear typography hierarchy for readability

### Performance Optimization
- API request throttling and caching
- Optimized image handling
- Progressive enhancement for better UX
`;

export async function GET() {
  return NextResponse.json({
    content: documentationMarkdown,
  });
} 