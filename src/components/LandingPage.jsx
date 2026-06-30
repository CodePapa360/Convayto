import { Link, useNavigate } from "react-router-dom";
import { FaArrowRight, FaShieldAlt, FaMobile } from "react-icons/fa";
import { IoSparkles } from "react-icons/io5";
import { MdChat, MdSecurity, MdSpeed } from "react-icons/md";
import MainContainer from "./MainContainer";
import { motion } from "framer-motion";
import {
  Atom,
  Database,
  Wind,
  Search,
  Route,
  ClipboardList,
  Zap,
  Radio,
  Users,
  Shield,
  Heart,
  Activity,
  Lock,
  KeyRound,
  Eye,
  CheckCircle2,
} from "lucide-react";
import {
  FaGithub,
  FaComments,
  FaMobileAlt,
} from "react-icons/fa";


const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const item = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 1, 0.5, 1],
    },
  },
};
const features = [
  {
    icon: "💻",
    title: "Open Source",
    description: "100% open source and transparent."
  },
  {
    icon: "⚡",
    title: "Modern Tech",
    description: "Built using the latest technologies."
  },
  {
    icon: "🛡️",
    title: "Privacy First",
    description: "Your data is always protected."
  },
  {
    icon: "📈",
    title: "Continuous Updates",
    description: "Regular improvements and fixes."
  },
  {
    icon: "👥",
    title: "Community Support",
    description: "Supported by developers worldwide."
  },
  {
    icon: "🎁",
    title: "Free & Easy",
    description: "Free to deploy and customize."
  }
];
const techStack = [
  {
    title: "React",
    desc: "UI Library",
    icon: Atom,
    color: "text-cyan-400",
  },
  {
    title: "Supabase",
    desc: "Backend & Database",
    icon: Database,
    color: "text-green-400",
  },
  {
    title: "Tailwind CSS",
    desc: "Styling",
    icon: Wind,
    color: "text-sky-400",
  },
  {
    title: "React Query",
    desc: "Data Fetching",
    icon: Search,
    color: "text-pink-500",
  },
  {
    title: "React Router",
    desc: "Routing",
    icon: Route,
    color: "text-red-400",
  },
  {
    title: "React Hook Form",
    desc: "Form Management",
    icon: ClipboardList,
    color: "text-fuchsia-400",
  },
  {
    title: "Vite",
    desc: "Build Tool",
    icon: Zap,
    color: "text-yellow-400",
  },
  {
    title: "Supabase Realtime",
    desc: "Real-Time Updates",
    icon: Radio,
    color: "text-green-500",
  },
];

const stats = [
  {
    title: "15K+",
    subtitle: "Active Users",
    icon: Users,
    color: "text-blue-400",
  },
  {
    title: "99.9%",
    subtitle: "Uptime",
    icon: Activity,
    color: "text-green-400",
  },
  {
    title: "100%",
    subtitle: "Open Source",
    icon: Shield,
    color: "text-purple-400",
  },
  {
    title: "4.9 / 5",
    subtitle: "User Satisfaction",
    icon: Heart,
    color: "text-pink-400",
  },
];


const messages = [
  {
    name: "Rahul",
    text: "Hey everyone! 👋"
  },
  {
    name: "Sarah",
    text: "Hi Rahul! How's it going?"
  },
  {
    name: "John",
    text: "Looks awesome! 🚀"
  }
];
const LandingPage = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <MdChat className="h-8 w-8" />,
      title: "Real-Time Chat",
      description:
        "Send and receive messages instantly with Supabase Realtime for live message updates.",
    },
    {
      icon: <MdSecurity className="h-8 w-8" />,
      title: "Secure Authentication",
      description:
        "Built-in user authentication with secure password handling and session management via Supabase.",
    },
    {
      icon: <MdSpeed className="h-8 w-8" />,
      title: "Lightning Fast",
      description:
        "Optimized performance with React Query, infinite pagination, and intelligent data prefetching.",
    },
    {
      icon: <FaMobile className="h-8 w-8" />,
      title: "Fully Responsive",
      description:
        "Seamlessly works on desktop, tablet, and mobile devices with adaptive UI design.",
    },
    {
      icon: <FaShieldAlt className="h-8 w-8" />,
      title: "Profile Management",
      description:
        "Customize your profile with profile pictures and personal information with full control.",
    },
    {
      icon: <IoSparkles className="h-8 w-8" />,
      title: "Dark Mode Support",
      description:
        "Toggle between light and dark themes for a comfortable experience at any time of day.",
    },
  ];

  // const stats = [
  //   { number: "100%", label: "Open Source" },
  //   { number: "Real-Time", label: "Messaging" },
  //   { number: "Secure", label: "Authentication" },
  //   { number: "Responsive", label: "Design" },
  // ];
  const stats = [
    {
      icon: FaGithub,
      number: "100%",
      label: "Open Source",
    },
    {
      icon: FaComments,
      number: "Real-Time",
      label: "Messaging",
    },
    {
      icon: FaShieldAlt,
      number: "Secure",
      label: "Authentication",
    },
    {
      icon: FaMobileAlt,
      number: "Responsive",
      label: "Design",
    },
  ];

  return (
    <MainContainer>
      {/* Hero Section */}
      <section className="w-full px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl text-center">
          {/* Logo */}
          <div className="main_landing_page">
            <motion.div
              className="mb-8 flex justify-center"
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                ease: "easeOut",
              }}
            >
              <img
                src="/images/convayto-logo.png"
                alt="Convayto Logo"
                className="h-24 w-auto sm:h-32"
              />
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              className="mb-6 text-4xl font-bold sm:text-5xl lg:text-6xl"
              initial={{ opacity: 0, y: 70 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.2,
                duration: 0.9,
                ease: "easeOut",
              }}
            >
              Connect Instantly,
              <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                {" "}
                Chat Seamlessly
              </span>
            </motion.h1>
          </div>

          {/* Subheading */}
          <p className="text-textSecondary dark:text-textSecondary-dark mb-8 text-lg sm:text-xl">
            Experience real-time messaging with security and performance at its
            core. Built with React and Supabase for a modern chat experience.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <button
              onClick={() => navigate("/signup")}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 px-8 py-4 font-semibold text-white transition duration-300 hover:shadow-lg hover:shadow-blue-500/50 hero-get-started-btn"
            >
              Get Started
              <FaArrowRight className="h-4 w-4 hero-btn-arrow" />

            </button>
            <button
              onClick={() => navigate("/signin")}
              className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-current px-8 py-4 font-semibold transition duration-300 hover:bg-opacity-10 hover:backdrop-blur hero-get-started-btn2"
            >
              Sign In
              <FaArrowRight className="h-4 w-4 hero-btn-arrow" />
            </button>
          </div>

          {/* Hero Image */}
          <div className="mt-12 sm:mt-16">
            <img
              src="/images/convayto-mockup.jpg"
              alt="Convayto Mockup"
              className="mx-auto w-full max-w-sm rounded-lg shadow-lg sm:max-w-md sm:shadow-xl md:max-w-2xl md:rounded-xl md:shadow-2xl"
            />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="w-full bg-bgSecondary/50 px-4 py-16 dark:bg-bgSecondary-dark/50 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="group text-center transition-all duration-300 hover:-translate-y-2"
              >
                <div className="mb-4 flex justify-center">
                  <stat.icon className="text-4xl text-blue-500 transition-all duration-300 group-hover:scale-125 group-hover:rotate-6" />
                </div>

                <div className="text-3xl font-bold text-blue-500 sm:text-4xl">
                  {stat.number}
                </div>

                <p className="text-textSecondary dark:text-textSecondary-dark mt-2 text-sm sm:text-base">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold sm:text-4xl">
              Powerful Features Built for You
            </h2>
            <p className="text-textSecondary dark:text-textSecondary-dark text-lg">
              Everything you need for seamless real-time communication
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group rounded-2xl border border-bgSecondary bg-white/50 p-6 backdrop-blur transition-all duration-500 hover:-translate-y-3 hover:scale-[1.03] hover:border-blue-500/40 hover:shadow-2xl hover:shadow-blue-500/20 dark:border-bgSecondary-dark dark:bg-black/20"
              >
                <div className="mb-4 inline-flex rounded-lg bg-blue-100 p-3 text-blue-600 transition-all duration-300 group-hover:scale-100 group-hover:rotate-4 dark:bg-blue-900/30 dark:text-blue-400">
                  {feature.icon}
                </div>

                <h3 className="mb-3 text-xl font-semibold transition-colors duration-300 group-hover:text-blue-500">
                  {feature.title}
                </h3>

                <p className="text-textSecondary dark:text-textSecondary-dark">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="w-full bg-gradient-to-r from-blue-50 to-purple-50 px-4 py-20 dark:from-blue-950/20 dark:to-purple-950/20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-12 sm:grid-cols-2 lg:gap-16">
            <div>
              <h2 className="mb-6 text-3xl font-bold sm:text-4xl">
                Why Choose Convayto?
              </h2>
              <ul className="space-y-4">
                {[
                  "Open source and transparent",
                  "Built with modern technologies",
                  "Focused on user privacy",
                  "Continuous improvements",
                  "Active community support",
                  "Free to use and deploy",
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="mt-1 inline-block h-2 w-2 rounded-full bg-blue-500"></span>
                    <span className="text-lg">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex items-center justify-center">
              <div className="text-center">
                <div className="mb-6 inline-flex h-40 w-40 items-center justify-center rounded-full bg-gradient-to-br from-blue-400 to-purple-500">
                  <div className="text-6xl text-white">💬</div>
                </div>
                <p className="text-lg font-semibold">
                  Join thousands of users chatting on Convayto
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Stack Section */}
      <section className="w-full px-4 py-20 sm:px-6 lg:px-8 hidden">
        <div className="mx-auto max-w-5xl">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold sm:text-4xl">
              Built With Modern Technology
            </h2>
            <p className="text-textSecondary dark:text-textSecondary-dark text-lg">
              Using industry-leading tools and frameworks
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { name: "React", description: "UI Library" },
              { name: "Supabase", description: "Backend & Database" },
              { name: "Tailwind CSS", description: "Styling" },
              { name: "React Query", description: "Data Fetching" },
              { name: "React Router", description: "Routing" },
              { name: "React Hook Form", description: "Form Management" },
              { name: "Vite", description: "Build Tool" },
              { name: "Supabase Realtime", description: "Real-Time Updates" },
            ].map((tech, index) => (
              <div
                key={index}
                className="rounded-lg border border-bgSecondary bg-white/50 p-4 text-center backdrop-blur dark:border-bgSecondary-dark dark:bg-black/20"
              >
                <h3 className="font-semibold">{tech.name}</h3>
                <p className="text-textSecondary dark:text-textSecondary-dark text-sm">
                  {tech.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* My New Code */}
      <section className="relative overflow-hidden py-24">

        {/* Glow */}
        <div className="absolute -left-40 top-20 h-80 w-80 rounded-full bg-blue-600/10 blur-[150px]" />
        <div className="absolute -right-40 bottom-0 h-80 w-80 rounded-full bg-purple-600/10 blur-[150px]" />

        <div className="relative mx-auto max-w-7xl px-5">

          {/* Badge */}

          <div className="flex justify-center">
            <div className="rounded-full border border-indigo-500/20 bg-indigo-500/10 px-5 py-2 text-sm text-indigo-300">
              ⚡ Our Tech Stack
            </div>
          </div>

          {/* Heading */}

          <h2 className="mt-6 text-center text-4xl font-bold text-white md:text-5xl">
            Built With
            <br />

            <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              Modern Technologies
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-center text-gray-400">
            We use industry-leading tools and frameworks to deliver
            high-performance, scalable and beautiful applications.
          </p>

          {/* Cards */}

          <div className="mt-16 grid grid-cols-2 gap-4 md:grid-cols-2 lg:grid-cols-4">

            {techStack.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="group rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:border-cyan-400/50 hover:bg-white/10"
                >
                  <Icon className={`h-10 w-10 ${item.color}`} />

                  <h3 className="mt-6 text-lg font-semibold text-white">
                    {item.title}
                  </h3>

                  <p className="mt-1 text-sm text-gray-400">
                    {item.desc}
                  </p>


                </div>
              );
            })}
          </div>

        </div>
      </section>


      {/* Security Section */}
      {/* <section className="w-full bg-red-50/50 px-4 py-20 dark:bg-red-950/10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="rounded-lg border border-red-200 bg-white/50 p-8 dark:border-red-900/50 dark:bg-black/20">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30">
                <FaShieldAlt className="h-6 w-6 text-red-600 dark:text-red-400" />
              </div>
              <h2 className="text-2xl font-bold">Privacy & Security</h2>
            </div>
            <p className="text-textSecondary dark:text-textSecondary-dark mb-4 text-lg">
              Built on Supabase infrastructure with secure authentication and
              protected access control. Your data is handled by industry-trusted
              services.
            </p>
            <ul className="text-textSecondary dark:text-textSecondary-dark space-y-2">
              <li>✓ Secure authentication via Supabase Auth</li>
              <li>✓ Password hashing and encryption</li>
              <li>✓ Protected routes and access control</li>
              <li>✓ Open source for transparency</li>
            </ul>
          </div>
        </div>
      </section> */}
      <section className="relative overflow-hidden py-24">

        {/* Background Glow */}
        <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-red-500/10 blur-[140px]" />
        <div className="absolute right-0 bottom-0 h-72 w-72 rounded-full bg-purple-500/10 blur-[140px]" />

        <div className="relative mx-auto max-w-7xl px-5">

          <div className="grid items-center gap-16 lg:grid-cols-2">

            {/* Left Side */}

            <div>

              <div className="inline-flex items-center rounded-full border border-red-500/20 bg-blue-500/10 px-4 py-2 text-sm text-blue-300">
                🔒 Privacy & Security
              </div>

              <h2 className="mt-6 text-4xl font-bold text-white md:text-5xl">
                Your Data
                <br />
                <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Always Protected
                </span>
              </h2>

              <p className="mt-6 text-lg leading-8 text-gray-400">
                Convayto is built on secure infrastructure with authentication,
                encrypted communication, and protected access control to keep
                your conversations safe.
              </p>

              <div className="mt-10 grid grid-cols-2 gap-5">

                {[
                  {
                    icon: Lock,
                    title: "Encrypted",
                    text: "Messages protected with modern encryption."
                  },
                  {
                    icon: KeyRound,
                    title: "Secure Login",
                    text: "Authentication powered by Supabase."
                  },
                  {
                    icon: Eye,
                    title: "Privacy First",
                    text: "Only authorized users can access data."
                  },
                  {
                    icon: Shield,
                    title: "Open Source",
                    text: "Transparent and community reviewed."
                  },
                ].map((item, index) => {
                  const Icon = item.icon;

                  return (
                    <div
                      key={index}
                      className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-red-400/40 hover:bg-white/10"
                    >
                      <Icon className="h-9 w-9 text-blue-400" />

                      <h3 className="mt-5 text-lg font-semibold text-white">
                        {item.title}
                      </h3>

                      <p className="mt-2 text-sm text-gray-400">
                        {item.text}
                      </p>

                    </div>
                  );
                })}

              </div>

            </div>

            {/* Right Side */}

            <div className="relative flex justify-center">

              <div className="absolute h-80 w-80 rounded-full bg-red-500/10 blur-[120px]" />

              <div className="relative w-full max-w-md rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">

                <div className="flex justify-center">

                  <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg shadow-red-500/20">
                    <Shield className="h-12 w-12 text-white" />
                  </div>

                </div>

                <h3 className="mt-8 text-center text-2xl font-bold text-white">
                  Enterprise Security
                </h3>

                <p className="mt-3 text-center text-gray-400">
                  Designed with security best practices and trusted cloud
                  infrastructure.
                </p>

                <div className="mt-8 space-y-4">

                  {[
                    "Supabase Authentication",
                    "Encrypted Passwords",
                    "Role-Based Access",
                    "HTTPS Secure Communication",
                    "Open Source Transparency",
                  ].map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-3 rounded-xl bg-white/5 p-3"
                    >
                      <CheckCircle2 className="h-5 w-5 text-green-400" />

                      <span className="text-gray-300">
                        {item}
                      </span>

                    </div>
                  ))}

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* CTA Section */}
      <section className="w-full px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-6 text-3xl font-bold sm:text-4xl">
            Ready to Start Chatting?
          </h2>
          <p className="text-textSecondary dark:text-textSecondary-dark mb-8 text-lg">
            Create your account now and connect with others in real-time. It
            only takes a minute.
          </p>
          <button
            onClick={() => navigate("/signup")}
            className="group inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 px-12 py-4 text-lg font-semibold text-white transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/50"
          >
            Get Started Now
            <FaArrowRight className="h-5 w-5 transition-all duration-300 group-hover:translate-x-2 group-hover:scale-125" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <section className="w-full border-t border-bgSecondary bg-white/30 px-4 py-12 dark:border-bgSecondary-dark dark:bg-black/30 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-3">
            <div>
              <h3 className="mb-4 font-semibold">About</h3>
              <ul className="text-textSecondary dark:text-textSecondary-dark space-y-2 text-sm">
                <li>
                  <a
                    href="/about"
                    className="hover:text-textPrimary dark:hover:text-textPrimary-dark"
                  >
                    About Convayto
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/CodeWithAlamin/Convayto"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-textPrimary dark:hover:text-textPrimary-dark"
                  >
                    GitHub
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 font-semibold">Legal</h3>
              <ul className="text-textSecondary dark:text-textSecondary-dark space-y-2 text-sm">
                <li>
                  <Link
                    to="/privacy"
                    className="hover:text-textPrimary dark:hover:text-textPrimary-dark"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    to="/terms"
                    className="hover:text-textPrimary dark:hover:text-textPrimary-dark"
                  >
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 font-semibold">Connect</h3>
              <ul className="text-textSecondary dark:text-textSecondary-dark space-y-2 text-sm">
                <li>
                  <a
                    href="https://x.com/CodeWithAlamin"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-textPrimary dark:hover:text-textPrimary-dark"
                  >
                    Twitter
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.linkedin.com/in/CodeWithAlamin"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-textPrimary dark:hover:text-textPrimary-dark"
                  >
                    LinkedIn
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="text-textSecondary dark:text-textSecondary-dark mt-8 border-t border-bgSecondary pt-8 text-center text-sm dark:border-bgSecondary-dark">
            <p>
              © {new Date().getFullYear()} Convayto. All rights reserved.
              Licensed under Apache 2.0
            </p>
          </div>
        </div>
      </section>
    </MainContainer>
  );
};

export default LandingPage;
