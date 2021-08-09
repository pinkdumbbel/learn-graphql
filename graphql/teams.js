const { gql } = require('apollo-server');
const database = require('../database');

const teams = gql`
    type Team {
    id: Int
    manager: String
    office: String
    extension_number: String
    mascot: String
    cleaning_duty: String
    project: String
    supplies:[Supply]
  }
`;

const teamsResolver = {
    Query: {
        teams: () => database.teams
            .map((team) => {
                team.supplies = database.supplies
                    .filter((supply) => {
                        return supply.team === team.id;
                    });
                return team;
            }),
        team: (parent, args, context, info) => database.teams.filter((t) => t.id === args.id)[0],
    },
};

module.exports = {
    teams,
    teamsResolver
};