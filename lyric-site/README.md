# Lyrical-GraphQL
A GraphQL API for the Lyrical App

# Getting Started

## Integrating GraphQL with React

### Installing Dependencies

```
yarn add apollo-client react-apoll
```

### Creating the Apollo Client

Inside `index.js` under React App, we need to create an instance of Apollo Client and pass it to the Apollo Provider.

```js
// Header
import ApolloClient from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
const client = new ApolloClient({})
// Notice that we are passing an empty object as the second argument to ApolloClient. This is because we are not using any of the advanced features of Apollo Client. We will be using the default values for all of the options.
// The GraphQL Endpoint will be the same as the Express server we created earlier, which is `./graphql`.


// Body
// Use the provider the wrap the entire app
const Root = () => {
  return (
    <ApolloProvider client={client}>
      <SongList />
    </ApolloProvider>
  );
};


```