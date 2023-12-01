function userVerification(){
    user = document.getElementById('user').value;
    password = document.getElementById('pass').value;

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