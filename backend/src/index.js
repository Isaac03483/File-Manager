const { start } = require('./config/database.configs');
const express = require('express');
const AuthRoutes = require('./routes/auth.routes');
const UserRoutes = require('./routes/user.routes');
const DirectoryRoutes = require('./routes/directory.routes');
const FileRoutes = require('./routes/file.routes');
const SharedFileRoutes = require('./routes/sharedFile.routes');
const DeletedFileRoutes = require('./routes/deletedFile.routes');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended : false }));

start();

const port = 4000;

app.get('/', (req, res) => {
    res.send('Hello World');

});

app.use('/api', AuthRoutes);
app.use('/api', UserRoutes);
app.use('/api', DirectoryRoutes);
app.use('/api', FileRoutes);
app.use('/api', SharedFileRoutes);
app.use('/api', DeletedFileRoutes);

const server = app.listen(port, () => {
    console.log(`Listening in port ${port}`);
})