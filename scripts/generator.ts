import fs from 'fs';
import path from 'path';

const args = process.argv.slice(2);
const category = args[0] || 'frontend';
const language = args[1] || 'react';
const lesson = args[2] || 'new-lesson';

const contentDir = path.join(process.cwd(), 'src', 'content', category, language);
const filePath = path.join(contentDir, `${lesson}.mdx`);

if (!fs.existsSync(contentDir)) {
  fs.mkdirSync(contentDir, { recursive: true });
}

if (fs.existsSync(filePath)) {
  console.log(`Error: File already exists at ${filePath}`);
  process.exit(1);
}

const template = `---
title: ${lesson.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())}
description: Learn about ${lesson} in ${language}
order: 0
---

# Introduction to ${lesson}

This is a generated lesson on ${lesson}.

## Interactive Lab

<InteractiveLab title="${category}/${language}/${lesson}">
  {/* Add your component here */}
</InteractiveLab>

## Basic Implementation

Explain the core logic here with a code snippet:

\`\`\`tsx
// Your example code
\`\`\`
`;

fs.writeFileSync(filePath, template, 'utf-8');
console.log(`Successfully created new MDX lesson at: ${filePath}`);
