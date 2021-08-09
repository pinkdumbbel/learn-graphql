const { gql } = require('apollo-server');

//Role이라는 enum타입을 선언할경우 enum타입으로 선언된 값들에 대해서만 주고받을수있음
const enums = gql`
    enum Role {
        developer
        designer
        planner
    }

    enum NewOrUsed {
        new 
        used
    }

    enum Sex {
        male
        female
    }

    enum BloodType{
        A
        B
        AB
        O
    }
`;

module.exports = enums;