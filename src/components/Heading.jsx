function Heading({ children, size = "2xl" }) {
  return <h1 className={`mb-8 text-center text-${size}`}>{children}</h1>;
}

export default Heading;
