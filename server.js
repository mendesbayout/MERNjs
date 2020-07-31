const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');


const app = express();
app.use(bodyParser.urlencoded({
  extended: true
}));


app.use(express.json());

//Use routers
app.use('/items', require('./routes/api/items'));
app.use('/users', require('./routes/api/users'));
app.use('/', require('./routes/api/auth'));



//DB config  
const db = require('./config/keys').mongoURI;

//Connect mongoES
mongoose
  .connect(db, { useCreateIndex: true, useNewUrlParser: true,  useUnifiedTopology: true })
  .then(() => console.log('DB connected'))
  .catch(err => console.log(err));



// Serve static if in products assts
if(process.env.NODE_ENV === 'production'){
  //Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));

  });
}





const port = process.env.PORT || 5000;




app.listen(port, () => console.log(`Server running on port ${port}`));