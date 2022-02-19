const User = require('../postModel.js')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
require('dotenv').config()

class Auth {
    async getUsers(req, res) {
        try {
            const users = await User.find();
            return res.send(users);
        } catch (e) {
            console.log(e);
            throw e
        }
    }
    async getOneUser(req, res) {
        try {
            const _id = req.body
            if (!_id) {
                return res.status(404).json({message: 'This user not exist!'});
            }
            const oneUser = await User.findById(_id);
            return res.status(200).json({oneUser});
        } catch (e) {
            res.status(500).json({message: `Error in ${e} please try again`});
            console.log(e);
            throw e
        }
    }
    async login(req, res) {
        try {
            const {username, password} = req.body
            const user = await User.findOne({username});
            if (!user) {
                return res.status(404).json({message: 'User is not found.'});
            }
            const unHashPass = bcrypt.compareSync(password, user.password);
            if (!unHashPass) {
                return res.status(401).json({message: 'Incorrect password'});
            }
            const token = jwt.sign(
              {userId: user._id},
              process.env.SECRET_KEY,
              {expiresIn: '24h'}
            )
            return res.status(200).json({token, message: 'You logged in.'});
        } catch (e) {
            res.status(500).json({message: `Error in ${e} please try again`});
            console.log(e)
            throw e
        }
    }
    async register(req, res) {
        try {
            const { firstName, lastName, mail, username, password, coin } = req.body
            const candidate = await User.findOne({username});
            if (candidate) {
                return res.status(400).json({message: 'This user already exists'});
            }
            const hashPass = await bcrypt.hashSync(password, 12);
            const user = new User({firstName, lastName, mail, password: hashPass, username, coin});
            await user.save();
            return res.status(200).json({message: 'The user was created successfully'});
        } catch (e) {
            res.status(500).json({message: `Error in ${e} please try again`});
            console.log(e);
            throw e
        }
    }
    async deleteUser(req, res) {
        try {
            const _id = req.body;
            await User.findByIdAndDelete(_id);
            return res.status(200).json({message: 'User deleted successfully'});
        } catch (e) {
            res.status(500).json({message: `Error in ${e} please try again`});
            console.log(e);
            throw e
        }
    }
    async updateUser(req, res) {
        try {
            const user = req.body
            await User.findByIdAndUpdate(user._id, {
                ...user
            })
            return res.status(200).json({message: 'User updated successfully'});
        } catch (e) {
            res.status(500).json({message: `Error in ${e} please try again`});
            console.log(e);
            throw e
        }
    }
}
module.exports = new Auth();