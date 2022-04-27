const { request, response } = require("express");
const { User } = require("../models/user");

const register = async (req = request, res = response) => {
    const data = req.body
    const user = await User.create(data)
    res.json({
        user
    })
}
const login = async (req = request, res = response) => {
    const data = req.body
    const user = await User.create(data)
    res.json({
        user
    })
}

module.exports = {
   register,
   login,

}