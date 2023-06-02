const express = require("express");
const app = express();
const mongoose = require("mongoose");
const UserModel = require("./users");

const cors = require("cors");

app.use(express.json());
app.use(cors());

mongoose.connect(
  "mongodb+srv://safwan68:Safwan_68@cluster0.1cz4v88.mongodb.net/kar_assessment?retryWrites=true&w=majority"
);

app.get("/getUsers", async (req, res) => {
  try {
    const items = await UserModel.find({});
    res.status(201).json(items); //status code on success
  } catch {
    res.status(500).json({ message: error.message }); //status code on fail
  }
});
// http://localhost:3001/getOneUser/${parms._id}

app.get("/getOneUser/:id", async (req, res) => {
  const userId = req.params.id;
  console.log(userId);
  try {
    const user = await UserModel.findById(userId);
    res.status(201).json(user);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching the user." });
  }
});

app.post("/createUser", async (req, res) => {
  const user = req.body;
  const newUser = new UserModel(user);
  await newUser.save();
  res.json(user);
});

// api to update data of mongoDB by using id
app.put("/editUser/:id", async (req, res) => {
  console.log("tusssa", req);
  try {
    const id = req.params.id;
    // console.log(id, "purrrrr");
    const updatedUser = req.body;
    const user = await UserModel.findByIdAndUpdate(id, updatedUser, {
      new: true,
    });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Failed to update user" });
  }
});

// api to delete item from mongoDB using id
app.delete("/deleteUser/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const items = await UserModel.findByIdAndDelete(id);
    if (!items) {
      return res
        .status(404)
        .json({ message: `cannor find any product with Id ${id}` });
    }
    res.status(201).json(items); //status code on success
  } catch (error) {
    res.status(500).json({ message: error.message }); //status code on fail
  }
});

app.listen(3001, () => {
  console.log("Server is Running");
});
