localStorage.removeItem('id');
localStorage.removeItem('htmlCode');
localStorage.removeItem('cssCode');
localStorage.removeItem('jsCode');
localStorage.removeItem('html_code');
localStorage.removeItem('css_code');
localStorage.removeItem('js_code');
localStorage.removeItem('LIMIT') ;
localStorage.removeItem('MAX');

const userVerification = async () => {
    var cont = 0;
    const resultado = await fetch('http://localhost:8888/users', {
        method: 'GET'
    });

    usuarios = await resultado.json();
    user = document.getElementById('user').value;
    password = document.getElementById('pass').value;

    var MAX = usuarios.length;

    usuarios.forEach(usuario => {
        console.log(usuario.username);
        console.log(usuario._id);
        
        if(usuario.username == user && usuario.password == password){
            localStorage.setItem('id', `${usuario._id}`);
            window.location.href = 'main.html';
        } else {
            cont +=1;
            if (cont == MAX){
                alert('Incorrect datas');
            }
        }
    });
};

const createUser = async () => {
    user = document.getElementById('userC').value;
    pass = document.getElementById('passC').value;
    passwordConf = document.getElementById('passConfirm').value;
    verification = false;

    const resultado = await fetch(`http://localhost:8888/users`, {
        method: 'GET'
    });

    users = await resultado.json();

    users.forEach(name => {
        if(name.username == user ){ 
            verification = true;
        }
    });

    if (!user || !pass) {
        alert('Username and password are required');
        return;
    } else if(pass != passwordConf){
        alert('Contraseña no coincide');
    } else if(verification == false) { 
        fetch('http://localhost:8888/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: user, password: pass }),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error: ${response.status} - ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            alert('User successfully create');
            console.log('User successfully added:', data);
        })
        .catch(error => {   
            console.error('Error:', error);
        });
    } else {
        alert('User already exists');
        return;
    }
};
