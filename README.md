MinGlo: Collaborative Learning Platform
MinGlo is a dynamic and intuitive collaborative learning platform designed to empower students to connect, study, and grow together. It facilitates group-based learning, shared resource management, and peer-to-peer motivation, fostering a supportive educational environment.

✨ Key Features
Core Experience
Engaging Splash Page: A visually appealing entry point featuring an engaging background video with a blur overlay, elegant hero content, and a clear call-to-action. Enhanced with smooth animations powered by Framer Motion and a fully responsive design for all devices.

Secure Authentication: Robust login and signup mechanisms with role-based access control (Admin & Regular Users). Utilizes the React Context API for persistent session management, ensuring a seamless user experience.

Personalized User Dashboard: A central hub for users to manage their activities, view progress, and access relevant features.

Collaboration & Management
Real-time Study Rooms: Dedicated chat rooms for live, interactive study sessions.

Efficient File Sharing: Seamlessly upload and distribute notes, documents, and other learning materials within groups.

Group Creation & Management: Tools for users to easily form, organize, and manage study groups.

Collaborative Discussions & Tasks: Features to support shared discussions and the assignment/tracking of collaborative tasks.

Administrative Control
Comprehensive User Management: Administrators have full control over user accounts, including viewing, editing (name, phone, avatar), deleting, and sending emails.

Role-Based Route Protection: Secure access to administrative functionalities and UI elements ensured through protected navigation and adminRoutes.

🚀 Getting Started
Follow these steps to set up and run MinGlo locally:

1. Clone the Repository
git clone https://github.com/Riyabenny05/MainProject_GroupFinder.git
cd MainProject_GroupFinder

2. Install Dependencies
npm install

3. Launch the Development Server
npm run dev

The application will be accessible in your browser at http://localhost:5173.

⚙️ Tech Stack
MinGlo is built with a modern and robust technology stack to ensure performance, scalability, and a rich user experience:

Frontend:

React: A declarative, component-based JavaScript library for building user interfaces.

Vite: A fast and opinionated build tool for modern web projects.

React Router v6: For efficient and declarative client-side routing.

Material UI: A comprehensive suite of React components for faster and easier web development.

Framer Motion: A production-ready motion library for React, enabling fluid animations.

React Context API: For efficient global state management, particularly for authentication.

Backend (Assumed):

Node.js: A JavaScript runtime for server-side development.

Express.js: A fast, unopinionated, minimalist web framework for Node.js.

Database (Assumed):

MongoDB: A NoSQL, document-oriented database for flexible data storage.

📁 Project Structure
The project follows a modular and organized structure for maintainability and scalability:

src/
├── assets/             # Static files (videos, images, fonts)
├── components/         # Reusable UI components (e.g., Navbar, Cards, Modals)
├── context/            # Global state management contexts (e.g., AuthenticationContext)
├── pages/              # Top-level components for different views (e.g., Splash, Login, Dashboard)
├── routes/             # Defines application routes and protected routes
├── controllers/        # Handles business logic and data manipulation (e.g., adminController, userController)
└── App.jsx             # The main application component

🗺️ Roadmap & Future Enhancements
We are continuously working to improve MinGlo. Here are some planned enhancements:

Push Notifications: Implement real-time notifications for reminders, updates, and new messages.

AI-Powered Recommendations: Integrate AI to provide personalized study recommendations and content suggestions.

Enhanced Collaboration Tools: Explore advanced features for collaborative document editing and project management.

🤝 Contributing
We welcome contributions to improve MinGlo! If you'd like to collaborate, please follow these steps:

Fork the repository.

Create a new branch:

git checkout -b feature-name

Make your changes and commit them:

git commit -m "Add feature-name"

Push the branch to your forked repository:

git push origin feature-name

Open a pull request on GitHub, describing your changes.

📞 Contact
For any queries or support, please feel free to reach out to our team:

Ria Benny: +91 8848256221

Dayona Suby: +91 9778541454

Jofia Treesa George: +91 8089957565

Karthik G: +91 6235796770

Made with 💜 by Team MinGlo

⚖️ License
This project is licensed under the MIT License.