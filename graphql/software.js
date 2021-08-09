const { gql } = require('apollo-server');
const dbWorks = require('../dbWorks');

const softwares = gql`
    type Software implements Tool{
    id: ID!
    used_by: Role!
    developed_by: String!
    description: String
}
`;

const softwareResolvers = {
    Query: {
        softwares: (parent, args) => dbWorks.getSoftwares(args),
    }
};

module.exports = {
    softwares,
    softwareResolvers
};
