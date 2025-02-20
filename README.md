# Whispr - Real-time Chat Application

Whispr is a modern, real-time chat application built with React, TypeScript, Convex, and Tailwind CSS. It provides a seamless and intuitive messaging experience, allowing users to connect with friends, family, and colleagues effortlessly.

## Features

*   **Real-time Messaging:** Experience instant message delivery with Convex's reactive data platform.
*   **User Authentication:** Secure authentication process using Convex auth.
*   **Friend System:** Add, accept, and manage friends within the application.
*   **Group Chats:** Create and participate in group conversations.
*   **Responsive Design:** Enjoy a consistent user experience across various devices with Tailwind CSS.
*   **Image Uploads:** Ability to upload and share images in chats.
*   **Online Status:** See when your friends are online.
*   **Personalized Avatars:** Customize your profile with a unique avatar.
*   **Intuitive UI:** Easy-to-use interface for a smooth chatting experience.

## Installation

Follow these steps to set up Whispr on your local machine:

1.  **Clone the repository:**

    ```bash
    git clone <repository-url>
    cd whispr
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Environment Variables:**

    Create a `.env.local` file in the root directory and add the necessary environment variables.  You'll need to get your Convex URL.
    ```
    VITE_CONVEX_URL=<your_convex_url>
    ```

4.  **Convex Setup:**

    *   Install Convex CLI:
        ```bash
        npm install -g convex
        ```
    *   Initialize Convex:
        ```bash
        convex init
        ```
    *   Deploy Convex schema:
        ```bash
        convex dev
        ```
        (This command also starts the development server.)

## Usage

1.  **Start the development server:**

    ```bash
    npm run dev
    ```

    This command starts the Vite development server, and you can access the application in your browser at `http://localhost:5173` (or whichever port is specified).

2.  **Sign In/Sign Up:**

    *   Navigate to the application in your browser.
    *   Use the provided authentication to sign in or create a new account.

3.  **Start Chatting:**

    *   Browse your friends list or search for new friends.
    *   Start individual or group chats.
    *   Send and receive real-time messages.

## Database Setup

Whispr uses Convex as its database. The schema is defined in `convex/schema.ts`. The data model includes tables for users, chats, messages, and friendships.

Key Convex files:

*   `convex/schema.ts`: Defines the database schema.
*   `convex/users.ts`: Contains Convex functions for user-related operations.
*   `convex/chats.ts`: Contains Convex functions for chat-related operations.
*   `convex/messages.ts`: Contains Convex functions for message-related operations.
*   `convex/friends.ts`: Contains Convex functions for friend-related operations.
*   `convex/auth.config.ts`: Configures authentication.
*   `convex/upload.ts`: Contains Convex functions for handling file uploads.

When developing locally, Convex provides a dashboard to inspect the database state and run queries.

## Contributing

Contributions are welcome! Here's how you can contribute:

1.  **Fork the repository.**
2.  **Create a new branch** for your feature or bug fix.
3.  **Make your changes** and ensure they are well-tested.
4.  **Submit a pull request** with a clear description of your changes.

## License

This project is open-source and available under the [MIT License](LICENSE).

## Badges

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Contact

If you have any questions or suggestions, feel free to reach out!
