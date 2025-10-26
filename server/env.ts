
// Load environment variables from Replit Secrets or standard env vars
// This ensures secrets are available before any other modules load

import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

function loadReplitSecrets() {
  try {
    // Replit stores secrets in a special directory
    const secretsPath = '/run/secrets';
    
    // Only attempt to load from Replit secrets if the directory exists
    if (!existsSync(secretsPath)) {
      // Not running on Replit, use standard environment variables
      return;
    }
    
    const secretFiles = ['SUPABASE_URL', 'SUPABASE_SERVICE_ROLE_KEY', 'DATABASE_URL', 'SESSION_SECRET'];
    
    for (const secretName of secretFiles) {
      try {
        const secretFilePath = join(secretsPath, secretName);
        if (existsSync(secretFilePath)) {
          const secretValue = readFileSync(secretFilePath, 'utf8').trim();
          if (secretValue) {
            process.env[secretName] = secretValue;
          }
        }
      } catch (err) {
        // Secret file doesn't exist, skip
      }
    }
  } catch (err) {
    // Secrets directory doesn't exist or not accessible
    // Environment variables should be set through the platform (Render, etc.)
  }
}

// Load secrets immediately when this module is imported
loadReplitSecrets();

export {};
