const Material = require('../models/Material');

// ✅ Create material
exports.createMaterial = async (req, res) => {
  try {
    const uploaderModel = req.user.isAdmin ? 'Admin' : 'User';
    const material = await Material.create({
      groupId: req.body.groupId,
      link: req.body.link,
      uploaderId: req.user.id,
      uploaderModel
    });

    res.status(201).json(material);
  } catch (err) {
    console.error('Add material error:', err);
    res.status(500).json({ error: 'Failed to add material' });
  }
};

// ✅ Get all materials
exports.getMaterials = async (req, res) => {
  try {
    const materials = await Material.find({ groupId: req.params.groupId })
      .populate('uploaderId', 'name')
      .sort({ createdAt: 1 });

    res.json(materials);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch materials' });
  }
};
