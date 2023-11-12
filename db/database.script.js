use cloudArch;

db.createCollection('users');
db.createCollection('directories');
db.createCollection('files');
db.createCollection('sharedfiles');
db.createCollection('deletedfiles');

db.users.insertMany([
    {
        'username': 'admin1',
        'employeeName': 'Patricio Estrella',
        'password': '12345678',
        'type': 'admin'
    },
    {
        'username': 'user1',
        'employeeName': 'Bob esponja',
        'password': '12345678',
        'type': 'user'
    },
    {
        'username': 'user2',
        'employeeName': 'Calamardo  ',
        'password': '12345678',
        'type': 'user'
    }
]);

db.directories.insertMany([
    {
        'username': 'admin1',
        'path': 'root',
        'name': 'tareas'
    },
    {
        'username': 'user1',
        'path': 'root',
        'name': 'cursos'
    },
    {
        'username': 'admin1',
        'path': 'root',
        'name': 'reportes'
    },
    {
        'username': 'user2',
        'path': 'root',
        'name': 'html'
    }
]);

db.files.insertMany([
    {
        'username': 'admin1',
        'path': 'root',
        'name': 'calificacion.txt',
        'content': 'texto ingresado desde el script'
    },
    {
        'username': 'admin1',
        'path': 'root',
        'name': 'index.html',
        'content': '<h1>Hello World!</h1>'
    },
    {
        'username': 'user1',
        'path': 'root',
        'name': 'renuncia.txt',
        'content': 'renuncio!'
    }
]);