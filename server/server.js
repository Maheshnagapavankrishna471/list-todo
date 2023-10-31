const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const TodoModel = require('./Models/Todo');
const dotenv = require('dotenv')

const app = express();
dotenv.config()
app.use(cors());
app.use(express.json());

// mongoose.connect('mongodb://127.0.0.1:27017/test', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
// .then(() => {
//   console.log("MongoDB connected");
// })
// .catch(err => {
//   console.error("MongoDB connection error:", err);
// });

// const mongoose = require('mongoose')

async function conn(){
    await mongoose.connect(process.env.MongoDB_URL)
    .then(() => {
      console.log("MongoDB connected");
    })
    .catch(err => {
      console.error("MongoDB connection error:", err);
    });
}

app.get('/get', (req, res) => {
    TodoModel.find()
    .then(result => res.json(result))
    .catch(err => res.json(err))
});

app.put('/update/:id', (req, res) =>{
    const {id} = req.params;
    TodoModel.findByIdAndUpdate({_id: id},{done:true})
    .then(result => res.json(result))
    .catch(err => res.json(err))
})

app.delete('/delete/:id', (req,res) =>{
    const {id} = req.params;
    TodoModel.findByIdAndDelete({_id: id})
    .then(result => res.json(result))
    .catch(err => res.json(err))

})

app.post('/add', (req, res) => {
  const task = req.body.task;
  TodoModel.create({
    task: task
  })
  .then(result => res.json(result))
  .catch(err => res.json(err));
});

// app.listen(5000, () => {
//   console.log("Server started on port 5000");
// });

conn().then(()=>{
  app.listen(5000, ()=>{
      console.log("server start on Port 5000")
  })
}).catch(err =>{
  console.log(err)
})