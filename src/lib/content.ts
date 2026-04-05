import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export type FileNode = {
  name: string;
  type: 'file' | 'directory';
  path: string;
  slug: string;
  children?: FileNode[];
};

export function getSidebarContent(): FileNode[] {
  const contentDir = path.join(process.cwd(), 'src/content');
  
  if (!fs.existsSync(contentDir)) return [];

  function readDirectory(dir: string, currentPath: string[] = []): FileNode[] {
    const entries = fs.readdirSync(dir, { withFileTypes: true });

    return entries
      .filter((entry) => !entry.name.startsWith('.'))
      .map((entry) => {
        if (entry.isDirectory()) {
          return {
            name: entry.name,
            type: 'directory',
            path: [...currentPath, entry.name].join('/'),
            slug: entry.name,
            children: readDirectory(path.join(dir, entry.name), [...currentPath, entry.name]),
          };
        } else {
          // Assume MDX files
          const parsedPath = path.parse(entry.name);
          return {
            name: parsedPath.name,
            type: 'file',
            path: [...currentPath, parsedPath.name].join('/'),
            slug: parsedPath.name,
          };
        }
      });
  }

  return readDirectory(contentDir);
}

export interface Lesson {
  title: string;
  description: string;
  category: string;
  technology: string;
  slug: string;
  path: string;
}

export function getAllLessons(): Lesson[] {
  const contentDir = path.join(process.cwd(), 'src/content');
  if (!fs.existsSync(contentDir)) return [];

  const lessons: Lesson[] = [];

  function walk(dir: string, currentPath: string[] = []) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
      if (entry.isDirectory()) {
        walk(path.join(dir, entry.name), [...currentPath, entry.name]);
      } else if (entry.name.endsWith('.mdx')) {
        const fileContent = fs.readFileSync(path.join(dir, entry.name), 'utf8');
        const { data } = matter(fileContent);
        const parsedPath = path.parse(entry.name);
        
        lessons.push({
          title: data.title || parsedPath.name,
          description: data.description || '',
          category: currentPath[0] || '',
          technology: currentPath[1] || '',
          slug: parsedPath.name,
          path: [...currentPath, parsedPath.name].join('/')
        });
      }
    }
  }

  walk(contentDir);
  return lessons;
}
