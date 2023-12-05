function userProfile(){
    document.getElementById('topNav').innerHTML += `
    <img src="/assets/img/default-picture.png" type="button" data-bs-toggle="modal" data-bs-target="#userModal" onclick="userModalWindow()" id="profilePic">
    `;
}

userProfile();

function userProjects(){
    document.getElementById('mainHeader').innerHTML = 'Home';
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

function userModalWindow(){
    document.getElementById('userModalContent').innerHTML = '';
    document.getElementById('userModalContent').innerHTML = `
    <div class="modal-header">
            <h1 class="modal-title fs-5" id="modalLogLabel">User Profile</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>  
        <div class="modal-body" id="modal-body-user">     
            <div id="modalPerfilImg"><img src="assets/img/default-picture.png" alt="" style="width: 100%;"></div>
            <h1>Username</h1>
            <ul>
              <li><a href="#">Change Username</a></li>
              <li><a href="#" onclick="usersModalWindow()">Select User</a></li>
              <li><a href="index.html">Sign Out</a></li>
            </ul>
    `;
}

function usersModalWindow(){
    document.getElementById('modal-body-user').innerHTML = '';
    document.getElementById('modal-body-user').innerHTML += `
    <div id="modalSelectPerfilImg"><img src="assets/img/default-picture.png" alt="" style="width: 100%;"></div>
    <h1 id="modalUsername">Username</h1>
    `;
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

function userLocalProjects(){
    document.getElementById('mainHeader').innerHTML = 'My Unit';
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

function userShareProjects(){
    document.getElementById('mainHeader').innerHTML = 'Share Projects';
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

function userFavProjects(){
    document.getElementById('mainHeader').innerHTML = 'Favorites';
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

function storageLimit (){
    let limit = 0;
    membership = "Premium";
    proyects = 1
    let result = 0;
    let meter = document.querySelector('.progress-bar')
    
    if(membership == "free"){
        limit = 2;

    } if(membership == "Standard"){
        limit = 5;
        
    } if(membership == "Premium"){
        limit = 10;
        result = proyects/limit; 
        meter.style.width = `${result*100 + '%'}`;
        document.getElementById('storageMeter').innerHTML += `${result*100 + '%'}`;
    }
};

storageLimit ();

function codePage(){
    window.location.href = 'code.html'
}