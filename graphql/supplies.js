const { gql } = require('apollo-server');
const database = require('../database');

const supplies = gql`
    type Supply {
        id: ID!
        team: Int
    }
`;

const suppliesResolver = {
    Query: {
        supplies: () => database.supplies,
    }
};

module.exports = {
    supplies,
    suppliesResolver
};