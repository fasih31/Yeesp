
// Load environment variables from Replit Secrets
// This ensures secrets are available before any other modules load

import { readFileSync } from 'fs';
import { join } from 'path';

function loadReplitSecrets() {
  try {
    // Replit stores secrets in a special directory
    const secretsPath = '/run/secrets';
    const secretFiles = ['SUPABASE_URL', 'SUPABASE_SERVICE_ROLE_KEY', 'DATABASE_URL'];
    
    for (const secretName of secretFiles) {
      try {
        const secretValue = readFileSync(join(secretsPath, secretName), 'utf8').trim();
        if (secretValue) {
          process.env[secretName] = secretValue;
        }
      } catch (err) {
        // Secret file doesn't exist, skip
      }
    }
  } catch (err) {
    // Secrets directory doesn't exist, environment variables may already be set
  }
}

// Load secrets immediately when this module is imported
loadReplitSecrets();

export {};
