const userModel = require("../models/users");
const bcypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const express = require("express");

const app = express();

app.post("/user", async(req, resp) => {
  try {
    const { body } = req;

    if (Object.keys(body).length >= 6) {
      const user = new userModel(body);
      if (user) {
        const passwordHashed = await bcypt.hashSync(body.password, Number(process.env.SALT));
        user['password'] = passwordHashed;
        const userSaved = await user.save();
        const token = await jwt.sign(JSON.stringify(userSaved) || null, process.env.SECRET);
        if (userSaved) {
          return resp
            .status(201)
            .json({ ok: true, message: "user creted", user: userSaved, token });
        }
      }
    } else {
      return resp.status(400).json({ ok: false, message: "Incomplete data" });
    }
  } catch (error) {
    console.log(error);
    return resp
      .status(500)
      .json({ ok: false, error, message: "internal server error" });
  }
});

module.exports = app;
