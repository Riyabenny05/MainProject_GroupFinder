const express = require('express');
const router = express.Router();
const Group = require('../models/Group');

// GET all groups
router.get('/', async (req, res) => {
  try {
    const groups = await Group.find();
    res.json(groups);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST new group
router.post('/', async (req, res) => {
  const { title, subject, description } = req.body;

  const newGroup = new Group({
    title,
    subject,
    description,
  });

  try {
    const savedGroup = await newGroup.save();
    res.status(201).json(savedGroup);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
