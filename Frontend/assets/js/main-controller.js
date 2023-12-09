var htmlCode = localStorage.getItem('htmlCode') || '';
var cssCode = localStorage.getItem('cssCode') || '';
var jsCode = localStorage.getItem('jsCode') || '';
var selectedUser = localStorage.getItem('id');
localStorage.removeItem('folderId');
let amount;

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

    storageLimit ();
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
    localStorage.setItem('folderId', `${id}`);
};

const userProjects = async () => {
    const resultado = await fetch(`http://localhost:8888/folders`, {
        method: 'GET'
    });
    
    folders = await resultado.json();

    document.getElementById('mainHeader').innerHTML = 'Home';
    document.getElementById('projectCard').innerHTML = '';

    folders.forEach(folder => {
        if(folder.user._id == selectedUser && folder.recycle != true){
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
                       <a href="#" class="card-link" id="favoriteIcon_${folder._id}" onclick="addFav('${folder._id}')"><i class="fa-regular fa-star"></i></a>                                                   
                       <a href="#" class="card-link" id="shareIcon_${folder._id}" onclick="shareFolder('${folder._id}')"><i class="fa-solid fa-folder-tree"></i></a>                                             
                       <a href="#" class="card-link" id="recycleIcon" onclick="toRecycle('${folder._id}')"><i class="fa-regular fa-trash-can"></i></a>                                      
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
        } else if(folder.shared == true && folder.recycle != true){
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
                       <a href="#" class="card-link" id="favoriteIcon_${folder._id}" )"><i class="fa-regular fa-star"></i></a>                                                   
                       <a href="#" class="card-link" id="shareIcon_${folder._id}" ><i class="fa-solid fa-folder-tree"></i></a>                                             
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
            <h1>${usuario.username}</h1>
            <br>
            <form id="uploadForm">
               <input type="file" id="imageInput" accept="image/*" required>
               <button type="button" onclick="uploadImage()">Change Picture</button>
            </form>
            <br>
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
              <input type="text" id="userC" placeholder="Username">                    
              <br> 
              Password:<br>                   
              <input type="password" id="passC" placeholder="Password">                    
              <br>                   
              Confirm Password:<br>
              <input type="password" id="passConfirm" placeholder="Password">                   
              <br>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" class="btn btn-primary" data-bs-dismiss="modal" onclick="addUser()">Add</button> 
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
                        <h1 class="planModalHeader" id="Free" >Free</h1>
                    <ul>
                        <li>Save 2 projects</li>
                    </ul>
                    </article>
                    <div class="innerPlansBox">
                        <article id="cont3"><img src="assets/img/lg-mini0.png" style="width: 55%;"></article>
                        <article id="cont2">
                            <button id="getPlanButton" onclick="changePlan('${selectedUser}', 'Free')">Get</button>
                        </article>
                    </div>   
                </div>  
                <div class="planBox">
                    <article id="cont1">
                        <h1 class="planModalHeader" id="Standard">Standard Plan</h1>
                    <ul>
                        <li>Save 5 projects</li>
                        <li>Create 5 snippets</li>
                        <li>Share the plan with 2 people</li> 
                    </ul>
                    </article>
                    <div class="innerPlansBox">
                        <article id="cont3"><img src="assets/img/lg-mini0.png" style="width: 55%;"></article>
                        <article id="cont2">
                            <button id="getPlanButton" onclick="changePlan('${selectedUser}','Standard')">Get</button>
                        </article>
                    </div>   
                </div>
                <div class="planBox">
                    <article id="cont1">
                        <h1 class="planModalHeader" id="Premium">Premium Plan</h1>
                    <ul>
                       <li>Save 10 projects</li>
                       <li>Create 20 snippets</li>
                       <li>Share the plan with 5 people</li>  
                    </ul>
                    </article>
                    <div class="innerPlansBox">
                        <article id="cont3"><img src="assets/img/lg-mini0.png" style="width: 55%;"></article>
                        <article id="cont2">
                            <button id="getPlanButton" onclick="changePlan('${selectedUser}','Premium')">Get</button>
                        </article>
                    </div>   
                </div>
                <div class="planBox">
                    <article id="cont1">
                        <h1 class="planModalHeader" id="Platinum">Platinum Plan</h1>
                    <ul>
                        <li>Save 50 projects</li>
                        <li>Create 35 snippets</li>
                        <li>Share the plan with 10 people</li>
                    </ul>
                    </article>
                    <div class="innerPlansBox">
                        <article id="cont3"><img src="assets/img/lg-mini0.png" style="width: 55%;"></article>
                        <article id="cont2">
                            <button id="getPlanButton" onclick="changePlan('${selectedUser}','Platinum')">Get</button>
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
        if(folder.user._id == selectedUser && folder.recycle != true){
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
                       <a href="#" class="card-link" id="favoriteIcon_${folder._id}" onclick="addFav('${folder._id}')"><i class="fa-regular fa-star"></i></a>                                                   
                       <a href="#" class="card-link" id="shareIcon_${folder._id}" onclick="shareFolder('${folder._id}')"><i class="fa-solid fa-folder-tree"></i></a>                                             
                       <a href="#" class="card-link" id="recycleIcon" onclick="toRecycle('${folder._id}')"><i class="fa-regular fa-trash-can"></i></a>                                      
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
        if(folder.shared == true && folder.recycle != true){
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
                       <a href="#" class="card-link" id="recycleIcon" onclick="toRecycle('${folder._id}')"><i class="fa-regular fa-trash-can"></i></a>                                      
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
        if(folder.user._id == selectedUser && folder.recycle != true){
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
                           <a href="#" class="card-link" id="favoriteIcon_${folder._id}" onclick="addFav('${folder._id}')"><i class="fa-regular fa-star"></i></a>                                                   
                           <a href="#" class="card-link" id="shareIcon_${folder._id}" onclick="shareFolder('${folder._id}')"><i class="fa-solid fa-folder-tree"></i></a>                                             
                           <a href="#" class="card-link" id="recycleIcon" onclick="toRecycle('${folder._id}')"><i class="fa-regular fa-trash-can"></i></a>                                      
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

const userRecycle = async() => {
    document.getElementById('mainHeader').innerHTML = 'Recycle';

    const resultado = await fetch(`http://localhost:8888/folders`, {
        method: 'GET'
    });
    
    folders = await resultado.json();

    document.getElementById('projectCard').innerHTML = '';

    folders.forEach(folder => {
        if(folder.user._id == selectedUser && folder.recycle){
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
                       <a href="#" class="card-link" id="favoriteIcon_${folder._id}" onclick="restoreRecycle('${folder._id}')"><i class="fa-solid fa-trash-can-arrow-up"></i></i></a>                                                                                                
                       <a href="#" class="card-link" id="recycleIcon" onclick="deleteFolder('${folder._id}')"><i class="fa-regular fa-trash-can"></i></a>                                      
                    </div>     
                </div>
            </div>
        `;
        } 
    }); 
}

const storageLimit = async() => {
    amount = 0;
    let limit = 0;
    let result = 0;
    let meter = document.querySelector('.progress-bar')

    const resultado = await fetch(`http://localhost:8888/users/${selectedUser}`, {
        method: 'GET'
    });

    usuario = await resultado.json();

    const datos = await fetch(`http://localhost:8888/folders`, {
        method: 'GET'
    });
    
    folders = await datos.json();

    folders.forEach(folder =>{
        if(folder.user._id == selectedUser){
            amount += 1;
        } 
    })

    localStorage.setItem('MAX', `${amount}`)
    
    if(usuario.membership == "Free"){
        limit = 2;
        localStorage.setItem('LIMIT', `${limit}`)
        result = amount/limit; 
        meter.style.width = `${result*100 + '%'}`;
        document.getElementById('storageMeter').innerHTML = `${result*100 + '%'}`;
    } if(usuario.membership == "Standard"){
        limit = 5;
        localStorage.setItem('LIMIT', `${limit}`)
        result = amount/limit; 
        meter.style.width = `${result*100 + '%'}`;
        document.getElementById('storageMeter').innerHTML = `${result*100 + '%'}`;
    } if(usuario.membership == "Premium"){
        limit = 10;
        localStorage.setItem('LIMIT', `${limit}`)
        result = amount/limit; 
        meter.style.width = `${result*100 + '%'}`;
        document.getElementById('storageMeter').innerHTML = `${result*100 + '%'}`;
    } if(usuario.membership == "Platinum"){
        limit = 20;
        localStorage.setItem('LIMIT', `${limit}`)
        console.log(amount);
        result = amount/limit; 
        meter.style.width = `${result*100 + '%'}`;
        document.getElementById('storageMeter').innerHTML = `${result*100 + '%'}`;
    };
};

function codePage(){
    htmlCode = localStorage.removeItem('html_code');
    cssCode = localStorage.removeItem('css_code');
    jsCode = localStorage.removeItem('js_code');
    window.location.href = 'code.html'; 
}

const addFav = async(folderID) =>{
    var newData = { favorites: false };

    const resultado = await fetch(`http://localhost:8888/folders/${folderID}`, {
        method: 'GET'
    });

    var folder = await resultado.json();
  
    if(folder.favorites == true){
        newData = { favorites: false };
        var favoriteIcon = document.getElementById(`favoriteIconON`);     
        favoriteIcon.id = `favoriteIcon_${folder._id}`;
    } else {
        newData = { favorites: true };
        var favoriteIcon = document.getElementById(`favoriteIcon_${folder._id}`);     
        favoriteIcon.id = "favoriteIconON";
    }

    const apiUrl = 'http://localhost:8888/folders/' + folderID;
    
    const requestOptions = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          
        },
        body: JSON.stringify(newData),
    };

    fetch(apiUrl, requestOptions)
    .then(response => {  
        if (!response.ok) {   
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json(); 
    })
    .then(updatedFolder => {
        console.log('Updated folder:', updatedFolder);
    })
    .catch(error => { 
        console.error('Error:', error);  
    });
}

const shareFolder = async(folderID) =>{
    var newData = { shared: false };

    const resultado = await fetch(`http://localhost:8888/folders/${folderID}`, {
        method: 'GET'
    });

    var folder = await resultado.json();
  
    if(folder.shared == true){
        newData = { shared: false };
        var shareIcon = document.getElementById(`shareIconON`);     
        shareIcon.id = `shareIcon_${folder._id}`;
    } else {
        newData = { shared: true };
        var shareIcon = document.getElementById(`shareIcon_${folder._id}`);
        shareIcon.id = "shareIconON";
    }

    const apiUrl = 'http://localhost:8888/folders/' + folderID;
    
    const requestOptions = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          
        },
        body: JSON.stringify(newData),
    };

    fetch(apiUrl, requestOptions)
    .then(response => {  
        if (!response.ok) {   
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json(); 
    })
    .then(updatedFolder => {
        console.log('Updated folder:', updatedFolder);
    })
    .catch(error => { 
        console.error('Error:', error);  
    });
}

const toRecycle = async(folderID) =>{
    var newData = { recycle: true };
    amount -= 1;

    const apiUrl = 'http://localhost:8888/folders/' + folderID;
    
    const requestOptions = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          
        },
        body: JSON.stringify(newData),
    };

    fetch(apiUrl, requestOptions)
    .then(response => {  
        if (!response.ok) {   
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json(); 
    })
    .then(updatedFolder => {
        console.log('Updated folder:', updatedFolder);
    })
    .catch(error => { 
        console.error('Error:', error);  
    });
    window.location.href = 'main.html';
};

const restoreRecycle = async(folderID) =>{
    var newData = { recycle: false };

    const apiUrl = 'http://localhost:8888/folders/' + folderID;
    
    const requestOptions = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          
        },
        body: JSON.stringify(newData),
    };

    fetch(apiUrl, requestOptions)
    .then(response => {  
        if (!response.ok) {   
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json(); 
    })
    .then(updatedFolder => {
        console.log('Updated folder:', updatedFolder);
    })
    .catch(error => { 
        console.error('Error:', error);  
    });
};

const changePlan = async(userID, plan) =>{
    var newData = { membership: plan };

    const apiUrl = 'http://localhost:8888/users/' + userID;
    
    const requestOptions = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          
        },
        body: JSON.stringify(newData),
    };

    fetch(apiUrl, requestOptions)
    .then(response => {  
        if (!response.ok) {   
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json(); 
    })
    .then(updateduser => {
        console.log('Updated user:', updateduser);
    })
    .catch(error => { 
        console.error('Error:', error);  
    });

    window.location.href = 'main.html';
}

const addUser = async () => {
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
            console.log('User successfully added:', data);
        })
        .catch(error => {   
            console.error('Error:', error);
        });
        alert('New user added');
    } else {
        alert('User already exists');
        return;
    }
};

function uploadImage() {
    var fileInput = document.getElementById('imageInput');
    var file = fileInput.files[0];

    if (!file) {
      alert('Select an image to change your profile photo.');
      return;
    }

    var formData = new FormData();
    formData.append('image', file);

    fetch('https://api.imgbb.com/1/upload?key=085d3387d7b8c79f8d7d784d304d39f3', {
      method: 'POST',
      body: formData,
    })
    .then(response => response.json())
    .then(data => {
      var imageUrl = data.data.url;
      changeImg(selectedUser, imageUrl);
    })
    .catch(error => {
      console.error('Error:', error);
    });
  }

  const changeImg = async(userID, img) =>{
    var newData = { profileimg: img };
    const apiUrl = 'http://localhost:8888/users/' + userID;
    
    const requestOptions = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          
        },
        body: JSON.stringify(newData),
    };

    fetch(apiUrl, requestOptions)
    .then(response => {  
        if (!response.ok) {   
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json(); 
    })
    .then(updateduser => {
        console.log('Updated user:', updateduser);
    })
    .catch(error => { 
        console.error('Error:', error);  
    });

    window.location.href = 'main.html';

}

const deleteFolder = async (folderId) => {
    try {
      const response = await fetch(`http://localhost:8888/folders/${folderId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const data = await response.json();
      console.log('Deleted folder:', data.message);
    } catch (error) {
      console.error('Error:', error.message);
    }

    updateUserFolder(selectedUser, folderId);
  };



const updateUserFolder = (userId, folderId) => {
    fetch(`http://localhost:8888/users/${userId}/folders/${folderId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        return response.json();
      })
      .then((updatedUser) => {
        console.log('Updated user:', updatedUser);
        
      })
      .catch((error) => {
        console.error('Error:', error.message);
      });

      window.location.href = 'main.html';
  };