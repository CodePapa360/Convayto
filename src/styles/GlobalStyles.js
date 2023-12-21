import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
/* ///////////////// */
/* //Reset// */
*,
*::before,
*::after {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  /* Creating animations for dark mode */
  /* transition: background-color 0.3s, border 0.3s; */
}

/* Remove default margin */
body,
h1,
h2,
h3,
h4,
p,
figure,
blockquote,
dl,
dd {
  margin: 0;
  overflow-wrap: break-word;
  /* hyphens: auto; */
}

ul,
ol {
  list-style: none;
  margin: 0;
  padding: 0;
}

/* Set core root defaults */
html {
  scroll-behavior: smooth;
}

/* Set core body defaults */
body {
  text-rendering: optimizeSpeed;
  line-height: 1.5;
  transition: color 0.3s, background-color 0.3s;

}

/* A elements that don't have a class get default styles */
a:not([class]) {
  -webkit-text-decoration-skip: ink;
  text-decoration-skip-ink: auto;
}

a {
  text-decoration: none;
  color: inherit;
}

/* Make images easier to work with */
img,
picture {
  max-width: 100%;
  display: block;
}

/* Inherit fonts for inputs and buttons */
input,
button,
textarea,
select {
  font: inherit;
  color: inherit;
}

/* select:disabled,
input:disabled {
    background-color: gray;
    color: gray;
} */

button {
  cursor: pointer;
}

button:has(svg) {
  line-height: 0;
}

*:disabled {
  cursor: not-allowed;
}

/* Remove all animations, transitions and smooth scroll for people that prefer not to see them */
@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }

  *,
  *::before,
  *::after {
    -webkit-animation-duration: 0.01ms !important;
    animation-duration: 0.01ms !important;
    -webkit-animation-iteration-count: 1 !important;
    animation-iteration-count: 1 !important;
    -webkit-transition-duration: 0.01ms !important;
    -o-transition-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
/* ////////////// */
/* ///////////// */

body{
  background-color: hsla(239, 100%, 91%, 1);
  cursor: default;

  font-family: "Roboto", -apple-system, apple color emoji, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
}

/* Works on Firefox */
* {
  --bg-color: transparent;
  --the-thumb: rgba(120, 120, 120, 0.7);
  scrollbar-width: thin;
  scrollbar-color: var(--the-thumb) var(--bg-color);
}

/* Works on Chrome, Edge, and Safari */
*::-webkit-scrollbar {
  width: 8px;
}

*::-webkit-scrollbar-track {
  background: var(--bg-color);
  width: 8px;
}

*::-webkit-scrollbar-thumb {
  background-color: var(--the-thumb);
}
`;

export default GlobalStyles;
