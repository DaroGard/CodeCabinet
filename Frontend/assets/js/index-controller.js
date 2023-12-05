function userVerification(){
    const username = 'David';
    const userPassword = '134';

    user = document.getElementById('user').value;
    password = document.getElementById('pass').value;

    if(username == user && userPassword == password){
        window.location.href = 'main.html';
    } else {
        alert('Datos incorrectos');
    }

    console.log("Usuario: ", user);
    console.log("Contraseña: ", password);
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

