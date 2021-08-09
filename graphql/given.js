const { gql } = require('apollo-server');
const dbWorks = require('../dbWorks');

//다른타입의 값을 합쳐서 주고받기위한 타입
//__resolveType: 합쳐진 타입의 데이터들이 어떤타입인지 구별해주는 함수, 함수이름은 변경하면안됨
const given = gql`
    union Given = Equipment | Supply
`;

const givenResolvers = {
    Query: {
        givens: (parent, args) => {
            return [
                ...dbWorks.getEquipments(args),
                ...dbWorks.getSupplies(args)
            ];
        }
    },
    Given: {
        __resolveType(given) {
            if (given.used_by) return 'Equipment';
            if (given.team) return 'Supply';
            return null;
        }
    }

};

module.exports = {
    given,
    givenResolvers
};