const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');


const app = express();




//DB config  
const db = require('./config/keys').mongoURI;

//Connect mongo
mongoose
  .connect(db, { useCreateIndex: true, useNewUrlParser: true,  useUnifiedTopology: true })
  .then(() => console.log('DB connected'))
  .catch(err => console.log(err));

//Declare port to localhost



// Serve static if in products assts
if(process.env.NODE_ENV === 'production'){
  //Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));

  });
}



app.use(bodyParser.urlencoded({
  extended: true
}));


app.use(express.json());

//Use routers
app.use('/api/items', require('./routes/api/items'));
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));

const port = process.env.PORT || 5000;




app.listen(port, () => console.log(`Server running on port ${port}`));