const Directory = require('../models/Directory');
const File = require('../models/File');

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

    await move(username, name, oldPath, newPath);

    res.json('Directories updated :D');
}

const move = async (username, name, oldPath, newPath) => {

    console.log(`buscando: ${name}`, oldPath, newPath);

    const directories = await Directory.find({ username: username, name: name, path: oldPath });

    console.log('directories:', directories);

    for (let i = 0; i < directories.length; i++) {

        const directoryUpdated = await Directory.findOneAndUpdate({ username: username, name: name, path: oldPath },
            { $set: { path: newPath } });

        const oldDirectoryPath = `${directoryUpdated.path}/${directories[i].name}`;
        const newDirectoryPath = `${newPath}/${directories[i].name}`;

        console.log('oldDirectoryPath:', oldDirectoryPath);
        console.log('newDirectoryPath:', newDirectoryPath);

        const files = await File.find({ username: username, path: oldDirectoryPath });

        for(let j = 0; j < files.length; j++) {

            const fileUpdated = await File.findOneAndUpdate({ username: username, path: oldDirectoryPath, name: files[j].name },
                { $set: { path: newDirectoryPath } });

        }

        await move(username, directories[i].name, oldDirectoryPath, newDirectoryPath);
    }
}

module.exports = {
    findUserDirectories,
    createDirectory,
    findAllWithout,
    moveDirectory
}