# Design Brief AI Chat Tests

This directory contains test cases and a test runner for verifying that the LLM integration in the Design Brief AI chat is working correctly.

## Test Files

- `chat-tests.js`: Contains test cases that verify different aspects of the chat functionality
- `chat-test-runner.js`: Implements a test runner that executes the test cases

## What's Being Tested

The test suite verifies that the LLM integration is working correctly by testing:

1. **Topic Filtering**: The AI should only respond to design-related queries
2. **Brief Generation**: The AI should generate appropriate design briefs for different categories
3. **Design Feedback**: The AI should analyze uploaded designs and provide feedback
4. **Usage Limits**: The AI should enforce usage limits for non-subscribed users
5. **Error Handling**: The AI should handle errors gracefully
6. **Response Uniqueness**: The AI should generate unique content for repeated requests

## Test Cases

The test suite includes the following test cases:

- Non-design query rejection
- Design brief requests for different categories (Web, Mobile, Branding, UI/UX)
- Design feedback requests
- General design questions
- Usage limit enforcement
- Subscription status handling
- Image analysis
- Brief uniqueness verification
- Error handling
- Design terminology questions
- Design trend questions

## Running the Tests

To run the tests, you'll need to have Jest and React Testing Library installed:

```bash
npm install --save-dev jest @testing-library/react @testing-library/user-event
```

Add the following to your package.json:

```json
"scripts": {
  "test": "jest"
},
"jest": {
  "testEnvironment": "jsdom",
  "transform": {
    "^.+\\.(js|jsx|ts|tsx)$": "babel-jest"
  }
}
```

Then run the tests with:

```bash
npm test
```

## Interpreting Results

The test results will show which test cases passed or failed. If a test fails, it means the LLM integration is not working as expected for that particular scenario. Check the error message for details on what went wrong.

## Modifying Tests

You can modify the test cases in `chat-tests.js` to add new scenarios or adjust expectations. The test runner in `chat-test-runner.js` implements the logic for executing the tests.

## Mock vs. Real LLM

The tests use a mocked version of the AIClient to provide consistent responses during testing. To test with the real LLM, you would need to remove the mock and handle the asynchronous nature of real API calls.