import { resolve } from 'node:path';

// Dev convenience (Node 22+): load the repo-root .env before any module reads process.env.
// In production, real environment variables are used and no file exists.
try {
  process.loadEnvFile(resolve(__dirname, '../../../../.env'));
} catch {
  /* no .env file */
}
