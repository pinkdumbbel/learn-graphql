const { ApolloServer } = require('apollo-server');
const { teams, teamsResolver } = require('./graphql/teams');
const { equipments, equipmentsResolver } = require('./graphql/equipments');
const { supplies, suppliesResolver } = require('./graphql/supplies');

const typeDefs = [
  teams,
  equipments,
  supplies
];

const resolvers = [
  teamsResolver,
  equipmentsResolver,
  suppliesResolver
];

const server = new ApolloServer({ typeDefs, resolvers });
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});