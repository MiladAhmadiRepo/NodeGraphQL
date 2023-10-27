const cors = require('cors');
const express =require('express');
const colors = require('colors');
 require('dotenv').config()
const { graphqlHTTP } = require("express-graphql")
const schema=require('./schema/schema')
const connectDB = require('./config/db');
console.log(process.env.PORT);


const port = process.env.PORT || 5000


var app = express()

app.use(cors());
//connect to database
connectDB();
//we use ((process.env.NODE_ENV==='develop')) instead of ((true))

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV === 'development',
    graphiql:true,
  },
  )
);

app.listen(port, console.log(`Server running on port ${port}`));