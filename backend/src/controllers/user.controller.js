const User = require('../models/User');

const findUser = async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const user  = await User.findOne({username: username});

    if(!user) {
        res.status(404).send('user not found');
        return;
    }

    if(user.password !== password) {

        res.status(404).send('user not found');
        return;
    }

    res.json({username: user.username, employeeName: user.employeeName, type: user.type});


};

const saveUser = async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const employeeName = req.body.employeeName;
    const type = req.body.type;

    const user = await User.findOne({username: username});

    if(user) {
        res.status(400).send('username already exists');
        return;
    }

    const userToSave = new User({
        username, password, employeeName, type
    });

    const saved = await userToSave.save();

    res.json({username: saved.username, employeeName: saved.employeeName, type: saved.type});
};

const updateUser = async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const employeeName = req.body.employeeName;
    const type = req.body.type;

    const updated = await User.updateOne({ username: username },
        { $set: { password: password, employeeName: employeeName, type: type } });

    res.json(updated);
};

const deleteUser = async (req, res) => {
    const username = req.params.username;

    const deleted = await User.deleteOne({username: username});

    res.json(deleted);
};

const findAll = async (req, res) => {
    const all = await User.find();

    res.json(all);
}

module.exports = {
    findUser,
    saveUser,
    deleteUser,
    findAll,
    updateUser
}