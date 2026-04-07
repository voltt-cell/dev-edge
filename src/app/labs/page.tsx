import { getAllLessons } from '@/lib/content';
import { LabsExplorerClient } from './LabsExplorerClient';

export default function LabsPage() {
  const lessons = getAllLessons();

  return (
    <div className="min-h-screen bg-background py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <LabsExplorerClient lessons={lessons} />
      </div>
    </div>
  );
}
