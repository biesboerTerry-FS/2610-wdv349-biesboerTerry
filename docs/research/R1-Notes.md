# Project & Portfolio IV

* **Research Notes - Milestone #1**
* **Terry Biesboer**
* **August 10,2026**

## Topic - React Redux Toolkit

This document contains general notes related to implementing global state management in a React application using the official and recommended toolset: Redux Toolkit(RTK)

## React Toolkit vs Core Redux

Redux Toolkit is the officially recommended approach for writing Redux logic. It wraps around the core Redux library and contains packages and functions that are essential for building a Redux app.

* Key finding 1: Redux toolkit is designed to address common complaints about traditional Redux, such as configuring the store being too complicated, needing too many packages to get Redux to to do anything useful, and requiring too much boilerplate code.

* Key finding 2: The configureStore() function wraps the core createStore to provide simplified configuration options and good defaults. It automatically combines slice reducers, adds whatever Redux middleware you supply, includes redux-thunk by default, and enables use of the Redux DevTools Extension.

* Key finding 3: The createSlice() function automatically generates action creators and action types that correspond to the reducers and state you provide.

## Mongoose Object Data Modeling

Researching Mongoose as the ODM library to interface with MongoDB in the MERN stack.

* Key finding 1: A Mongoose schema defines the structure of your collection documents and maps directly to a MongoDB collection. Because MongoDB has a flexible data model without rigid schemas, Mongoose allows you to enforce a semi-rigid schema from the beginning.

* Key finding 2: A Model is a compiled constructor based on a schema. Models are responsible for creating and reading documents from the underlying MongoDB database,acting as the interface for CRUD operations.

* Key finding 3: Mongoose schemas support data validation and casting, measning if you define a field as a String and try to save an object or a number to it, Mongoose will attempt to cast it to a string or throw a validation error before saving it to the database

## Express.js Middleware and Routing

Exploring how Express handles HTTP requests and middleware execution for the backend API.

* Key finding 1: An Express application is essentially a series of middleware function calls. Middleware functions have access to the request object and the response object, and the next middlware function in the applications request-response cycle.

* Key finding 2: Middleware can execute any code, modify the request and response objects, end the request-response cycle, or pass control to the next middleware function using next(). If next() is not called and the response isn't terminated (e.g. using request.send()), the request will be left hanging.

* Key finding 3: Express router-level middleware (express.Router()) works in the same way as application level middleware, but is bound to an instance of express.Router(). This is ideal for modularizing the API into separate route files.

## Reference Links

**Getting Started with Redux Toolkit**  
[Getting Started with Redux Toolkit](https://redux-toolkit.js.org/tutorials/quick-start): This is the official quick start guide. It was the most helpful resource for this milestone as it showed exactly how to set up configureStore and createSlice in a React application without the legacy Redux boilerplate.  

**Understanding Mohngoose Schemas**
[Mongoose Get Started](https://www.mongodb.com/docs/drivers/node/current/integrations/mongoose/mongoose-get-started/): The MongoDB official documentation outlining how to define a Mongoose schema and compile it into a model to perform CRUD operations.

**Express Middleware Concepts**
[Express Using Middleware](https://expressjs.com/en/5x/guide/using-middleware/): The Express documentation explaining the types of middleware (application-level, router-level, error handling) and how they process requests. This is crucial for planning how to implement JWT authenticaion guards in the API.
