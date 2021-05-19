const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const md5 = require('md5');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

mongoose.connect('mongodb://localhost:27017/testDB', { useNewUrlParser: true });
mongoose.set('useCreateIndex', true);
const userSchema = new mongoose.Schema({
  id: {
    type: String,
    trim: true,
    unique: true,
    required: true,
    minLength: 4,
  },
  pw: {
    type: String,
    required: true,
    minLength: 4,
  },
  nickname: {
    type: String,
    unique: true,
    required: true,
    minLength: 2,
    maxLength: 15,
  },
});

const User = mongoose.model('Users', userSchema);

app.post('/register', async (req, res) => {
  const { id, pw, nickname } = req.body;

  const user = new User({
    id: id,
    pw: md5(pw),
    nickname: nickname,
  });
  try {
    const result = await user.save();
    res.send(result.nickname);
  } catch (err) {
    if (err.keyPattern.id) res.send({ result: 'duplicateId' });
    else if (err.keyPattern.nickname) res.send({ result: 'duplicateNickname' });
  }
});

app.post('/login', async (req, res) => {
  const { id, pw } = req.body;
  try {
    const result = await User.findOne({ id: id, pw: md5(pw) }, { nickname: 1 });
    if (result === null) res.send(false);
    else res.send(result.nickname);
  } catch (error) {
    console.log(error);
  }
});
app.listen(3001, () => console.log('listen 3001'));
