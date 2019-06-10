var express = require("express");
var graphqlHTTP = require("express-graphql");
var { buildSchema } = require("graphql");

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
    type Query {
        items(tag: Tag): [Item]
    }
    type Item {
        name: String
        tag: Tag
    }
    enum Tag {
        FOOD
        BEVERAGE
        STARSHIP
    }
`);

// The root provides a resolver function for each API endpoint
var root = {
  items: graphArgs => {
    console.log(graphArgs);
    return [
      { name: "TEST1", tag: "FOOD" },
      { name: "TEST2", tag: "BEVERAGE" },
      { name: "TEST13", tag: "BEVERAGE" }
    ].filter(
      item => !graphArgs.tag || (graphArgs.tag && item.tag === graphArgs.tag)
    );
  }
};

var app = express();
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
  })
);
app.listen(4000);
console.log("Running a GraphQL API server at localhost:4000/graphql");
