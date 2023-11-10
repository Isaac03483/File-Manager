use cloudArch;

db.createCollection('users');
db.createCollection('directories');
db.createCollection('files');
db.createCollection('sharedfiles');
db.createCollection('deletedfiles');

db.users.insertMany([
    {
        'username': 'admin123',
        'employeeName': 'Patricio Estrella',
        'password': '12345678',
        'type': 'admin'
    },
    {
        'username': 'user123',
        'employeeName': 'Bob esponja',
        'password': '12345678',
        'type': 'user'
    }
]);

db.directories.insertMany([
    {
        'username': 'admin123',
        'path': 'root',
        'name': 'MyDirectoryAdmin'
    },
    {
        'username': 'user123',
        'path': 'root',
        'name': 'MyDirectoryUser'
    }
]);

db.files.insertMany([
    {
        'username': 'admin123',
        'path': 'root',
        'name': 'MyFile.txt',
        'content': 'admin file content'
    },
    {
        'username': 'admin123',
        'path': 'root',
        'name': 'Other-file.txt',
        'content': 'admin other file content'
    },
    {
        'username': 'user123',
        'path': 'root',
        'name': 'MyFile.txt',
        'content': 'user file content'
    }
]);