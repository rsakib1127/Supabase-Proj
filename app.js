const express = require('express');

const session = require("express-session");
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const responseMiddleware = require('./middlewares/responseMiddleware');

const { createClient } = require('@supabase/supabase-js');
const path = require('path');

const {createClerkClient} = require('@clerk/clerk-sdk-node')








const supabaseUrl = 'https://vzndqxsbblpqkynmqjgd.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY


const supabase = createClient(supabaseUrl, supabaseKey, {
  global: { fetch: fetch.bind(globalThis) }
})




const secret = process.env.CLERK_SECRET_KEY;
const clerkClient = createClerkClient({ secretKey: secret })






// console.log(supabaseKey)

// const { errorHandler } = require('./middlewares/errorMiddleware');

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost",
    ],
    credentials: true,
  })
);


app.use(helmet()); // Security headers
app.use(morgan('dev')); // HTTP request logging

app.use(express.json({ limit: "50mb" }));

// hello world

// app.use(express.urlencoded({ limit: "50mb" }));
// Routes
// app.use('/api/fighters', fighterRoutes);
// app.use('/api/matches', matchRoutes);
// app.use('/api/events', eventRoutes);

app.use(responseMiddleware); 

app.get('/test', async (req, res) => {
 
  // let { data: Users, error } = await supabase
  //   .from('Users')
  //   .select('*')
            
  // // let userList = result
  // console.log({data: Users, error});

  const userList = await clerkClient.users.getUserList()
  console.log(userList)
  res.send('Test API is running');
});

app.get('/add', async (req, res) => {
  let result = await supabase.from("Users").insert([{
    id: 3,
    username: "test1",
    email: "test@example.com1",
}]);
  let userList = result.data
  console.log(result);
  res.send('Test API is running');
});


app.get('/', (req, res) => {
  res.send('Test API is running');
});

module.exports = app;