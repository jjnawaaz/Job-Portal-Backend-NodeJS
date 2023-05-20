# Job Portal Application

This is a Job Portal Application built with Node.js and Express.js.


## Getting Started

To get started with the project, follow the instructions below.

### Prerequisites

- Node.js (version >= 12)
- MongoDB

### Installation

1. Clone the repository:

```bash
git clone https://github.com/your/repository.git
```

2. Install dependencies:

```bash
cd repository
npm install
```

3. Set up environment variables:

Create a `.env` file in the project root directory and provide the necessary environment variables. Refer to the `.env.example` file for the required variables.

4. Start the development server:

```bash
npm run dev
```

The server will start on http://localhost:8080.

## Folder Structure

The project follows a specific folder structure:

- `config`: Contains configuration files.
- `middlewares`: Custom middleware functions.
- `models`: Database models.
- `routes`: API routes.
- `controllers`: Request handlers for each route.
- `helpers`: Utility functions.
- `public`: Static files (e.g., images, stylesheets).
- `tests`: Test cases.

## API Routes

The following API routes are available:

- `GET /api/v1/test`: Test route.
- `POST /api/v1/auth/register`: Register a new user.
- `POST /api/v1/auth/login`: User login.
- `GET /api/v1/user/getUser`: Get user details.
- `POST /api/v1/jobs/create`: Create a new job.
- `GET /api/v1/jobs/:id`: Get job details by ID.
- ...

## Contributing

Contributions are welcome! If you find any issues or want to add new features, please open an issue or submit a pull request.


Make sure to update the necessary sections such as installation instructions, folder structure, API routes, and contribution guidelines according to your specific project requirements.
