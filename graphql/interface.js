const { gql } = require('apollo-server');
//정의된 interface를 implements(구현)한 모든 타입은 interface에 정의된 속성을 반드시 포함하여야한다.
//typescript의 interface의 extends와는 다름
const interface = gql`
    interface Tool {
        id: ID!
        used_by: Role!
    }
`;
const interfaceResolvers = {
    Tool: {
        __resolveType(tool, context, info) {
            if (tool.developed_by) {
                return 'Software';
            }
            if (tool.new_or_used) {
                return 'Equipment';
            }
            return null;
        }
    }
};
module.exports = {
    interface,
    interfaceResolvers
};