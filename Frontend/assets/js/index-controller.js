localStorage.removeItem('id', ``);
localStorage.removeItem('htmlCode');
localStorage.removeItem('cssCode');
localStorage.removeItem('jsCode');
localStorage.removeItem('html_code');
localStorage.removeItem('css_code');
localStorage.removeItem('js_code');

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
                alert('Datos incorrectos');
            }
        }
    });
}

function createUser(){
    user = document.getElementById('userC').value;
    password = document.getElementById('passC').value;
    passwordConf = document.getElementById('passConfirm').value;

    if(password != passwordConf){
        alert('Contraseña no coincide');
    }else{
        console.log("Usuario: ", user);
        console.log("Contraseña: ", password);
        console.log("Contraseña Confirmacion: ", passwordConf);
    }

}

