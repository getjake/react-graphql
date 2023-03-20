const graphql = require('graphql');
const axios = require('axios');
const { GraphQLObjectType, GraphQLSchema, GraphQLString, GraphQLInt } = graphql;

const CompanyType = new GraphQLObjectType({
  name: 'Company',
  fields: {
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
  },
});

const UserType = new GraphQLObjectType({
  name: 'User', // property name
  fields: {
    id: { type: GraphQLString },
    firstName: { type: GraphQLString },
    age: { type: GraphQLInt },
  },
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    user: {
      type: UserType,
      args: {
        id: { type: GraphQLString }, // Get the Id => Return the UserType
      },
      resolve: (parentValue, args) => {
        // since we use `id`, the `args` will be `id`
        // How to lookup the user Id and return the value
        return axios
          .get(`http://localhost:3004/users/${args.id}`)
          .then((response) => response.data)
          .then((data) => data);
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
