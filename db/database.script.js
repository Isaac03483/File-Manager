use cloudArch;

db.createCollection('users');
db.createCollection('directories');
db.createCollection('files');

db.users.insertMany([
    {
        'username': 'admin123',
        'employeeName': 'Patricio Estrella',
        'password': '1234',
        'type': 'admin'
    },
    {
        'username': 'user123',
        'employeeName': 'Bob esponja',
        'password': '1234',
        'type': 'user'
    }
]);

db.directories.insertMany([
    {
        'username': 'admin123',
        'name': 'root'
    },
    {
        'username': 'admin123',
        'name': 'shared'
    },
    {
        'username': 'user123',
        'name': 'root'
    },
    {
        'username': 'user123',
        'name': 'shared'
    }
]);

db.files.insertMany([
    {
        'username': 'admin123',
        'path': '/root',
        'name': 'MyFile',
        'type': 'txt',
        'content': 'admin file content'
    },
    {
        'username': 'user123',
        'path': '/root',
        'name': 'MyFile',
        'type': 'txt',
        'content': 'user file content'
    }
]);