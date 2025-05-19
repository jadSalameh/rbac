# Role-Based Access Control (RBAC) System

A robust Role-Based Access Control system built with NestJS and PostgreSQL

## Description

This RBAC system provides a secure and scalable way to manage user permissions within organizations. It implements a hierarchical role system with three main roles (OWNER, ADMIN, VIEWER) and granular permissions for resource access.

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository

```bash
git clone https://github.com/jadSalameh/rbac.git
cd rbac-challenge
```

2. Install dependencies

```bash
npm install
```

3. Create a PostgreSQL database and update the environment variables accordingly

```bash
# Create a .env file in the root directory with the following content:
DB_TYPE=postgres
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=healthcare
DB_PASSWORD=test123
DB_DATABASE=healthcare
NODE_ENV=development
DB_LOGGING=false
DB_SSL=false
DB_MIGRATIONS_RUN=false
JWT_SECRET=your-secret-key
JWT_EXPIRE=1d
```

4. Start the application

```bash
# Development mode
npm run start:dev
```

5. Run the seed to get initial permission data

```bash
npm run seed
```

## API Documentation

I implemented swagger for the API documentation. Once the application is running, you can access the API documentation at:

```
http://localhost:3000/api
```

### Main Endpoints

#### Users

- `POST /users` - Create a new user
- `GET /users` - Get all users (requires authentication)
- `PATCH /users/:id` - Update user role (requires OWNER role)

#### Organizations

- `POST /organizations` - Create a new organization

#### Resources

- `POST /resources` - Create a new resource
- `GET /resources` - Get all resources
- `GET /resources/:id` - Get resource details

## Data Model

### User

- `id`: UUID (Primary Key)
- `firstName`: string
- `lastName`: string
- `email`: string (unique)
- `password`: string (hashed)
- `role`: enum (OWNER, ADMIN, VIEWER)
- `organization`: Organization (Many-to-One relationship)

### Organization

- `id`: UUID (Primary Key)
- `name`: string
- `description`: string
- `address`: string
- `phone`: string
- `parent`: Organization (Many-to-One relationship)
- `children`: Organization[] (One-to-Many relationship)
- `users`: User[] (One-to-Many relationship)

### Permission

- `id`: UUID (Primary Key)
- `name`: string
- `roles`: Role[] (array of roles)
- `description`: string

### Resource

- `id`: UUID (Primary Key)
- `data`: string
- `organization`: Organization (Many-to-One relationship)
- `user`: User (Many-to-One relationship)

## Access Control Implementation

The system implements role-based access control through several key components:

1. **Role Hierarchy**

   - OWNER: Full access to all resources
   - ADMIN: Can manage users and resources
   - VIEWER: Read-only access to resources

2. **Permission System**

   - Permissions map to read, write, and delete actions
   - Each permission is associated with specific roles
   - Permissions are checked through the RolesGuard

3. **Organization-based Access**

   - Users can only access resources within their organization
   - Organization hierarchy is supported through parent-child relationships

4. **JWT Authentication**
   - Secure token-based authentication
   - Role information embedded in JWT payload

## Future Considerations

1. **Organizations**

   - Add cross-organization resource sharing
   - Support multi level organization hierarchies

2. **Dynamic Role and permission Management**

   - custom permission for each organization so an Admin in one org may have more or less permissions from another org
   - Custom role creation
   - Temporary role assignments

3. **Production Security**

   - Implement rate limiting
   - Add request validation
   - Enable CORS configuration
   - Implement audit logging

4. **Authentication Improvements**
   - Add 2FA support
   - Add session management
   - Implement password policies

## License

This project is licensed under the MIT License - see the LICENSE file for details.
