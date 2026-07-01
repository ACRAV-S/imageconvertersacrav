import Container from "@/components/common/Container";

export default function Loading() {
  return (
    <Container className="flex-1 flex flex-col items-center justify-center py-24">
      <div className="w-full max-w-xl space-y-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 w-1/3 bg-zinc-200 dark:bg-zinc-800 rounded"></div>
          <div className="h-4 w-2/3 bg-zinc-200 dark:bg-zinc-800 rounded"></div>
          
          <div className="mt-12 h-40 bg-zinc-100 dark:bg-zinc-900 rounded-lg flex items-center justify-center border border-dashed border-zinc-200 dark:border-zinc-800">
            <div className="h-6 w-1/4 bg-zinc-200 dark:bg-zinc-800 rounded"></div>
          </div>
          
          <div className="flex gap-4">
            <div className="h-10 flex-1 bg-zinc-200 dark:bg-zinc-800 rounded"></div>
            <div className="h-10 flex-1 bg-zinc-200 dark:bg-zinc-800 rounded"></div>
          </div>
        </div>
      </div>
    </Container>
  );
}
