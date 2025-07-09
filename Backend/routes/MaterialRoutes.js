// routes/materials.js
const express = require('express');
const router = express.Router();
const Material = require('../models/Material');
const auth = require('../middleware/authMiddleware');

// ✅ POST: Add a new material
router.post('/', auth, async (req, res) => {
  const { groupId, link } = req.body;

  if (!groupId || !link) {
    return res.status(400).json({ error: 'groupId and link are required' });
  }

  try {
    const newMaterial = await Material.create({
      groupId,
      link,
      uploaderId: req.user.id,
    });

    const populatedMaterial = await Material.findById(newMaterial._id).populate('uploaderId', 'name email');

    res.status(201).json(populatedMaterial);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//  GET: Fetch all materials for a group
router.get('/:groupId', auth, async (req, res) => {
  try {
    const materials = await Material.find({ groupId: req.params.groupId }).populate('uploaderId', 'name');
    res.json(materials);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
