const graphql = require('graphql');
const axios = require('axios');
const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
} = graphql;

const CompanyType = new GraphQLObjectType({
  name: 'Company',
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    users: {
      type: new GraphQLList(UserType), // access-before-define circular-ref
      resolve: (parentValue, args) => {
        return axios
          .get(`http://localhost:3004/companies/${parentValue.id}/users`)
          .then((res) => res.data);
      },
    },
  }),
});

const UserType = new GraphQLObjectType({
  name: 'User', // property name
  fields: () => ({
    id: { type: GraphQLString },
    firstName: { type: GraphQLString },
    age: { type: GraphQLInt },
    company: {
      type: CompanyType,
      resolve: (parentValue, args) => {
        return axios
          .get(`http://localhost:3004/companies/${parentValue.companyId}`)
          .then((res) => res.data);
      },
    },
  }),
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

        // Wrap all the data as the UserType
        return axios
          .get(`http://localhost:3004/users/${args.id}`)
          .then((response) => response.data);
        // .then((data) => data);
      },
    },
    company: {
      type: CompanyType,
      args: {
        id: { type: GraphQLString },
      },
      resolve: (parentValue, args) => {
        return axios
          .get(`http://localhost:3004/companies/${args.id}`)
          .then((resp) => resp.data);
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
