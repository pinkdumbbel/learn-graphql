const { gql } = require('apollo-server');
const database = require('../database');

const supplies = gql`
    type Query {
        supplies: [Supply]
    }

    type Supply {
        id: String
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