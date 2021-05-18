const express  = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cors());

mongoose.connect("mongodb://localhost:27017/testDB", { useNewUrlParser : true});

const userSchema = new mongoose.Schema ({
    id: String,
    pw: String, 
    nickname : String
});


const User = mongoose.model("Users", userSchema);

app.post('/register' , (req, res) =>{ 
    const {id, pw, nickname} = req.body;

    const user = new User({
        id : id,
        pw : pw,
        nickname : nickname
     });
     user.save();
})


app.listen(3001, () => console.log("listen 3001"))