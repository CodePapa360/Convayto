export default function Form({ children, onSubmit }) {
  return (
    <div className=" flex w-full items-center justify-center p-4">
      <form
        onSubmit={onSubmit}
        className="flex w-full max-w-sm flex-col items-start rounded-xl bg-bgPrimary p-6 shadow-2xl dark:bg-bgTertiary"
      >
        {children}
      </form>
    </div>
  );
}
