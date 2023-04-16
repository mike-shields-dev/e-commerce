# e-commerce app 
###### author: Michael Shields
###### Visit the deployed site [here](https://mike-shields-e-commerce.netlify.app)

## Intro 

This project is the result of completing a project tutorial from the Udemy course: [React 18 Tutorial and Projects](https://www.udemy.com/course/react-tutorial-and-projects-course/) by [John Smilga](https://github.com/john-smilga).

The tutorial covered how to create an e-commerce application using the following technologies: 

- [React](https://react.dev/) for the front-end user interface.
- [Auth0](https://auth0.com/) for user authentication/authorization.
- [Axios](https://axios-http.com/docs/intro) for API requests.
- [Netlify](https://www.netlify.com/) for deployment and serverless functions.
- [Stripe](https://stripe.com/en-gb) for payment support. 

![image](./screenshots/homepage.png)
![image](./screenshots/aboutpage.png)
![image](./screenshots/products.png)
![image](./screenshots/product.png)
![image](./screenshots/cartpage.png)

## What I learned

### State Management

This project was my first practical introduction to using React's [useReducer](https://react.dev/reference/react/useReducer) and [context API](https://react.dev/learn/passing-data-deeply-with-context) together, to organise application state and business logic into related contexts. 

This pattern abstracted application state and business logic away from the UI components, making the application's development easier to navigate and reason about, more modular enabling state, business logic and code in general reusable across all of the UI components where it was needed. 

### Serverless Functions

This project was also my first introduction to the concept of serverless functions and how they enable small pieces of business logic to be hosted by a service provider, taking away the need to setup your own server and deal with all the extra details that come with that.

