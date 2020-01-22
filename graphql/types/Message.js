const graphql = require('graphql');
const { connectionDefinitions } = require('graphql-relay');

const Message = new graphql.GraphQLObjectType({
    name: 'Message',
    fields: () => ({
        id: { type: graphql.GraphQLInt },
        title: { type: graphql.GraphQLString },
        content: { type: graphql.GraphQLString },
        is_delete: {
            type: graphql.GraphQLString
        },
        owner: {
            type: graphql.GraphQLString
        },
        created_at: {
            type: graphql.GraphQLString
        },
        updated_at: {
            type: graphql.GraphQLString
        },
        expire_at: {
            type: graphql.GraphQLString
        }
    })
});

Message._typeConfig = {
    sqlTable: 'message',
    uniqueKey: 'id',
};

const { connectionType: MessageConnection } = connectionDefinitions({nodeType: Message});

module.exports = {
    Message,
    MessageConnection
};
