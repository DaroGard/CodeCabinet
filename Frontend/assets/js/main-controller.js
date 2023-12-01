function userProfile(){
    document.getElementById('topNav').innerHTML += `
    <img src="/assets/img/default-picture.png" id="profilePic">
    `;
}

userProfile();

function userProjects(){
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
            <li><a href=""><i class="fa-solid fa-wifi"></i> Offline</a></li>
            <br>
            <li><a href=""><i class="fa-solid fa-credit-card"></i> Change Plan</a></li>
            <br>        
            <li><a href="index.html"><i class="fa-solid fa-door-open"></i> Sign Out</a></li>             
        </ul> 
    </div> 
    <div class="modal-footer">    
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
    </div>
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

function userLocalProjects(){
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
    proyects = 8
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