const { gql } = require('apollo-server');
const database = require('../database');
const dbWorks = require('../dbWorks');

const equipments = gql`
    type Mutation {
        createEquipment(
        id: ID!
        used_by: Role!
        count: Int
        new_or_used: NewOrUsed): Equipment

        updateEquipment(
        id: ID!
        used_by: Role!
        count: Int
        new_or_used: NewOrUsed): Equipment

        deleteEquipment(id: String): Equipment
    }

    type Equipment implements Tool{
        id: ID!
        used_by: Role!
        count: Int
        new_or_used: NewOrUsed!
    }

    type EquipmentAdvs implements Tool{
        id: ID!
        used_by: Role!
        count: Int!
        use_rate: Float
        is_new: Boolean!
    }
`;

const equipmentsResolver = {
    Query: {
        equipments: () => database.equipments,
        equipmentAdvs: (parnet, args) => dbWorks.getEquipments(args)
            .map((e) => {
                if (e.used_by === 'developer') {
                    e.use_rate = Math.random().toFixed(2);
                }
                e.is_new = e.new_or_used === 'new';
                return e;
            })

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