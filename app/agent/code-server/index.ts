// code-server integration logic for writing code files based on prompts

import fs from 'fs';
import path from 'path';
import { parsePromptToFiles } from './utils';

/**
 * Writes code files based on the prompts received from the backend.
 * @param prompts Array of code or file content prompts
 * @param baseDir Directory to write files to
 */
export async function writeCodeFromPrompts(prompts: string[], baseDir: string) {
  for (let i = 0; i < prompts.length; i++) {
    const files = parsePromptToFiles(prompts[i]);
    for (const { filePath, content } of files) {
      const fullPath = path.join(baseDir, filePath);
      await fs.promises.mkdir(path.dirname(fullPath), { recursive: true });
      await fs.promises.writeFile(fullPath, content, 'utf8');
    }
  }
} 