var webpack = require(‘webpack’);
var WebpackDevServer = require(‘webpack-dev-server’);
var express = require(‘express’);
var graphqlHTTP = require(‘express-graphql’);
var graphql = require(‘graphql’);

var GraphQLSchema = graphql.GraphQLSchema;
var GraphQLObjectType = graphql.GraphQLObjectType;
var GraphQLString = graphql.GraphQLString;
var GraphQLInt = graphql.GraphQLInt;


var breakings = {
 1: {
   character: "Walter White/Heisenberg",
   actor: "Bryan Cranston",
   role: "the one who knocks",
   traits: "intelligent, cunning",
   id: 1
 },
 2: {
   character: "Jesse Pinkman",
   actor: "Aaron Paul",
   role: "co-cook, yo",
   traits: "inattentive, meth-head",
   id: 2
 },
 3: {
   character: "Saul Goodman",
   actor: "Bob Odenkirk",
   role: "criminal lawyer",
   traits: "criminal, lawyer",
   id: 3
 },
 4: {
   character: "Hank Schrader",
   actor: "Dean Norris",
   role: "antagonist",
   traits: "DEA agent, relentless",
   id: 4
 },
 5: {
   character: "Mike Ehrmantraut",
   actor: "Jonathan Banks",
   role: "assassin/enforcer",
   traits: "ruthless, intimidating",
   id: 5
 },
 6: {
   character: "Tio Salamanca",
   actor: "Mark Margolis",
   role: "bell-ringer",
   traits: "explosive personality",
   id: 6
 }
}

function getBreaking(id) {
  return breakings[id]
}

var breakingType = new GraphQLObjectType({
  name: 'character',
  description: "character from Breaking Bad",
  fields: {
    character: {
      type: GraphQLString,
      description: "Name of the character",
    },
    actor: {
      type: GraphQLString,
      description: "Actor playing the character",
    },
    role: {
      type: GraphQLString,
      description: "Role of thie character"
    },
    traits: {
      type: GraphQLString,
      description: "Traits this character is known for"
    },
    id: {
      type: GraphQLInt,
      description: "ID of this character",
    }
  }
});

var queryType = new GraphQLObjectType({
  name: "query",
  description: "Breaking Bad query",
  fields: {
    goldberg: {
      type: breakingType,
      args: {
        id: {
          type: GraphQLInt
        }
      },
      resolve: function(_, args){
        return getBreaking(args.id)
      }
    }
  }
});

var schema = new GraphQLSchema({
  query: queryType
});

var graphQLServer = express();
graphQLServer.use('/', graphqlHTTP({ schema: schema, graphiql: true }));
graphQLServer.listen(8080);
console.log("The GraphQL Server is running.")

var compiler = webpack({
  entry: "./index.js",
    output: {
        path: __dirname,
        filename: "bundle.js",
        publicPath: "/static/"
    },
    module: {
        loaders: [
            { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader"
          }
        ]
    }
});

var app = new WebpackDevServer(compiler, {
  contentBase: '/public/',
  proxy: {'/graphql': `http://localhost:${8080}`},
  publicPath: '/static/',
  stats: {colors: true}
});

// Serve static resources
app.use('/', express.static('static'));
app.listen(3000);
console.log("The App Server is running.")
