const { gql } = require('apollo-server');
const database = require('../database');

const equipments = gql`
    type Query {
        equipments: [Equipment] 
    }

    type Mutation {
        createEquipment(
        id: String
        used_by: String
        count: Int
        new_or_used: String): Equipment

        updateEquipment(
        id: String
        used_by: String
        count: Int
        new_or_used: String): Equipment

        deleteEquipment(id: String): Equipment
    }

    type Equipment{
        id: String
        used_by: String
        count: Int
        new_or_used: String
    }
`;

const equipmentsResolver = {
    Query: {
        equipments: () => database.equipments,
    },
    Mutation: {
        deleteEquipment: (parent, args, context, info) => {
            const equipment = database.equipments.filter((e) => e.id === args.id);
            database.equipments = database.equipments.filter((e) => e.id !== args.id);
            return equipment[0];
        },
        createEquipment: (parent, args, context, info) => {
            database.equipments = database.equipments.concat(args);
            return args;
        },
        updateEquipment: (parent, args, context, info) => {
            database.equipments = database.equipments.map((e) => e.id === args.id ? { ...e, ...args } : { ...e });

            return args;
        }
    }
};

module.exports = {
    equipments,
    equipmentsResolver
};