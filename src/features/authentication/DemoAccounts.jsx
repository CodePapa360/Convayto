function DemoAccounts({ onDemoLogin }) {
  const demoAccounts = [
    { email: "demo1@example.com", password: "demopassword1" },
    { email: "demo2@example.com", password: "demopassword2" },
  ];

  return (
    <div className="flex w-full items-center justify-between py-4">
      {demoAccounts.map((account, index) => (
        <button
          type="button"
          key={index}
          className="rounded-md bg-bgAccent/20 p-2 px-4"
          onClick={() => onDemoLogin(account.email, account.password)}
        >
          Demo account {index + 1}
        </button>
      ))}
    </div>
  );
}

export default DemoAccounts;
