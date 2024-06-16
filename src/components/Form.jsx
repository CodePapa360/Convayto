function Form({ children, onSubmit }) {
  return (
    <form
      onSubmit={onSubmit}
      className="flex w-full max-w-80 flex-col rounded-xl bg-mediumSlate p-6 dark:bg-mediumSlate-dark"
    >
      {children}
    </form>
  );
}

export default Form;
