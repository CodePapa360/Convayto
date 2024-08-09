import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { MdOpenInNew } from "react-icons/md";
import MainContainer from "./MainContainer";

const AboutPage = () => {
  return (
    <MainContainer>
      <div className="mx-auto max-w-4xl px-4 py-8 leading-relaxed">
        <h1 className="sr-only">About Convayto</h1>

        <img
          className="pointer-events-none mx-auto mb-6 w-full max-w-xs select-none"
          src="/images/convayto-logo.png"
          alt="Convayto"
        />

        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold">Project Overview</h2>
          <p>
            Convayto is a real-time chat application built with React.js and
            Supabase. It provides essential features like user authentication,
            profile management, and instant messaging. Designed as a learning
            project, Convayto showcases the core functionalities of modern chat
            applications while emphasizing clean and efficient code practices.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold">Goals</h2>
          <ul className="list-disc pl-5">
            <li>To provide a seamless real-time chatting experience.</li>
            <li>To ensure secure user authentication and data management.</li>
            <li>
              To deliver a responsive and user-friendly interface across various
              devices.
            </li>
            <li>
              To implement optimized performance with features like infinite
              pagination and prefetching.
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold">Developer</h2>

          <div className="mb-4 flex flex-col items-center gap-4 sm:flex-row">
            <img
              src="https://github.com/CodePapa360.png"
              alt="Alamin's Photo"
              className="h-36 w-36 rounded-md"
            />

            <div>
              <p className="mb-2">
                Convayto is developed and maintained by{" "}
                <strong className="text-bgAccent dark:text-textAccent-dark">
                  Alamin
                </strong>
                , a passionate web developer dedicated to building and learning.
                Connect with me on LinkedIn, Twitter, and GitHub.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 text-textAccent dark:text-textAccent-dark">
            <a
              href="https://www.linkedin.com/in/codepapa360"
              className="flex items-center hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin className="mr-2" /> LinkedIn
            </a>
            <a
              href="https://twitter.com/CodePapa360"
              className="flex items-center hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTwitter className="mr-2" /> X (Twitter)
            </a>
            <a
              href="https://github.com/CodePapa360"
              className="flex items-center hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub className="mr-2" /> GitHub
            </a>
          </div>
        </section>

        <section className="mt-8 grid grid-cols-1 grid-rows-2 gap-2 sm:grid-cols-2">
          <a
            href="https://github.com/CodePapa360/Convayto"
            className="flex items-center justify-center rounded-lg bg-gray-800 px-6 py-3 text-white hover:bg-gray-700"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>Source Code</span>
            <FaGithub className="ml-2" />
          </a>

          <a
            href="https://convayto.vercel.app"
            className="flex items-center justify-center rounded-lg bg-textAccent px-6 py-3 text-white hover:bg-textAccentDim dark:bg-textAccentDim dark:hover:bg-textAccentDim-dark"
            rel="noopener noreferrer"
          >
            <span>Convayto</span>
            <MdOpenInNew className="ml-2" />
          </a>
        </section>
      </div>
    </MainContainer>
  );
};

export default AboutPage;
