// Utility functions for code-server integration

/**
 * Parses a prompt string and returns an object with filePath and content.
 * Placeholder: In a real implementation, this would use more advanced parsing.
 */
export function parsePromptToFile(prompt: string, index: number) {
  // Example: Just create a txt file for now
  return {
    filePath: `generated_file_${index + 1}.txt`,
    content: prompt,
  };
} 