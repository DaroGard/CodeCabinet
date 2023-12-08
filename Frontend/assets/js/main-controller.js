var htmlCode = localStorage.getItem('htmlCode') || '';
var cssCode = localStorage.getItem('cssCode') || '';
var jsCode = localStorage.getItem('jsCode') || '';
var selectedUser = localStorage.getItem('id');
console.log(selectedUser);

if(selectedUser == null){
    window.location.href = 'index.html';
}

const userProfile = async () => {
    const resultado = await fetch(`http://localhost:8888/users/${selectedUser}`, {
        method: 'GET'
    });

    usuario = await resultado.json();

    document.getElementById('topNav').innerHTML = `
    <input type="search" placeholder="Search" id="searchBar">
    <button type="button" class="button" data-bs-toggle="modal" data-bs-target="#modalLog" onclick="modalWindow()"><i class="fa-solid fa-gears fa-2xl" id="settingsIcon"></i></button>
    <img src="${usuario.profileimg}" type="button" data-bs-toggle="modal" data-bs-target="#userModal" onclick="userModalWindow()" id="profilePic">
    `;
}

userProfile();

const openFolder = async (id) => {

    const resultado = await fetch(`http://localhost:8888/folders/${id}`, {
        method: 'GET'
    });
    
    folder = await resultado.json();

    localStorage.setItem('html_code', `${folder.inside[0].html}`);
    localStorage.setItem('css_code', `${folder.inside[1].css}`);
    localStorage.setItem('js_code', `${folder.inside[2].js}`);

    window.location.href = 'code.html'
};

const userProjects = async () => {
    const resultado = await fetch(`http://localhost:8888/folders`, {
        method: 'GET'
    });
    
    folders = await resultado.json();

    document.getElementById('mainHeader').innerHTML = 'Home';
    document.getElementById('projectCard').innerHTML = '';

    folders.forEach(folder => {
        if(folder.shared == true){
            document.getElementById('projectCard').innerHTML += `
            <div class="col">
                <div class="card" style="width: 16rem;"> 
                    <img src="/assets/img/project-bg.jpg" class="card-img-top" alt="Project" onclick="openFolder('${folder._id}', '${htmlCode}')">   
                    <div class="card-body">                                                            
                        <h5 class="card-title">${folder.title}</h5>                                                  
                    </div>                                                     
                    <ul class="list-group list-group-flush">                                                     
                        <li class="list-group-item">${folder.user.username}</li>                                                   
                    </ul>                                                    
                    <div class="card-body">                                                    
                       <a href="#" class="card-link" id="favoriteIcon_${folder._id}"><i class="fa-regular fa-star"></i></a>                                                   
                       <a href="#" class="card-link" id="shareIcon_${folder._id}"><i class="fa-solid fa-folder-tree"></i></a>                                             
                       <a href="#" class="card-link" id="recycleIcon"><i class="fa-regular fa-trash-can"></i></a>                                      
                    </div>     
                </div>
            </div>
        `;
        if(folder.user._id == selectedUser){
            if(folder.favorites == true){
                var favoriteIcon = document.getElementById(`favoriteIcon_${folder._id}`);
                favoriteIcon.id = "favoriteIconON";
            }
        }
        if(folder.shared == true){
            var shareIcon = document.getElementById(`shareIcon_${folder._id}`);
            shareIcon.id = "shareIconON";
        }
        } else if(folder.user._id == selectedUser){
            document.getElementById('projectCard').innerHTML += `
            <div class="col">
                <div class="card" style="width: 16rem;"> 
                    <img src="/assets/img/project-bg.jpg" class="card-img-top" alt="Project" onclick="openFolder('${folder._id}')">   
                    <div class="card-body">                                                            
                        <h5 class="card-title">${folder.title}</h5>                                                  
                    </div>                                                     
                    <ul class="list-group list-group-flush">                                                     
                        <li class="list-group-item">${folder.user.username}</li>                                                   
                    </ul>                                                    
                    <div class="card-body">                                                    
                       <a href="#" class="card-link" id="favoriteIcon_${folder._id}"><i class="fa-regular fa-star"></i></a>                                                   
                       <a href="#" class="card-link" id="shareIcon_${folder._id}"><i class="fa-solid fa-folder-tree"></i></a>                                             
                       <a href="#" class="card-link" id="recycleIcon"><i class="fa-regular fa-trash-can"></i></a>                                      
                    </div>     
                </div>
            </div>
        `;
        if(folder.user._id == selectedUser){
            if(folder.favorites == true){
                var favoriteIcon = document.getElementById(`favoriteIcon_${folder._id}`);
                favoriteIcon.id = "favoriteIconON";
            }
        };
        if(folder.shared == true){
            var shareIcon = document.getElementById(`shareIcon_${folder._id}`);
            shareIcon.id = "shareIconON";
        }
        };
    }); 
    
}

userProjects();

function modalWindow(){
    document.getElementById('modalContent').innerHTML = '';
    document.getElementById('modalContent').innerHTML = `
    <div class="modal-header">
        <h1 class="modal-title fs-5" id="modalLogLabel">Settings</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    </div>  
    <div class="modal-body">     
        <ul>
            <li><a href="#" onclick="addUserModal()"><i class="fa-solid fa-user-plus"></i> Add account</a></li>
            <br>
            <li><a href="#" onclick="plansUserModal()"><i class="fa-solid fa-credit-card"></i> Change Plan</a></li>
            <br>        
            <li><a href="index.html"><i class="fa-solid fa-door-open"></i> Sign Out</a></li>             
        </ul> 
    </div> 
    <div class="modal-footer">    
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
    </div>
    `;
}

const userModalWindow = async() => {
    const resultado = await fetch(`http://localhost:8888/users/${selectedUser}`, {
        method: 'GET'
    });

    usuario = await resultado.json();

    document.getElementById('userModalContent').innerHTML = '';
    document.getElementById('userModalContent').innerHTML = `
    <div class="modal-header">
            <h1 class="modal-title fs-5" id="modalLogLabel">User Profile</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>  
        <div class="modal-body" id="modal-body-user">     
            <div id="modalPerfilImg"><img src="${usuario.profileimg}" alt="" style="width: 100%;"></div>
            <h1>Username</h1>
            <ul>
              <li><a href="#" onclick="usersModalWindow()">Select User</a></li>
              <li><a href="index.html">Sign Out</a></li>
            </ul>
    `;
}

const usersModalWindow = async() =>{
    const resultado = await fetch(`http://localhost:8888/users`, {
        method: 'GET'
    });

    usuarios = await resultado.json();

    document.getElementById('modal-body-user').innerHTML = '';
    usuarios.forEach(usuario =>{
        document.getElementById('modal-body-user').innerHTML += `
        <div id="modalSelectPerfilImg" onclick="changeUser('${usuario._id}')"><img src="${usuario.profileimg}" alt="" style="width: 100%;"></div>
        <h1 id="modalUsername">${usuario.username}</h1>
        `;
    })
}

function changeUser(id){
    localStorage.setItem('id', id);
    selectedUser = id;
    userProfile();
    userProjects();
    storageLimit();
}

function addUserModal(){
    document.getElementById('modalContent').innerHTML = '';
    document.getElementById('modalContent').innerHTML += `
    <div class="modal-header">
              <h1 class="modal-title fs-5" id="modalLogLabel">Add Account</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">  
              Username:<br> 
              <input type="text" placeholder="Username">                    
              <br> 
              Password:<br>                   
              <input type="password" placeholder="Password">                    
              <br>                   
              Confirm Password:<br>
              <input type="password" placeholder="Password">                   
              <br>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Add</button> 
            </div>
    `;
}

function plansUserModal(){
    document.getElementById('modalContent').innerHTML = '';
    document.getElementById('modalContent').innerHTML += `
    <div class="modal-header">
                <h1 class="modal-title fs-5" id="modalLogLabel">Plans</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>  
            <div class="modal-body">  
                <div class="planBox">
                    <article id="cont1">
                        <h1 id="planModalHeader">Standard Plan</h1>
                    <ul>
                        <li>Ventaja1</li>
                        <li>Ventaja2</li>
                        <li>Ventaja3</li> 
                    </ul>
                    </article>
                    <div class="innerPlansBox">
                        <article id="cont3"><img src="assets/img/lg-mini0.png" style="width: 55%;"></article>
                        <article id="cont2">
                            <button id="getPlanButton">Get</button>
                        </article>
                    </div>   
                </div>
                <div class="planBox">
                    <article id="cont1">
                        <h1 id="planModalHeader">Premium Plan</h1>
                    <ul>
                        <li>Ventaja1</li>
                        <li>Ventaja2</li>
                        <li>Ventaja3</li> 
                    </ul>
                    </article>
                    <div class="innerPlansBox">
                        <article id="cont3"><img src="assets/img/lg-mini0.png" style="width: 55%;"></article>
                        <article id="cont2">
                            <button id="getPlanButton">Get</button>
                        </article>
                    </div>   
                </div>
                <div class="planBox">
                    <article id="cont1">
                        <h1 id="planModalHeader">Platinum Plan</h1>
                    <ul>
                        <li>Ventaja1</li>
                        <li>Ventaja2</li>
                        <li>Ventaja3</li> 
                    </ul>
                    </article>
                    <div class="innerPlansBox">
                        <article id="cont3"><img src="assets/img/lg-mini0.png" style="width: 55%;"></article>
                        <article id="cont2">
                            <button id="getPlanButton">Get</button>
                        </article>
                    </div>   
                </div>
            </div> 
            <div class="modal-footer">    
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
    `;
}

const userLocalProjects = async() => {

    const resultado = await fetch(`http://localhost:8888/folders`, {
        method: 'GET'
    });
    
    folders = await resultado.json();

    document.getElementById('mainHeader').innerHTML = 'My Unit';
    document.getElementById('projectCard').innerHTML = '';

    folders.forEach(folder => {
        if(folder.user._id == selectedUser){
            document.getElementById('projectCard').innerHTML += `
            <div class="col">
                <div class="card" style="width: 16rem;"> 
                    <img src="/assets/img/project-bg.jpg" class="card-img-top" alt="Project" onclick="openFolder('${folder._id}')">   
                    <div class="card-body">                                                            
                        <h5 class="card-title">${folder.title}</h5>                                                  
                    </div>                                                     
                    <ul class="list-group list-group-flush">                                                     
                        <li class="list-group-item">${folder.user.username}</li>                                                   
                    </ul>                                                    
                    <div class="card-body">                                                    
                       <a href="#" class="card-link" id="favoriteIcon_${folder._id}"><i class="fa-regular fa-star"></i></a>                                                   
                       <a href="#" class="card-link" id="shareIcon_${folder._id}"><i class="fa-solid fa-folder-tree"></i></a>                                             
                       <a href="#" class="card-link" id="recycleIcon"><i class="fa-regular fa-trash-can"></i></a>                                      
                    </div>     
                </div>
            </div>
        `;
        if(folder.favorites == true){
            var favoriteIcon = document.getElementById(`favoriteIcon_${folder._id}`);
            favoriteIcon.id = "favoriteIconON";
        }
        if(folder.shared == true){
            var shareIcon = document.getElementById(`shareIcon_${folder._id}`);
            shareIcon.id = "shareIconON";
        }
        };
    }); 
    
}


function Pcs(){
    document.getElementById('mainHeader').innerHTML = 'Computers';
    document.getElementById('projectCard').innerHTML = '';
    document.getElementById('projectCard').innerHTML += `
    <div class="col">
        <div class="card" style="width: 16rem;"> 
            <img src="/assets/img/computer.jpg" class="card-img-top" alt="Project">   
            <div class="card-body">                                                            
                <h5 class="card-title">Username</h5>                                                  
            </div>                                                          
        </div>
    </div>
    `;
}

const userShareProjects = async() => {

    const resultado = await fetch(`http://localhost:8888/folders`, {
        method: 'GET'
    });
    
    folders = await resultado.json();

    document.getElementById('mainHeader').innerHTML = 'Share Projects';
    document.getElementById('projectCard').innerHTML = '';

    folders.forEach(folder => {
        if(folder.shared == true){
            document.getElementById('projectCard').innerHTML += `
            <div class="col">
                <div class="card" style="width: 16rem;"> 
                    <img src="/assets/img/project-bg.jpg" class="card-img-top" alt="Project" onclick="openFolder('${folder._id}')">   
                    <div class="card-body">                                                            
                        <h5 class="card-title">${folder.title}</h5>                                                  
                    </div>                                                     
                    <ul class="list-group list-group-flush">                                                     
                        <li class="list-group-item">${folder.user.username}</li>                                                   
                    </ul>                                                    
                    <div class="card-body">                                                    
                       <a href="#" class="card-link" id="favoriteIcon_${folder._id}"><i class="fa-regular fa-star"></i></a>                                                   
                       <a href="#" class="card-link" id="shareIcon_${folder._id}"><i class="fa-solid fa-folder-tree"></i></a>                                             
                       <a href="#" class="card-link" id="recycleIcon"><i class="fa-regular fa-trash-can"></i></a>                                      
                    </div>     
                </div>
            </div>
        `;
        if(folder.user._id == selectedUser){
            if(folder.favorites == true){
                var favoriteIcon = document.getElementById(`favoriteIcon_${folder._id}`);
                favoriteIcon.id = "favoriteIconON";
            }
        }
        if(folder.shared == true){
            var shareIcon = document.getElementById(`shareIcon_${folder._id}`);
            shareIcon.id = "shareIconON";
        }
        };
    }); 
    
}

const userFavProjects = async() =>{

    const resultado = await fetch(`http://localhost:8888/folders`, {
        method: 'GET'
    });
    
    folders = await resultado.json();

    document.getElementById('mainHeader').innerHTML = 'Favorites';
    document.getElementById('projectCard').innerHTML = '';

    folders.forEach(folder => {
        if(folder.user._id == selectedUser){
            if(folder.favorites == true){
                document.getElementById('projectCard').innerHTML += `
                <div class="col">
                    <div class="card" style="width: 16rem;"> 
                        <img src="/assets/img/project-bg.jpg" class="card-img-top" alt="Project" onclick="openFolder('${folder._id}')">   
                        <div class="card-body">                                                            
                            <h5 class="card-title">${folder.title}</h5>                                                  
                        </div>                                                     
                        <ul class="list-group list-group-flush">                                                     
                            <li class="list-group-item">${folder.user.username}</li>                                                   
                        </ul>                                                    
                        <div class="card-body">                                                    
                           <a href="#" class="card-link" id="favoriteIcon_${folder._id}"><i class="fa-regular fa-star"></i></a>                                                   
                           <a href="#" class="card-link" id="shareIcon_${folder._id}"><i class="fa-solid fa-folder-tree"></i></a>                                             
                           <a href="#" class="card-link" id="recycleIcon"><i class="fa-regular fa-trash-can"></i></a>                                      
                        </div>     
                    </div>
                </div>
            `;
            if(folder.favorites == true){
                var favoriteIcon = document.getElementById(`favoriteIcon_${folder._id}`);
                favoriteIcon.id = "favoriteIconON";
            }
            if(folder.shared == true){
                var shareIcon = document.getElementById(`shareIcon_${folder._id}`);
                shareIcon.id = "shareIconON";
            }
            };
        }; 
    }); 
}

function userRecycle(){
    document.getElementById('mainHeader').innerHTML = 'Recycle';
    document.getElementById('projectCard').innerHTML = '';
    document.getElementById('projectCard').innerHTML += `
    <div class="col">
        <div class="card" style="width: 16rem;"> 
            <img src="/assets/img/project-bg.jpg" class="card-img-top" alt="Project">   
            <div class="card-body">                                                            
            <h5 class="card-title">Untitled</h5>                                                  
            </div>                                                     
            <ul class="list-group list-group-flush">                                                     
                <li class="list-group-item">Username</li>                                                   
            </ul>                                                    
            <div class="card-body">                                                    
                <a href="#" class="card-link" id="favoriteIcon"><i class="fa-regular fa-star"></i></a>                                                   
                <a href="#" class="card-link" id="shareIcon"><i class="fa-solid fa-folder-tree"></i></a>                                             
                <a href="#" class="card-link" id="recycleIcon"><i class="fa-regular fa-trash-can"></i></a>                                      
            </div>     
        </div>
    </div>
    `;
}

const storageLimit = async() => {

    const resultado = await fetch(`http://localhost:8888/users/${selectedUser}`, {
        method: 'GET'
    });

    usuario = await resultado.json();

    let limit = 0;
    let result = 0;
    let meter = document.querySelector('.progress-bar')
    
    if(usuario.membership == "Free"){
        limit = 2;
        result = usuario.folders.length/limit; 
        meter.style.width = `${result*100 + '%'}`;
        document.getElementById('storageMeter').innerHTML = `${result*100 + '%'}`;
    } if(usuario.membership == "Standard"){
        limit = 5;
        result = usuario.folders.length/limit; 
        meter.style.width = `${result*100 + '%'}`;
        document.getElementById('storageMeter').innerHTML = `${result*100 + '%'}`;
    } if(usuario.membership == "Premium"){
        limit = 10;
        result = usuario.folders.length/limit; 
        meter.style.width = `${result*100 + '%'}`;
        document.getElementById('storageMeter').innerHTML = `${result*100 + '%'}`;
    } if(usuario.membership == "Platinum"){
        limit = 20;
        result = usuario.folders.length/limit; 
        meter.style.width = `${result*100 + '%'}`;
        document.getElementById('storageMeter').innerHTML = `${result*100 + '%'}`;
    };
};

storageLimit ();

function codePage(){
    htmlCode = localStorage.removeItem('html_code') || '';
    cssCode = localStorage.removeItem('css_code') || '';
    jsCode = localStorage.removeItem('js_code') || '';
    window.location.href = 'code.html'
}


/*
function htmlDownload(code){
    var blob = new Blob([code], {type: 'text/html'});

    var a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'index.html';

    const content = document.getElementById('htmlink');

    content.addEventListener('click', function(){
        a.click();
    });
}

function cssDownload(code){
    var blob = new Blob([code], {type: 'text/css'});

    var a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'styles.css';

    const content = document.getElementById('csslink');

    content.addEventListener('click', function(){
        a.click();
    });
}

function jsDownload(code){
    var blob = new Blob([code], {type: 'text/js'});

    var a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'controller.js';

    const content = document.getElementById('jslink');

    content.addEventListener('click', function(){
        a.click();
    });
}
*/