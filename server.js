var webpack = require(‘webpack’);
var WebpackDevServer = require(‘webpack-dev-server’);
var express = require(‘express’);
var graphqlHTTP = require(‘express-graphql’);
var graphql = require(‘graphql’);

var GraphQLSchema = graphql.GraphQLSchema;
var GraphQLObjectType = graphql.GraphQLObjectType;
var GraphQLString = graphql.GraphQLString;
var GraphQLInt = graphql.GraphQLInt;

var breaking = {
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
