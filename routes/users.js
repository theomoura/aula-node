var express = require('express');
var router = express.Router();

const User = require('../models/User');

router.post('/', function (req, res) {
  const { name, email, password } = req.body
  const user = new User({ name, email, password })

  user.save(function (err, result) {
    console.log(result)
    if (err) {
      res.status(500)
        .send("Error registering new user please try again.");
    } else {
      res.status(201).send({ id: result.id })
    }
  })
});

router.get('/', function (req, res) {
  User.find({}, function (err, users) {
    var userList = [];

    users.forEach(function (user) {
      userList.push(user)
    });

    res.status(200).send(userList);
  });
})

router.put('/', function (req, res) {
  var id = req.body.id;

  User.findById(id, function (err, user) {
    if (err) {
      console.error('error, no entry found');
    }
    user.name = req.body.name;
    user.email = req.body.email;
    user.password = req.body.password;
    user.save(function (err) {
      if (err) {
        res.status(500)
          .send("Error registering new user please try again.");
      } else {
        res.status(202).end()
      }
    })
  })
});

router.delete('/', function (req, res) {
  var id = req.body.id;
  User.deleteOne({ _id: id }, function (err) {
    if (err) {
      res.status(500)
        .send("Error deleting user please try again.");
    } else {
      res.status(204).end()
    }
  });
});


module.exports = router;
