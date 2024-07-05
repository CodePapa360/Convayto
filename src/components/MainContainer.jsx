export default function MainContainer({ children }) {
  return (
    <main className="flex min-h-screen-safe flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-slate-200 to-slate-300 text-black dark:from-slate-800 dark:to-slate-950 dark:text-white">
      {children}
    </main>
  );
}
