# Taskflow

Taskflow is a powerful task management application built with NextJS, providing a seamless and intuitive user experience for organizing and collaborating on tasks within organizations or workspaces.

## Key Features

- **Authentication**: Secure user authentication system to ensure data privacy and access control.
- **Organizations/Workspaces**: Create and manage multiple organizations or workspaces to separate and organize tasks based on different projects or teams.
- **Board Creation**: Easily create boards to categorize and visualize tasks in a structured manner.
- **Unsplash API Integration**: Enhance the visual appeal of your boards with random beautiful cover images fetched from the Unsplash API.
- **Activity Log**: Keep track of all activities within an organization, including board creation, list updates, and card modifications.
- **Board Management**: Rename or delete boards as needed to maintain a clean and organized workspace.
- **List Management**: Create, rename, delete, reorder, and copy lists within boards to adapt to changing project requirements.
- **Card Management**: Add, edit, delete, reorder, and copy cards within lists to manage individual tasks effectively.
- **Card Activity Log**: View a detailed activity log for each card, tracking all the changes and updates made to the card.
- **Board Limit**: Set a limit on the number of boards allowed for each organization to maintain control over resource usage.
- **Stripe Subscription**: Integrate Stripe subscription functionality to allow organizations to unlock unlimited boards by subscribing to a premium plan.
- **Landing Page**: Provide an attractive and informative landing page to showcase the features and benefits of Taskflow.
- **MySQL Database**: Utilize MySQL as the database system to store and retrieve data efficiently.
- **Prisma ORM**: Employ Prisma as the Object-Relational Mapping (ORM) tool to simplify database interactions and ensure data integrity.
- **shadcnUI & TailwindCSS**: Leverage the shadcnUI component library and TailwindCSS utility classes to create a modern and visually appealing user interface.

## Getting Started

To get started with Taskflow, follow these steps:

1. Clone the repository: `git clone https://github.com/your-username/taskflow.git`
2. Install dependencies: `npm install`
3. Set up the MySQL database and update the database configuration in `prisma/schema.prisma`
4. Run database migrations: `npx prisma migrate dev`
5. Start the development server: `npm run dev`
6. Open your browser and visit `http://localhost:3000` to access Taskflow.

## Configuration

Taskflow requires the following configuration:

- MySQL database connection details in `prisma/schema.prisma`
- Stripe API keys for subscription functionality (environment variables)
- Unsplash API access key (environment variable)

Make sure to set up the necessary environment variables before running the application.

## Contributing

Contributions to Taskflow are welcome! If you encounter any issues or have suggestions for improvements, please open an issue on the GitHub repository. If you'd like to contribute code, please follow these steps:

1. Fork the repository
2. Create a new branch: `git checkout -b feature/your-feature`
3. Make your changes and commit them: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a pull request on the GitHub repository

## License

Taskflow is open-source software licensed under the [MIT License](https://opensource.org/licenses/MIT). Feel free to use, modify, and distribute the code as per the terms of the license.

## Contact

If you have any questions, suggestions, or feedback, please feel free to reach out to the project maintainer at iheb@carefy.tech.

Happy task management with Taskflow!
