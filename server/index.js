const express =require('express');
require('dotenv').config();
const port = process.env.PORT || 5000


var app = express()
app.listen(port,console.log(`Serve is running on port  ${port}`));
