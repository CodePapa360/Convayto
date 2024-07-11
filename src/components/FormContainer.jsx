export default function Form({ children, onSubmit }) {
  return (
    <form
      onSubmit={onSubmit}
      className="flex w-full max-w-sm flex-col rounded-xl bg-bgPrimary p-6 shadow-2xl dark:bg-bgTertiary"
    >
      {children}
    </form>
  );
}
