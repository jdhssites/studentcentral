/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable server components for API routes and server-side processing
  reactStrictMode: true,
  
  // Environment variables that should be available to the browser
  // Note: We're not exposing the API key to the client, only to server components
  env: {
    // Add any env vars that should be available to client components here
  },
  
  // Output configuration for better deployment compatibility
  output: 'standalone',
  
  // Use server actions for API calls
  experimental: {
    serverActions: {
      allowedOrigins: ["*"]
    }
  },
};

module.exports = nextConfig; 