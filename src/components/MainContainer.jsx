export default function MainContainer({ children }) {
  return (
    <main className="flex min-h-screen-safe flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-bgSecondary to-bgSecondaryDim text-textPrimary dark:from-bgSecondary-dark dark:to-bgSecondaryDim-dark dark:text-textPrimary-dark">
      {children}
    </main>
  );
}
