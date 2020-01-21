var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');

const schema = require('../graphql/schema');

module.exports = graphqlHTTP({
    schema,
    graphiql: true
});
