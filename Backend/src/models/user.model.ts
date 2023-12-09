import mongoose from "mongoose";

export interface User {
    _id:mongoose.Types.ObjectId,      
    username: string,     
    password: string,      
    profileimg: string,       
    membership: string,      
    folders: [  
        {   
            _id:mongoose.Types.ObjectId  
        }             
    ]
}