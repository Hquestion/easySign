const graphql = require('graphql');
const mysql = require('mysql');
const joinMonster = require('join-monster');
const { connectionArgs, pageInfo } = require('graphql-relay');

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

const client = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'Hexl900608',
    database : 'sign'
});

client.connect();

const QueryRoot = new graphql.GraphQLObjectType({
    name: 'Query',
    fields: () => ({
        hello: {
            type: graphql.GraphQLString,
            resolve: () => "Hello world222!"
        },
        messages: {
            type: new graphql.GraphQLList(Message),
            args: connectionArgs,
            sqlPaginate: true,
            resolve: (parent, args, context, resolveInfo) => {
                return joinMonster.default(resolveInfo, {}, sql => {
                    return new Promise((resolve, reject) => {
                        client.query(sql, (error, result, fileds) => {
                            if (error) reject(error);
                            resolve(result);
                        });
                    })
                }, {
                    dialect: 'mysql'
                })
            }
        },
        message: {
            type: Message,
            args: {id: {type: graphql.GraphQLNonNull(graphql.GraphQLInt)}},
            where: (messageTable, args) => `${messageTable}.id = ${args.id}`,
            resolve: (parent, args, context, resolveInfo) => {
                return joinMonster.default(resolveInfo, {}, sql => {
                    console.log(sql);
                    return new Promise((resolve, reject) => {
                        client.query(sql, (error, result, fileds) => {
                            if (error) reject(error);
                            resolve(result);
                        });
                    })
                }, {
                    dialect: 'mysql'
                })
            }
        }
    })
});

// const MutationRoot = new graphql.GraphQLObjectType({
//     name: 'Mutation',
//     fields: () => ({
//         player: {
//             resolve: async (parent, args, context, resolveInfo) => {
//                 return 'success';
//             }
//         }
//     })
// });

module.exports = new graphql.GraphQLSchema({
    query: QueryRoot,
    // mutation: MutationRoot
});
