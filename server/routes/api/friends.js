const express = require('express');
const router = express.Router();

const Friend = require('../../models/Friend');

router.get('/index', (req, res) => {
  Friend.find((err, friends) => {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    }
    res.json(friends);
  });
});

router.post('/new', (req, res) => {
  const friend = new Friend({
    name: req.body.name,
    activity: req.body.activity,
    food: req.body.food,
  });
  friend.save((err, friend) => {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    }
    res.status(200).json(friend);
  });
});

router.post('/friend-info', (req, res) => {
  Friend.find({ _id: req.body.id }, (err, friend) => {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    }
    res.status(200).json(friend);
  });
});

router.post('/edit', (req, res) => {
  const { id, name, activity, food } = req.body;
  const request = {
    name,
    activity,
    food,
  };
  Friend.updateOne({ _id: id }, request, { new: true }, (err, friend) => {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    }
    res.status(200).json(friend);
  });
});

router.post('/delete', (req, res) => {
  const { id } = req.body;
  Friend.deleteOne({ _id: id }, (err, friend) => {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    }
    res.status(200).json(friend);
  });
});

module.exports = router;
