const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;
const userSchema = new mongoose.Schema({
    userId: String,
    messages: [
      {
        message:String
      }
    ]
  });
mongoose.connect('mongodb+srv://countmontesocialhelper:yolo@cluster0.cuvkvqw.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(err => {
    console.error('Error connecting to MongoDB:', err);
  });


app.use(bodyParser.json());



const YourModel = mongoose.model('User', userSchema);



app.get('/api/users/:userId', async (req, res) => {
    try {
      const userId = req.params.userId;
  
      
      const user = await User.findById(userId);
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.json(user);
    } catch (err) {
      console.error(err);
      res.status(500).send('Server Error');
    }
  });



app.post('/api/users/:userId/messages', 
async (req, res) => {
    try {
      const userId = req.params.userId;
      const { message } = req.body;
  
     
      let user = await User.findOne({ userId });
  
      
      if (!user) {
        user = new User({ userId, messages: [] });
      }
  
      
      const newMessage = { message };
  
      
      user.messages.push(newMessage);
  
      
      await user.save();
  
      res.json(user);
    } catch (err) {
      console.error(err);
      res.status(500).send('Server Error');
    }
  });
  
  
  
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });



