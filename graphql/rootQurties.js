const { gql } = require('apollo-server');

const rootQueries = gql`
    type Query{
        teams: [Team]
        team(id: Int): Team
        supplies: [Supply]
        equipments: [Equipment] 
        equipmentAdvs: [EquipmentAdvs]
        softwares: [Software]
        people: [People]
        peopleFiltered(
        team: Int, 
        sex: Sex, 
        blood_type: BloodType, 
        from: String
        ): [People]
        peoplePaginated(
            page: Int!
            per_page: Int!
        ): [People]
        givens: [Given]
    }
`;

module.exports = rootQueries;