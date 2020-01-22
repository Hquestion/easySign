const graphql = require('graphql');
const mysql = require('mysql');
const joinMonster = require('join-monster');
const { connectionArgs, connectionFromArray, forwardConnectionArgs } = require('graphql-relay');

const { Message, MessageConnection } = require('./types/Message');
const { User, UserConnection } = require('./types/User');


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
            type: MessageConnection,
            args: connectionArgs,
            // sqlPaginate: true,
            // orderBy: {
            //     title: 'asc',
            // },
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
                    .then(data => {
                        return connectionFromArray(data, args)
                    }, error => {
                        console.error(error);
                    });
            }
        },
        message: {
            type: Message,
            args: {id: {type: graphql.GraphQLNonNull(graphql.GraphQLInt)}},
            where: (messageTable, args) => `${messageTable}.id = ${args.id}`,
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
        user: {
            type: User,
            args: {id: {type: graphql.GraphQLNonNull(graphql.GraphQLInt)}, openid: {type: graphql.GraphQLString}},
            where: (userTable, args) => `${userTable}.id = ${args.id} or ${userTable.openid} = ${args.openid}`,
            resolver: (parent, args, context, resolveInfo) => {
                return joinMonster.default(resolveInfo, {}, sql => {
                    return new Promise((resolve, reject) => {
                        client.query(sql, (error, result, fileds) => {
                            if (error) reject(error);
                            resolve(result);
                        });
                    })
                }, {
                    dialect: 'mysql'
                });
            }
        },
        users: {
            type: UserConnection,
            args: connectionArgs,
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
                    .then(data => {
                        return connectionFromArray(data, args)
                    }, error => {
                        console.error(error);
                    });
            }
        }
    })
});

const MutationRoot = new graphql.GraphQLObjectType({
    name: 'Mutation',
    fields: () => ({
        user: {
            type: User,
            args: {
                nickname: graphql.GraphQLString,
                realname: graphql.GraphQLString,
                gender: graphql.GraphQLString,
                phone: graphql.GraphQLString,
                avatar: graphql.GraphQLString,
                password: graphql.GraphQLString,
                openid: graphql.GraphQLString
            },
            resolve: async (parent, args, context, resolveInfo) => {
                const { nickname, realname, gender, phone, avatar, password, openid } = args;
                try {
                    return (await client.query("INSERT INTO user (nickname, realname, gender, phone, avatar, password, openid) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *", [nickname, realname, gender, phone, avatar, password, openid])).rows[0]
                } catch (err) {
                    throw new Error("Failed to insert new user")
                }
            }
        }
    })
});

module.exports = new graphql.GraphQLSchema({
    query: QueryRoot,
    mutation: MutationRoot
});
