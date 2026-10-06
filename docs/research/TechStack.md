# Tech Stack

MERN

## Application Design

I will be utilizing Figma to create wireframes and interactive prototypes. To ensure consistency, I plan to integrate Tailwind UI for Figma, as this will speed up the transistion from prototype to development. Including this in my portfolio demonstrates my ability to plan and execute a professional, user-centric design phase prior to implementation.

## Front End Framework

The front end will be built using React, providing a robust, component-driven single-page application. I will implement ESLint with a standard style guide to maintain code quality, readability, and consistency across the project. TailwindCSS will be integrated to ensure consistent styling throughout the site.

## State Management

Local comonponent state will be handled using React's useState hook. For persistent, long-term data storage, I am utilizing a NoSQL database solution. Additionally, local-storage will be utilized on the client side for handling anf persisting JWT authentication tokens. This strategy showcases my ability to architect scalable state management solutions across the client.

## Node

Node.js will serve as the runtime environment for the backend application. I will use npm for managing project dependencies, executing development scripts, and ensuring a reproducable build environment. Node will host the RESTful API that handles data requests from the React front end. Utilizing Node allows for a unified JavaScript environment across the entire stack, demonstrating my capability to build, configure, and manage cohesive, full-stack JavaScript applications from the ground up.

## Express

Express.js will act as the web framework on top of Node.js to power the backend API. I will implement a modular architecture by strictly separating routes and controllers to keep the codebase maintainable and scalable. Express will handle incoming HTTP requests, proess them through custom middleware (such as error handler functions and JWT authentication guards), and send structured JSON responses back to the client. This implementation highlights my backend routing, security, and API development skills.

## SQL/Postgres/Sequelize

While Sequelize and relational databases are powerful tools, my proposed solution utilizes the MERN stack, meaning I will be bypassing SQL in favor of MongoDB. Instead of Sequelize, I will use Mongoose as an Object Data Modeling library to interface with the NoSQL database. Mongoose will provide structured, strongly-typed schemas, robust model validation, and streamlined querying for document-based data. I will build fully validated CRUD operations through these Mongoose models and utilize database seeding for a smooth development process. This choice demonstrates my proficiency with document-oriented data modeling and my ability to implement complete API-to-database integration.
