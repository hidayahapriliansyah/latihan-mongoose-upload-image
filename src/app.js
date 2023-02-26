import express from 'express';
import mongoose from 'mongoose';
import multer from 'multer';
import dotenv from 'dotenv';

import Image from './Image.js';

dotenv.config();

const app = express();

const port = process.env.PORT;
mongoose.set('strictQuery', true);
mongoose.connect(process.env.MONGODB_URL)
  .then((resutl) => app.listen(port, () => console.log(`Server running on http://localhost:${port}`)))
  .catch((err) => console.log(err));

// mari kita maen multer
// configurasi destination sama filenme
const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images');
    // null adalah error 
  },
  filename: (req, file, cb) => {
    cb(null, new Date().getTime() + '-' + file.originalname);
  },
});

// konfigurasi filter image
const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/png'
    || file.mimetype === 'image/jpg'
    || file.mimetype === 'image/jpeg'
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

// buat middleware upload dari multer dari fileFIlter
const upload = multer({
  storage: fileStorage,
  fileFilter: fileFilter,
});

app.post('/image', upload.single('image'), async (req, res) => {
  // maksud 'image' adalah nama key dari body image harus image
  const { title } = req.body;
  const image = req.file.path;

  try {
    const result = await Image.create({ title, image, });
    res.status(201).json({ status: 'ok', data: result });
  } catch (err) {
    console.log(err); 
  }
});