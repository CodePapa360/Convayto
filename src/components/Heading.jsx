function Heading({ children, addClass }) {
  return (
    <h1 className={`mx-auto mb-5 text-center text-2xl ${addClass}`}>
      {children}
    </h1>
  );
}

export default Heading;
