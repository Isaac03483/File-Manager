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

const findSharedFile = async (req, res) => {
    const username = req.params.username;
    const name = req.params.name;

    const file = await SharedFile.findOne({ usernameDestiny: username, name: name });

    res.json(file);
};

const updateSharedFile = async (req, res) => {
    const username = req.body.username;
    const name = req.body.name;
    const content = req.body.content;

    const updated = await SharedFile.updateOne({ usernameDestiny: username, name: name },
        { $set: { content: content } });

    res.json(updated);
}

const deleteSharedFile = async (req, res) => {
    const username = req.params.username;
    const name = req.params.name;

    const deleted = await SharedFile.deleteOne( { usernameDestiny: username, name: name } );

    res.json(deleted);
}

module.exports = {
    findUserSharedFiles,
    shareFileTo,
    findSharedFile,
    updateSharedFile,
    deleteSharedFile
}