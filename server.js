const express = require('express');
const helmet = require('helmet');
const cors = require('cors'); // https://www.npmjs.com/package/cors
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Friend = require('./Friends/FriendModel');

const server = express();

server.use(helmet()); // https://helmetjs.github.io/
server.use(cors()); // https://medium.com/trisfera/using-cors-in-express-cac7e29b005b
server.use(bodyParser.json());

server.get('/', function(req, res) {
  res.status(200).json({ status: 'API Running' });
});

server.post('/api/friends', function(req, res) {
  const friendInformation = req.body;
  const { firstName, lastName, age } = req.body;

  if (firstName && lastName && age) {
    const friend = new Friend(friendInformation); // mongoose document
    friend
      .save() // returns a promise
      .then(savedFriend => {
        res.status(201).json(savedFriend);
      })
      .catch(error => {
        res.status(500).json({
          error: 'There was an error while saving the Friend to the Database'
        });
      });
  } else {
    res.status(500).json({
      errorMessage: 'Please provide First name, Last name, and Age for Friends'
    });
  }
});

server.get('/api/friends', function(req, res) {
  Friend.find({}) // all the bears
    .then(friends => {
      res.status(200).json(friends);
    })
    .catch(error => {
      res
        .status(500)
        .json({ error: 'The information could not be retrieved.' });
    });
});

server.get('/api/friends/:id', function(req, res) {
  const id = req.params.id;

  Friend.findById(id) // all the bears
    .then(friend => {
      res.status(200).json(friend);
    })
    .catch(error => {
      res
        .status(500)
        .json({ error: 'The information could not be retrieved.' });
    });
});

mongoose
  .connect('mongodb://localhost/Friends') // returns a promise
  .then(db => {
    console.log(
      `Successfully Connected to MongoDB ${db.connections[0].name} database`
    );
  })
  .catch(error => {
    console.error('Database Connection Failed');
  });

const port = process.env.PORT || 5005;
server.listen(port, () => {
  console.log(`API running on http://localhost:${port}.`);
});
