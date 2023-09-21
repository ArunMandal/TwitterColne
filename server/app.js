const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const productRouter = require('./routes/productRouter');
const categoryRouter = require('./routes/categoryRouter');
const userRouter = require('./routes/userRouter');
const authRouter = require('./routes/authRouter');
const followerRouter=  require('./routes/followerRouter');
const userTweetRouter=  require('./routes/userTweetRouter');
// const { createDB, closeConnection } = require('./utils/database');

//instatiation
const app = express();

//configuration



//middleware
app.use(cors());
app.use(express.json());

app.use('/users', userRouter);


app.use(authRouter);


//logged in user
app.use('/products', productRouter);
app.use('/categories', categoryRouter);
app.use('/userFollowers', followerRouter); 
app.use('/userTweet', userTweetRouter); 

app.use((err, req, res, next) => {
   console.log(err.message, '-----------------------');
   res.status(500).json({error: err.message});
});

//startup
mongoose.connect('mongodb://127.0.0.1:27017/onlineshopping')
   .then(() => {
      app.listen(3000, () => console.log('listening on 3000'));
   });



