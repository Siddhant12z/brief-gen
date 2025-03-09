/**
 * Simple test runner for the Design Brief AI LLM integration
 * 
 * This script tests the AIClient directly to verify that the LLM
 * integration is working correctly and generating appropriate responses.
 */

// Using dynamic import for ES modules
async function importAIClient() {
  try {
    const module = await import('../lib/ollama-client.ts');
    return module.AIClient;
  } catch (error) {
    console.error('Error importing AIClient:', error);
    throw error;
  }
}

// Test cases for LLM verification
const testCases = [
  {
    name: 'Design brief request',
    prompt: 'Generate a structured design brief for a web design project',
    expectedSections: ['Overview', 'Requirements', 'Design Guidelines'],
  },
  {
    name: 'UI design principles',
    prompt: 'What are the principles of good UI design?',
    expectedTerms: ['clarity', 'consistency', 'hierarchy', 'feedback', 'accessibility'],
  },
  {
    name: 'UX vs UI explanation',
    prompt: 'Explain the difference between UX and UI design',
    expectedTerms: ['user experience', 'user interface', 'interaction', 'visual'],
  },
];

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
};

// Helper function to check if response includes expected terms
function containsTerms(response, terms) {
  return terms.filter(term => 
    response.toLowerCase().includes(term.toLowerCase())
  );
}

// Helper function to check if response includes expected sections
function containsSections(response, sections) {
  return sections.filter(section => 
    response.includes(`# ${section}`) || response.includes(`## ${section}`)
  );
}

// Run the tests
async function runTests() {
  console.log(`${colors.blue}=== Design Brief AI LLM Integration Tests ===${colors.reset}\n`);
  
  let passedTests = 0;
  let failedTests = 0;
  
  try {
    // Dynamically import the AIClient class
    const AIClient = await importAIClient();
    
    // Initialize the AI client
    const aiClient = new AIClient();
    
    for (const test of testCases) {
      console.log(`${colors.yellow}Testing: ${test.name}${colors.reset}`);
      console.log(`Prompt: "${test.prompt}"`);
      
      try {
        // Generate response from the LLM
        console.log('Generating response...');
        const response = await aiClient.generateResponse(test.prompt);
        console.log('Response received!');
        
        // Check if response meets expectations
        let passed = true;
        let failureReason = '';
        
        if (test.expectedTerms) {
          const foundTerms = containsTerms(response, test.expectedTerms);
          const missingTerms = test.expectedTerms.filter(term => !foundTerms.includes(term));
          
          if (missingTerms.length > 0) {
            passed = false;
            failureReason = `Missing expected terms: ${missingTerms.join(', ')}`;
          }
        }
        
        if (test.expectedSections) {
          const foundSections = containsSections(response, test.expectedSections);
          const missingSections = test.expectedSections.filter(section => !foundSections.includes(section));
          
          if (missingSections.length > 0) {
            passed = false;
            failureReason = `Missing expected sections: ${missingSections.join(', ')}`;
          }
        }
        
        // Output result
        if (passed) {
          console.log(`${colors.green}✓ PASSED${colors.reset}`);
          passedTests++;
        } else {
          console.log(`${colors.red}✗ FAILED: ${failureReason}${colors.reset}`);
          failedTests++;
        }
        
        // Output a sample of the response
        const responseSample = response.length > 300 
          ? response.substring(0, 300) + '...'
          : response;
        console.log('\nResponse sample:');
        console.log(responseSample);
        console.log('\n' + '-'.repeat(50) + '\n');
        
      } catch (error) {
        console.log(`${colors.red}✗ ERROR: ${error.message}${colors.reset}`);
        failedTests++;
      }
    }
    
    // Summary
    console.log(`${colors.blue}=== Test Results ===${colors.reset}`);
    console.log(`Total tests: ${testCases.length}`);
    console.log(`${colors.green}Passed: ${passedTests}${colors.reset}`);
    console.log(`${colors.red}Failed: ${failedTests}${colors.reset}`);
    
    if (failedTests === 0) {
      console.log(`\n${colors.green}✓ All tests passed! The LLM integration is working correctly.${colors.reset}`);
    } else {
      console.log(`\n${colors.red}✗ Some tests failed. The LLM integration may not be working as expected.${colors.reset}`);
    }
  } catch (error) {
    console.error(`${colors.red}Error running tests: ${error.message}${colors.reset}`);
  }
}

// Run the tests
runTests().catch(error => {
  console.error(`${colors.red}Error running tests: ${error.message}${colors.reset}`);
});
