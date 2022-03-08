const express = require("express");
const app = express();
const mongoose = require("mongoose");

const cors = require("cors");

const Todo = require("./model/todo.js");
//db connection
mongoose.connect(
  "mongodb://localhost:27017/todo-test",
  { useNewUrlParser: true },
  () => {
    console.log("connected to db");
  }
);

//middlewares
app.use(express.json());
app.use(cors());

//routes
app.get("/", async (req, res) => {
  let todo = await Todo.find({});
  if (todo) {
    res.json({ statu: "ok", data: todo });
  }
});
app.post("/", async (req, res) => {
  let todo = await Todo({
    Id: req.body.id,
    Date: req.body.date,
    Description: req.body.description,
    Status: req.body.status,
  });
  await todo.save();
});
app.put("/:id", async (req, res) => {
  const { id } = req.params;
  let todo = await Todo.updateOne({ Id: id });
  todo.Status = "completed";
  await todo.save();
  res.json({ statu: "ok", data: todo });
});
app.delete("/:id", async (req, res) => {
  const { id } = req.params;
  let todo = await Todo.deleteOne({ Id: id });
  await todo.save();

  // await todo.save()
  console.log(req.params);
});

app.listen(process.env.PORT || 3010, () => {
  console.log("connected to server...");
});
