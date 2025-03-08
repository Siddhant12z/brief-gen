# Brief-Gen: AI-Powered Design Brief Generator

## Vercel Deployment Guide

### Prerequisites
- A [Vercel](https://vercel.com) account
- A [Together AI](https://together.ai) account for API access
- Your project pushed to a GitHub repository

### Step 1: Prepare Your Repository
1. Ensure your code is pushed to GitHub
2. Make sure your `package.json` has the correct build and start scripts
3. Verify all dependencies are listed in `package.json`

### Step 2: Connect to Vercel
1. Log in to your [Vercel dashboard](https://vercel.com/dashboard)
2. Click "New Project"
3. Import your GitHub repository
4. Select the repository containing Brief-Gen

### Step 3: Configure Project
1. Keep the default framework preset as "Next.js"
2. In the project settings, add the following environment variable:
   - Name: `TOGETHER_API_KEY`
   - Value: Your Together AI API key
3. Configure the build settings:
   - Build Command: `next build`
   - Output Directory: `.next`
   - Install Command: `npm install`

### Step 4: Deploy
1. Click "Deploy"
2. Wait for the build and deployment to complete
3. Once deployed, Vercel will provide you with a production URL

### Step 5: Verify Deployment
1. Visit your deployment URL
2. Test the design brief generation feature
3. Test the design feedback feature
4. Verify that the Together AI integration works

### Automatic Deployments
Vercel will automatically deploy updates when you push changes to your main branch. To deploy changes:
1. Make your code changes
2. Commit and push to GitHub
3. Vercel will automatically start a new deployment

### Troubleshooting
- If the build fails, check the build logs in Vercel
- Verify environment variables are set correctly
- Ensure all dependencies are properly listed in package.json
- Check if the Together AI API key is valid

### Additional Resources
- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment Documentation](https://nextjs.org/docs/deployment)
- [Environment Variables in Vercel](https://vercel.com/docs/concepts/projects/environment-variables)