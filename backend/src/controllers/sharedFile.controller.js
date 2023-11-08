const SharedFile = require('../models/SharedFile');

const findUserSharedFiles = async (req, res) => {
    const username = req.params.username;

    const files = await SharedFile.find({ usernameDestiny: username });

    res.json(files);
};

const shareFileTo = async (req, res) => {
    const usernameDestiny = req.body.usernameDestiny;
    const usernameOrigin = req.body.usernameOrigin;
    const name = req.body.name;
    const content = req.body.content;
    const date = new Date();

    const sharedFile = new SharedFile({
        usernameDestiny,
        usernameOrigin,
        name,
        content,
        date
    });

    const saved = await sharedFile.save();

    res.json(saved);
};

module.exports = {
    findUserSharedFiles,
    shareFileTo
}