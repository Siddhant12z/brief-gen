/**
 * Test runner for the Design Brief AI chat functionality
 * 
 * This file implements a test runner that executes the test cases defined in chat-tests.js
 * to verify that the LLM integration is working correctly.
 */

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ChatPage from '../app/chat/page';
import chatTestCases from './chat-tests';

// Mock the AIClient to control responses during testing
jest.mock('../lib/ollama-client', () => {
  return {
    AIClient: jest.fn().mockImplementation(() => {
      return {
        generateResponse: jest.fn().mockImplementation((prompt) => {
          // Return different responses based on the prompt content
          if (prompt.includes('principles of good UI design')) {
            return Promise.resolve('The principles of good UI design include clarity, consistency, visual hierarchy, accessibility, and feedback. These principles help create interfaces that are intuitive and user-friendly.');
          } else if (prompt.includes('difference between UX and UI')) {
            return Promise.resolve('UI (User Interface) design focuses on the visual elements and aesthetics of a product, while UX (User Experience) design encompasses the entire user journey and how users interact with the product. UI is about how things look, while UX is about how things work.');
          } else if (prompt.includes('trends in web design')) {
            return Promise.resolve('Current trends in web design include dark mode interfaces, micro-interactions, 3D elements, minimalist design, and accessibility-focused design. These trends focus on creating engaging yet functional user experiences.');
          } else {
            return Promise.resolve('Here is a design-related response that addresses your query about ' + prompt);
          }
        }),
        analyzeImage: jest.fn().mockImplementation(() => {
          return Promise.resolve('Based on my analysis of your design, I can see strong visual hierarchy in the main navigation. However, I would suggest increasing contrast in the footer section and making the call-to-action button more prominent. The color scheme works well overall, but some text elements could benefit from improved readability.');
        })
      };
    })
  };
});

// Mock URL.createObjectURL for image handling
URL.createObjectURL = jest.fn(() => 'mock-image-url');

// Helper function to setup the component with specific initial state
const setupComponent = (initialState = {}) => {
  const { usageCount = 0, isSubscribed = false } = initialState;
  
  // Mock useState to set initial values
  const originalUseState = React.useState;
  jest.spyOn(React, 'useState').mockImplementation((initialValue) => {
    if (initialValue === 0 && arguments.callee.caller.name === 'ChatPage') {
      return [usageCount, jest.fn()];
    } else if (initialValue === false && arguments.callee.name.includes('isSubscribed')) {
      return [isSubscribed, jest.fn()];
    }
    return originalUseState(initialValue);
  });
  
  return render(<ChatPage />);
};

// Helper function to find and select an option button
const selectOption = async (optionLabel) => {
  const optionButton = screen.getByText(optionLabel);
  fireEvent.click(optionButton);
  await waitFor(() => expect(screen.queryByText('Loading...')).not.toBeInTheDocument());
};

// Helper function to send a message
const sendMessage = async (message) => {
  const input = screen.getByPlaceholderText('Type your message...');
  const sendButton = screen.getByRole('button', { name: /send/i });
  
  fireEvent.change(input, { target: { value: message } });
  fireEvent.click(sendButton);
  
  await waitFor(() => expect(screen.queryByText('Loading...')).not.toBeInTheDocument());
};

// Helper function to upload a file
const uploadFile = async (file) => {
  const uploadButton = screen.getByRole('button', { name: /upload image/i });
  const fileInput = screen.getByTestId('file-input'); // Assuming you add data-testid="file-input" to the file input
  
  fireEvent.click(uploadButton);
  fireEvent.change(fileInput, { target: { files: [file] } });
  
  await waitFor(() => expect(screen.queryByText('Loading...')).not.toBeInTheDocument());
};

describe('Chat functionality tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  
  chatTestCases.forEach(testCase => {
    test(testCase.name, async () => {
      // Setup component with any required initial state
      setupComponent(testCase.setup || {});
      
      // If the test case has an error to mock
      if (testCase.mockError) {
        const { method, error } = testCase.mockError;
        AIClient.prototype[method].mockRejectedValueOnce(error);
      }
      
      // If the test case has a single input
      if (testCase.input) {
        await sendMessage(testCase.input);
        
        // Check for expected response
        if (Array.isArray(testCase.expectedResponseIncludes)) {
          testCase.expectedResponseIncludes.forEach(text => {
            expect(screen.getByText(new RegExp(text, 'i'))).toBeInTheDocument();
          });
        } else if (testCase.expectedResponseIncludes) {
          expect(screen.getByText(new RegExp(testCase.expectedResponseIncludes, 'i'))).toBeInTheDocument();
        }
        
        // Check for options if expected
        if (testCase.expectOptions) {
          expect(screen.getAllByRole('button').length).toBeGreaterThan(1);
        }
      }
      
      // If the test case has an action like file upload
      if (testCase.action && testCase.action.uploadFile) {
        await uploadFile(testCase.action.uploadFile);
        
        // Check response type
        if (testCase.expectedResponseType === 'text') {
          expect(screen.getByText(/based on my analysis/i)).toBeInTheDocument();
        }
      }
      
      // If the test case has multiple steps
      if (testCase.steps) {
        const savedResponses = {};
        
        for (const step of testCase.steps) {
          if (step.input) {
            await sendMessage(step.input);
          }
          
          if (step.selectOption) {
            await selectOption(step.selectOption);
          }
          
          // Check for expected response
          if (step.expectedResponseIncludes) {
            const responseElement = screen.getByText(new RegExp(step.expectedResponseIncludes, 'i'));
            expect(responseElement).toBeInTheDocument();
            
            // Save response for later comparison if needed
            if (step.saveResponse) {
              savedResponses[step.saveResponse] = responseElement.textContent;
            }
          }
          
          // Compare with previously saved response
          if (step.compareWith && step.shouldBeDifferent) {
            expect(savedResponses[step.saveResponse]).not.toEqual(savedResponses[step.compareWith]);
          }
        }
      }
    });
  });
});

// Additional tests for edge cases
describe('Chat edge cases', () => {
  test('Should handle empty messages', async () => {
    setupComponent();
    await sendMessage('');
    
    // The message shouldn't be sent, so no new response should appear
    expect(screen.queryByText(/I specialize in design briefs/i)).not.toBeInTheDocument();
  });
  
  test('Should handle very long messages', async () => {
    setupComponent();
    const longMessage = 'design '.repeat(100) + 'brief';
    await sendMessage(longMessage);
    
    // Should still respond appropriately
    expect(screen.getByText(/What type of design project/i)).toBeInTheDocument();
  });
  
  test('Should handle special characters in messages', async () => {
    setupComponent();
    await sendMessage('I need a design brief for a website with special characters: !@#$%^&*()');
    
    // Should still respond appropriately
    expect(screen.getByText(/What type of design project/i)).toBeInTheDocument();
  });
});