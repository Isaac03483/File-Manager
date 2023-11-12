const File = require('../models/File');
const DeletedFile = require('../models/DeletedFile');

const saveFile = async (req, res) => {
    const username = req.body.username;
    const path = req.body.path;
    const name = req.body.name;
    const content = req.body.content;

    const find = await File.findOne({ username: username, path: path, name: name });

    if(find) {
        res.status(400).send('Ya existe un archivo con ese nombre');
        return;
    }

    const file = new File({username, path, name, content});
    const saved = await file.save();

    res.json(saved);
}

const updateFile = async (req, res) => {
    const username = req.body.username;
    const oldName = req.body.oldName;
    const path = req.body.path;
    const name = req.body.name;
    const content = req.body.content;


    console.log(content);
    if(oldName !== name) {

        const find = await File.findOne({ username: username, path: path, name: name });

        if(find) {
            res.status(400).send('Ya existe un archivo con ese nombre');
            return;
        }

    }

    const updated = await File.updateOne({ username: username, path: path, name: oldName },
        { $set: { name: name, content: content } });


    res.json(updated);
}

const findUserFiles = async (req, res) => {
    const username = req.params.username;
    const path = req.query.path;

    const files = await File.find({ username: username, path: path });

    res.json(files);
};

const findFileByName = async (req, res) => {
    const username = req.params.username;
    const name = req.params.name;
    const path = req.query.path;

    const file = await File.findOne({ username: username, path: path, name: name });

    res.json(file);
}

const deleteFileByName = async (req, res) => {
    const username = req.params.username;
    const name = req.params.name;
    const path = req.query.path;

    const file = await File.findOneAndDelete({ username: username, path: path, name: name });

    const deletedFile = new DeletedFile({
        username: file.username, name: file.name, content: file.content
    });

    const saved = await deletedFile.save();

    res.json(file);

};

const moveFile = async (req, res) => {
    const username = req.body.username;
    const name = req.body.name;
    const oldPath = req.body.oldPath;
    const newPath = req.body.newPath;

    const file = await File.findOne({username: username, name: name, path: newPath});

    if(file) {
        res.status(400).send('Ya existe un archivo con ese nombre');
        return;
    }

    const moved = await File.updateOne({username: username, name: name, path: oldPath},
        { $set: { path: newPath } });
    res.json(moved);
};

const copyFile = async (req, res) => {
    const username = req.body.username;
    const name = req.body.name;
    const path = req.body.path;
    const newPath = req.body.newPath;

    const find = await File.findOne({ username: username, name: name, path: newPath });

    if(find) {
        res.status(400).send('Ya existe un archivo con ese nombre');
        return;
    }

    const file = await File.findOne({ username: username, name: name, path: path });

    const copy = new File({
        username: username, name: name, path: newPath, content: file.content
    });

    const saved = await copy.save();

    res.json(saved);
}

module.exports = {
    saveFile,
    updateFile,
    findUserFiles,
    findFileByName,
    deleteFileByName,
    moveFile,
    copyFile
}