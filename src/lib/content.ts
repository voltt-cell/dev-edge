import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export type FileNode = {
  name: string;
  type: 'file' | 'directory';
  path: string;
  slug: string;
  order: number;
  children?: FileNode[];
};

export function getSidebarContent(): FileNode[] {
  const contentDir = path.join(process.cwd(), 'src/content');
  
  if (!fs.existsSync(contentDir)) return [];

  function readDirectory(dir: string, currentPath: string[] = []): FileNode[] {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    
    // Read optional _meta.json for directory-level ordering
    const metaPath = path.join(dir, '_meta.json');
    let meta: Record<string, { order?: number; title?: string }> = {};
    if (fs.existsSync(metaPath)) {
      try {
        meta = JSON.parse(fs.readFileSync(metaPath, 'utf8'));
      } catch (e) {
        console.warn(`Error parsing _meta.json in ${dir}`);
      }
    }

    const nodes = entries
      .filter((entry) => !entry.name.startsWith('.') && !entry.name.startsWith('_'))
      .map((entry) => {
        const entryPath = path.join(dir, entry.name);
        const slug = entry.isDirectory() ? entry.name : path.parse(entry.name).name;
        const relativePath = [...currentPath, slug].join('/');
        
        let order = meta[slug]?.order ?? 999;

        if (entry.isDirectory()) {
          return {
            name: meta[slug]?.title || entry.name,
            type: 'directory' as const,
            path: relativePath,
            slug: slug,
            order: order,
            children: readDirectory(entryPath, [...currentPath, slug]),
          };
        } else {
          // Parse MDX frontmatter for order
          const fileContent = fs.readFileSync(entryPath, 'utf8');
          const { data } = matter(fileContent);
          order = data.order ?? order;

          return {
            name: data.title || slug,
            type: 'file' as const,
            path: relativePath,
            slug: slug,
            order: order,
          };
        }
      });

    // Sort by order, then alphabetically by name
    return nodes.sort((a, b) => {
      if (a.order !== b.order) return a.order - b.order;
      return a.name.localeCompare(b.name);
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
  order: number;
}

export function getAllLessons(): Lesson[] {
  const contentDir = path.join(process.cwd(), 'src/content');
  if (!fs.existsSync(contentDir)) return [];

  const lessons: Lesson[] = [];

  function walk(dir: string, currentPath: string[] = []) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
      if (entry.name.startsWith('.') || entry.name.startsWith('_')) continue;
      
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
          path: [...currentPath, parsedPath.name].join('/'),
          order: data.order ?? 999
        });
      }
    }
  }

  walk(contentDir);
  
  // Sort lessons globally by order, then category, then tech
  return lessons.sort((a, b) => {
    if (a.order !== b.order) return a.order - b.order;
    if (a.category !== b.category) return a.category.localeCompare(b.category);
    return a.title.localeCompare(b.title);
  });
}
