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

- [Technologies Used](#technologies-used)
- [Features](#features)
- [Project Structure](#project-structure)
- [Database Design](#database-design)
- [Security Considerations](#security-considerations)
- [Challenges and Solutions](#challenges-and-solutions)
- [Future Improvements](#future-improvements)
- [Contributing](#contributing)
- [License](#license)
- [Author](#author)

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

The project is organized for clarity and modularity, following a typical React application structure:

- **Public Assets**
  - `public/`: Contains static assets, including fonts, images, `robots.txt`, and `sitemap.xml`.

- **Source Code**
  - `src/`: Main application source code.
    - `main.jsx`: Main entry point for rendering the application.
    - `App.jsx`: Application entry point.
    - `components/`: Reusable UI components.
    - `contexts/`: Global state management.
    - `features/`: Feature-specific modules (authentication, messaging, sidebar, user profile, user search).
    - `services/`: External service integrations, e.g., Supabase.
    - `styles/`: Custom and global styles.
    - `utils/`: Utility functions and hooks.

This structure ensures maintainability and scalability by logically organizing components, features, and utilities, facilitating independent development and enhancing code reusability.

## Database Design

## Security Considerations

## Challenges and Solutions

Here are some of the challenges faced during the development of Convayto and their corresponding solutions:

- **Real-time Communication**: Implementing real-time chat functionality required handling concurrent updates and ensuring message synchronization across multiple clients. The solution involved using Supabase's real-time subscription feature and managing message state with React Query.

- **User Authentication**: Building a secure authentication system involved handling user registration, login, and password reset processes. The solution was to integrate Supabase's authentication service and utilize its built-in methods for user management.

- **Responsive Design**: Creating a responsive user interface that adapts to different screen sizes and devices was a challenge. The solution was to utilize Tailwind CSS's responsive utility classes and implement media queries to adjust the layout and styling.

- **Error Handling**: Providing meaningful error messages and handling unexpected scenarios was crucial for a smooth user experience. The solution involved implementing toast notifications using a library like react-toastify to display error messages and important updates.

- **Optimized Performance**: Ensuring efficient state management and data fetching was important for a fast and responsive application. The solution was to utilize React Query for data fetching and caching, and React Hook Form for efficient form management.

By addressing these challenges, Convayto was able to deliver a robust and user-friendly chat application.

## Future Improvements

Here are some ideas for future enhancements to Convayto that I plan to implement as I continue learning other technologies:

- **Message Editing and Deletion**: Let users edit and delete their messages to give them more control over their conversations.
- **Message Reactions**: Add the ability to react to messages with emojis, making chats more expressive and fun.
- **File Sharing**: Allow users to share files like images and documents directly in the chat, expanding the ways they can communicate.
- **Notification System**: Introduce notifications for new messages or important updates, so users stay informed even when they're not using the app.
- **Emoji Picker**: Integrate an emoji picker to make it easy for users to add emojis to their messages, adding a fun and personal touch.

I plan to work on these features in the future as I continue learning and working on other technologies.

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

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

## Author

<img src="https://github.com/CodePapa360.png" alt="Photo" width="50" height="auto" style="border-radius: 50%;">

**Alamin** 

- LinkedIn: [CodePapa360](https://www.linkedin.com/in/codepapa360)
- X (formerly Twitter): [CodePapa360](https://twitter.com/CodePapa360)

Feel free to reach out if you have any questions or suggestions regarding the project!
