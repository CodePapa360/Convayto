export default function MainContainer({ children }) {
  return (
    <main className="flex min-h-screen-safe items-center justify-center overflow-hidden bg-deepSlate text-black dark:bg-deepSlate-dark dark:text-white">
      {children}
    </main>
  );
}
