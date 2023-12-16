function Settings({ onSetMyAccountView }) {
  return (
    <div>
      <button onClick={() => onSetMyAccountView(false)}>Back</button>
      <p>Account details</p>
    </div>
  );
}

export default Settings;
