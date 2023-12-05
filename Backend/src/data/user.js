const user = [
    {
        _id: 1,
        username: 'David',
        password: '12345',
        profileimg: 'img.jpg',
        membership: 'Platinum',
        proyects: [
            {
                _id:1,
                title: 'Proyecto1',
                html: 'index.html',
                css: 'estilos.css',
                js: 'controlador.js',
                local: true,
                shared: false,
                favorites: true,
                recycle: false,
            },
            {
                _id:2,
                title: 'Proyecto2',
                html: 'index.html',
                css: 'estilos.css',
                js: 'controlador.js',
                local: true,
                shared: true,
                favorites: false,
                recycle: false,
            },
            {
                _id:3,
                title: 'Proyecto3',
                html: 'index.html',
                css: 'estilos.css',
                js: 'controlador.js',
                local: false,
                shared: false,
                favorites: false,
                recycle: true,
            }
        ],
        favorites: [1, 2, 3],
    }
];