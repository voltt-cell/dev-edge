import { getSidebarContent } from "@/lib/content";
import { Sidebar } from "@/components/layout/Sidebar";

export default function LearnLayout({ children }: { children: React.ReactNode }) {
  const contentTree = getSidebarContent();

  return (
    <div className="container overflow-hidden max-w-screen-2xl mx-auto flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-10 px-8">
      <Sidebar contentTree={contentTree} />
      <main className="relative py-6 lg:gap-10 lg:py-8 xl:grid xl:grid-cols-[1fr_300px]">
        <div className="mx-auto w-full min-w-0">
          {children}
        </div>
      </main>
    </div>
  );
}
