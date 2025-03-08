# Design Practice Application

## Concept Overview

This application is a comprehensive design practice platform that helps designers improve their skills through timed challenges. The platform offers three main features:

1. **Curated Design Briefs**: A collection of design briefs across different categories that users can browse and use for practice.

2. **AI-Powered Design Feedback**: A chat interface where users can upload their designs and receive AI-generated feedback with heatmap analysis.

3. **Quick Design Practice**: A timed practice mode where users can work on design challenges while listening to focus-enhancing music.

The application features a modern, dark-themed UI with glassmorphic elements and purple accents, creating an immersive and focused environment for designers.

## Features Implemented

### 1. Home Page
- Three glassmorphic cards showcasing the main features
- Responsive design with smooth animations
- Dark mode with purple accents and subtle gradient backgrounds

### 2. Curated Briefs
- Category and niche selection dropdowns
- Brief display card with glassmorphic effect
- "Next Brief" button to generate new briefs
- "Show Full Brief" premium feature (disabled for non-subscribers)

### 3. AI Chat Interface
- Interactive chat with the AI assistant
- File upload for design feedback
- Clickable option buttons for guided conversations
- Usage limit tracking (3 briefs/feedbacks per day)
- Subscription promotion for unlimited access
- Heatmap visualization for design feedback

### 4. Quick Practice Mode
- Design category selection (Mobile App, Web App, Branding, Product Design)
- Practice duration selection (10, 20, 30, 45, or 60 minutes)
- Challenge timer with session progress
- Background lofi music for enhanced focus
- Continuous timer that flows across challenges
- Unlimited challenges within the time limit
- Next/Exit buttons for navigation

## File Structure and Purpose

### App Pages

#### `app/page.tsx`
- Main landing page with the three feature cards
- Entry point to the application
- Introduces users to the available features

#### `app/briefs/page.tsx`
- Curated briefs page with category/niche selection
- Displays design briefs with options to generate new ones
- Implements the brief card component

#### `app/chat/page.tsx`
- AI chat interface for design feedback
- Handles message history, file uploads, and interactive options
- Tracks usage limits and promotes subscription

#### `app/practice/page.tsx`
- Quick practice mode with timed challenges
- Manages the practice flow from category selection to challenge completion
- Controls the session timer, challenge progression, and audio playback
- Tracks completed challenges and allows unlimited challenges within the time limit

### Components

#### Home Page Components
- `components/glassmorphic-card.tsx`: Reusable card component for the landing page

#### Brief Components
- `components/brief-card.tsx`: Card component for displaying design briefs

#### Chat Components
- `components/chat/chat-container.tsx`: Container for the chat interface
- `components/chat/message.tsx`: Individual message component (user/AI)
- `components/chat/chat-input.tsx`: Input field with file upload
- `components/chat/option-buttons.tsx`: Clickable option buttons
- `components/chat/usage-limit-banner.tsx`: Banner showing usage limits
- `components/chat/subscription-banner.tsx`: Subscription promotion
- `components/chat/heatmap-feedback.tsx`: Design feedback with heatmap

#### Practice Components
- `components/practice/category-selection.tsx`: Design category selection
- `components/practice/duration-selection.tsx`: Practice duration selection
- `components/practice/challenge-timer.tsx`: Challenge display with timer
- `components/practice/audio-player.tsx`: Background music player

#### UI Components
- `components/ui/*`: shadcn/ui components for buttons, inputs, etc.

### Utility Files
- `lib/utils.ts`: Utility functions for class name merging, etc.
- `tailwind.config.js`: Tailwind CSS configuration
- `app/globals.css`: Global CSS styles and Tailwind directives

## How Components Work Together

### Practice Flow
1. User lands on the home page and selects "Quick Practice"
2. User selects a design category (Mobile App, Web App, etc.)
3. User selects a practice duration (10-60 minutes)
4. System loads challenges based on the selected category
5. Timer starts counting down from the selected duration
6. User works on challenges, clicking "Next" to move to the next challenge
7. Timer continues flowing across challenges until time runs out
8. User can complete as many challenges as they want within the time limit
9. Background music plays during the practice session
10. User can exit at any time or complete the full session

### Brief Generation Flow
1. User selects a category and niche from dropdowns
2. System generates a brief based on the selections
3. User can click "Next Brief" to generate a new brief
4. "Show Full Brief" is a premium feature (requires subscription)

### AI Chat Flow
1. User interacts with the AI through text messages or clickable options
2. User can upload designs for feedback
3. AI provides feedback with heatmap visualization
4. System tracks usage (3 briefs/feedbacks per day limit)
5. Subscription banner appears when limit is reached

## Technical Implementation Details

### State Management
- React's useState and useEffect hooks for local state management
- Props for component communication
- Refs for DOM manipulation (audio player, scroll behavior)

### Styling
- Tailwind CSS for responsive design and styling
- Custom glassmorphic effects with backdrop-blur and gradients
- Dark theme with purple accents

### Interactivity
- Click handlers for buttons and options
- File upload for design feedback
- Timer functionality with progress visualization
- Audio controls for background music

### Accessibility
- Semantic HTML elements
- ARIA attributes where needed
- Keyboard navigation support
- Screen reader considerations

## Future Enhancements

1. **User Authentication**: Implement user accounts and authentication
2. **Database Integration**: Store briefs, feedback, and user progress
3. **Advanced AI Features**: Enhance the AI feedback with more detailed analysis
4. **Community Features**: Allow users to share designs and feedback
5. **Expanded Challenge Library**: Add more categories and challenges
6. **Progress Tracking**: Track user improvement over time
7. **Customizable Practice Sessions**: Allow users to create custom practice routines
8. **Offline Support**: Enable offline functionality for practice sessions

