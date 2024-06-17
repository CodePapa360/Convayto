import { Link } from "react-router-dom";

function TextLink({ children, href, addClass, to }) {
  const classes = `text-violet-700 underline dark:text-violet-400 ${addClass}`;

  if (to)
    return (
      <Link className={classes} to={to}>
        {children}
      </Link>
    );

  if (href)
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
      >
        {children}
      </a>
    );
}

export default TextLink;
