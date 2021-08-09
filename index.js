const { ApolloServer } = require('apollo-server');
const { teams, teamsResolver } = require('./graphql/teams');
const { equipments, equipmentsResolver } = require('./graphql/equipments');
const { supplies, suppliesResolver } = require('./graphql/supplies');
const { softwares, softwareResolvers } = require('./graphql/software');
const { given, givenResolvers } = require('./graphql/given');
const { interface, interfaceResolvers } = require('./graphql/interface');
const { people, peopleResolvers } = require('./graphql/people');
const enums = require('./graphql/enum');
const rootQueries = require('./graphql/rootQurties');

const typeDefs = [
  rootQueries,
  teams,
  equipments,
  supplies,
  softwares,
  people,
  enums,
  given,
  interface
];

const resolvers = [
  teamsResolver,
  equipmentsResolver,
  suppliesResolver,
  softwareResolvers,
  peopleResolvers,
  givenResolvers,
  interfaceResolvers
];

const server = new ApolloServer({ typeDefs, resolvers });
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});