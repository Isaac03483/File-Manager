const Directory = require('../models/Directory');
const File = require('../models/File');
const DeletedFile = require('../models/DeletedFile');

const findUserDirectories = async (req, res) => {
    const username = req.params.username;
    const path = req.query.path;

    const directories = await Directory.find( { username: username, path: path });

    res.json(directories);
};

const createDirectory = async (req,res) => {
    const username = req.body.username;
    const name = req.body.name;
    const path = req.body.path;

    const find = await Directory.findOne({ username: username, path: path, name: name });

    if(find) {
        res.status(400).send('directory already exists');
        return;
    }

    const directory = new Directory({ username, path, name });

    const saved = await directory.save();

    res.json(saved);
}

const findAllWithout = async (req,  res) => {
    const username = req.params.username;
    const name = req.params.name;
    const path = req.query.path;

    const directories = await Directory.find({ username: username, path: path, name: { $ne: name } });

    res.json(directories);
};

const moveDirectory = async (req, res) => {
    const username = req.body.username;
    const name = req.body.name;
    const oldPath = req.body.oldPath;
    const newPath = req.body.newPath;

    await moveAll(username, name, oldPath, newPath);

    res.json('Directories updated :D');
}

const moveAll = async (username, name, oldPath, newPath) => {

    const directoryUpdated = await Directory.findOneAndUpdate({ username: username, name: name, path: oldPath },
        { $set: { path: newPath } });

    const oldDirectoryPath = `${directoryUpdated.path}/${directoryUpdated.name}`;
    const newDirectoryPath = `${newPath}/${directoryUpdated.name}`;

    console.log('oldDirectoryPath:', oldDirectoryPath);
    console.log('newDirectoryPath:', newDirectoryPath);

    const files = await File.find({ username: username, path: oldDirectoryPath });

    for(let i = 0; i < files.length; i++) {

        const fileUpdated = await File.findOneAndUpdate({ username: username, path: oldDirectoryPath, name: files[i].name },
            { $set: { path: newDirectoryPath } });

    }

    const directories = await Directory.find({ username: username, path: oldDirectoryPath });

    for(let i = 0; i < directories.length; i++) {

        await moveAll(username, directories[i].name, oldDirectoryPath, newDirectoryPath);
    }
};

const deleteDirectory = async (req, res) => {
    const username = req.params.username;
    const name = req.params.name;
    const path = req.query.path;
    const newPath = req.query.newPath;

    await deleteAll(username, name, path);

    res.json('Directories deleted :D');
};

const deleteAll = async (username, name, path) => {
    const directoryDeleted = await Directory.findOneAndDelete({ username: username, name: name, path: path });

    const directoryPath = `${directoryDeleted.path}/${directoryDeleted.name}`;

    const files = await File.find({ username: username, path: directoryPath });

    for(let i = 0; i < files.length; i++) {

        const deletedFile = await File.findOneAndDelete({ username: username, path: directoryPath, name: files[i].name });

        const insertDeleted = new DeletedFile({
            username: deletedFile.username,
            name: deletedFile.name,
            content: deletedFile.content
        });

        const saved = insertDeleted.save();
    }

    const directories = await Directory.find({ username: username, path: directoryPath });

    for(let i = 0; i < directories.length; i++) {

        await deleteAll(username, directories[i].name, directoryPath);
    }
};

const copyDirectory = async (req, res) => {
    const username = req.body.username;
    const name = req.body.name;
    const path = req.body.path;
    const newPath = req.body.newPath;

    await copyAll(username, name, path, newPath);

    res.json('Directories copied :D');
};

const copyAll = async (username, name, path, newPath) => {

    const directory = await Directory.findOne({ username: username, name: name, path: path });


    const copy = new Directory({
        username: username, name: directory.name, path: newPath
    });

    const saved = await copy.save();

    const oldChildrenPath = `${directory.path}/${directory.name}`;
    const newChildrenPath = `${newPath}/${copy.name}`;

    const files = await File.find({ username: username, path: oldChildrenPath });

    for(let i = 0; i < files.length; i++) {

        // const file = await File.findOne({ username: username, path: oldChildrenPath, name: files[i].name });

        const fileCopy = new File({
            username: username, name: files[i].name, path: newChildrenPath, content: files[i].content
        });

        const fileSaved = await fileCopy.save();
    }

    const directories = await Directory.find({ username: username, path: oldChildrenPath });

    for(let i = 0; i < directories.length; i++) {

        await copyAll(username, directories[i].name, oldChildrenPath, newChildrenPath);
    }
};

module.exports = {
    findUserDirectories,
    createDirectory,
    findAllWithout,
    moveDirectory,
    deleteDirectory,
    copyDirectory
}