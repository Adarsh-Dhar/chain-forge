# Code Server Integration

This folder contains logic for integrating with code-server or similar environments to write code files based on AI-generated prompts.

## Usage

- Use the `writeCodeFromPrompts` function to write code or file content prompts to the file system.
- Prompts should be parsed and mapped to appropriate file paths and contents in a real implementation.

## Example

```ts
import { writeCodeFromPrompts } from './index';

const prompts = [
  'console.log("Hello, world!");',
  '<!DOCTYPE html>\n<html>...</html>'
];

await writeCodeFromPrompts(prompts, '/path/to/project');
``` 