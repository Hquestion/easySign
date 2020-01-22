const graphql = require('graphql');
const { connectionDefinitions } = require('graphql-relay');

const User = new graphql.GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: { type: graphql.GraphQLInt },
        nickname: { type: graphql.GraphQLString },
        realname: { type: graphql.GraphQLString },
        gender: {
            type: graphql.GraphQLString
        },
        phone: {
            type: graphql.GraphQLString
        },
        avatar: {
            type: graphql.GraphQLString
        },
        last_login: {
            type: graphql.GraphQLString
        },
        password: {
            type: graphql.GraphQLString
        },
        created_at: {
            type: graphql.GraphQLString
        }
    })
});

User._typeConfig = {
    sqlTable: 'user',
    uniqueKey: 'id',
};

const { connectionType: UserConnection } = connectionDefinitions({nodeType: User});

module.exports = {
    User,
    UserConnection
};
