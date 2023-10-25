const express =require('express');
require('dotenv').config();
const { graphqlHTTP } = require("express-graphql")
const schema=require('./schema/schema')
const port = process.env.PORT || 5000


var app = express()

//we use ((process.env.NODE_ENV==='develop')) instead of ((true))
app.use(
    "/graphql",
    graphqlHTTP({
      schema: schema,
      rootValue: root,
      graphiql: process.env.NODE_ENV==='develop',
    })
  )
app.listen(port,console.log(`Serve is running on port  ${port}`));
