const mongoose = require('mongoose');

const uri = 'mongodb+srv://admin:Gf5kVhCf9nt49Mwc@cluster0.fdzkrxz.mongodb.net/mainproject?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(uri)
  .then(() => {
    console.log('✅ MongoDB test connected');
    process.exit();
  })
  .catch(err => {
    console.error('❌ Test connection failed:', err);
    process.exit();
  });
