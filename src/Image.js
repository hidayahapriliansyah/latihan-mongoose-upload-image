import mongoose from 'mongoose';

const imageSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  image: {
    type: String,
  },
});

const Image = mongoose.model('image', imageSchema);

export default Image;
