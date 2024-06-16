import { Link } from "react-router-dom";

function TextLink({ href, text, to }) {
  if (to)
    return (
      <Link
        className="mb-4 text-violet-700 underline dark:text-violet-400"
        to={to}
      >
        {text}
      </Link>
    );

  if (href)
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="mb-4 text-violet-700 underline dark:text-violet-400"
      >
        {text}
      </a>
    );
}

export default TextLink;
