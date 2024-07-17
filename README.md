<div align="center">

  <img src="./public/images/convayto-logo.png" alt="Convayto logo" width="230" height="auto">

  <!-- <h1>Convayto</h1> -->

  <h3>
    <a href="https://convayto.vercel.app">
      <strong>🖱️Live Website</strong>
    </a>
  </h3>

  <div align="center">
    <a href="https://github.com/CodePapa360/Convayto/issues">Report Bug</a>
    •
    <a href="https://github.com/CodePapa360/Convayto/pulls">Request Feature</a>
  </div>

  <hr>

</div>

<!-- Badges -->
<div align="center">
<br/>

[![Twitter Follow](https://img.shields.io/twitter/follow/CodePapa360?style=social&logo=x)](https://x.com/CodePapa360)  
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-blue?style=social&logo=linkedin)](https://www.linkedin.com/in/CodePapa360)

![version](https://img.shields.io/github/package-json/v/CodePapa360/Convayto?color=blue)

</div>

<!-- Brief -->
<p align="center">
Welcome to Convayto! This is a real-time chat app that I've developed to sharpen my skills with React.js and Supabase. Featuring user authentication, profile management, and real-time chat, Convayto showcases what modern web development can achieve. Built as a learning exercise, this project includes the basic features you'd expect from a chat app.
</p>

<!-- Screenshot -->
<a align="center" href="https://convayto.vercel.app">

![Screenshot](./public/images/convayto-mockup.jpg)

</a>

## Table of Contents

2. [Technologies Used](#technologies-used)
3. [Features](#features)
4. [Project Structure](#project-structure)
5. [Database Design](#database-design)
6. [Security Considerations](#security-considerations)
7. [Deployment](#deployment)
8. [Challenges and Solutions](#challenges-and-solutions)
9. [Future Improvements](#future-improvements)
10. [Contributing](#contributing)
11. [License](#license)
12. [Author](#author)

## Technologies Used

- **React**: For building the user interface.
- **Supabase**: For backend services and database management.
- **React Router DOM**: For handling routing.
- **React Hook Form**: For form management.
- **TanStack React Query**: For data fetching and state management.
- **Tailwind CSS**: For styling.
- **Vite**: For build tooling and development server.

## Features

- **User Authentication**: Secure signup and signin processes, including password reset and account confirmation.
- **Profile Management**: Users can update their profiles, including setting a profile picture and editing personal information.
- **Real-Time Chat**: Send and receive messages in real-time, ensuring seamless communication.
- **Protected Routes**: Access control for authenticated users, protecting sensitive routes and data.
- **Responsive Design**: A user-friendly interface that adapts to various screen sizes and devices.
- **Dark Mode**: Toggle between dark and light themes based on user preference.
- **Sidebar and Menus**: Easy navigation with a collapsible sidebar, friend list, and account settings.
- **Search Functionality**: Quickly find and connect with other users.
- **Error Handling**: Toast notifications to inform users of errors and important updates.
- **Optimized Performance**: Efficient state management and data fetching with React Query and React Hook Form.

### Project Structure

The project is organized to maintain clarity and modularity, following a typical React application structure:

- **Root Files**

  - `.env`, `.eslintrc.cjs`, `.gitignore`, `index.html`, `package.json`, `package-lock.json`, `postcss.config.js`, `prettier.config.cjs`, `tailwind.config.js`, `vercel.json`, `vite.config.js`: Configuration and environment files for development, linting, styling, and deployment.

- **Public Assets**

  - `public/`: Contains static assets such as fonts (`fonts/`), images (`images/`), and essential files like `robots.txt` and `sitemap.xml`.

- **Source Code**
  - `src/`: Houses the main source code of the application.
    - `App.jsx`: Entry point of the application, wrapping main components.
    - `components/`: Reusable UI components used across the app.
    - `contexts/`: Context providers and hooks for global state management (`UiContext.jsx`).
    - `features/`: Feature-specific modules grouped by functionality.
      - `authentication/`: Handles user authentication (`Signin.jsx`, `Signup.jsx`, etc.).
      - `messageArea/`: Manages real-time messaging (`MessageView.jsx`, `MessageInputBar.jsx`, etc.).
      - `sideBar/`: Implements sidebar navigation and related components (`LeftSideBar.jsx`, `Header.jsx`, etc.).
      - `userProfile/`: Manages user profile settings and views (`MyAccountView.jsx`, `Avatar.jsx`, etc.).
      - `userSearch/`: Facilitates user search functionality (`SearchView.jsx`).
    - `services/`: Integration with external services such as Supabase (`supabase.js`).
    - `styles/`: Custom styles and global CSS (`index.css`).
    - `utils/`: Utility functions and hooks (`common.js`, `useEnterKeyPress.js`).
    - `main.jsx`: Main entry point for rendering the application.

This structure enhances maintainability and scalability by organizing components, features, and utilities into logical directories. It separates concerns, facilitating independent navigation and enhancement of various application parts. Each directory is purpose-built, promoting code reusability and improving overall project readability.

## Database Design

## Security Considerations

## Deployment

## Challenges and Solutions

## Future Improvements

## Contributing

Contributions to Convayto are welcome! Before contributing, please ensure you follow these guidelines:

### .env File

Convayto uses environment variables stored in a `.env` file to manage sensitive information. Ensure you have the following variables set up:

```plaintext
VITE_SUPABASE_URL=https://your-supabase-url.com
VITE_SUPABASE_KEY=your-supabase-key
```

You can find a template for these variables in `.env.example`.

### Getting Started

To contribute to Convayto, follow these steps:

- Fork the repository and clone it locally.
- Install dependencies: `npm install`.
- Set up your `.env` file using `.env.example` as a template.
- Make your changes and test them thoroughly.
- Submit a pull request with a clear description of your changes and their purpose.

## License

### Author

<b>👤 Alamin</b>

- Twitter - [@CodePapa360](https://www.twitter.com/CodePapa360)
- LinkedIn - [@CodePapa360](https://www.linkedin.com/in/codepapa360)

Feel free to contact me with any questions or feedback!
