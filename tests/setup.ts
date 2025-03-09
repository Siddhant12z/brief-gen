import dotenv from 'dotenv';

// Load environment variables from .env.test
dotenv.config({ path: '.env.test' });

// Set default timeout for tests to 30 seconds since API calls can be slow
jest.setTimeout(30000); 