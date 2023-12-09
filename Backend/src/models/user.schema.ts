import mongoose from "mongoose";
import { User } from "./user.model";

const schema = new mongoose.Schema<User>({
    _id:mongoose.Types.ObjectId,      
    username: String,     
    password: String,      
    profileimg: String,       
    membership: String,      
    folders:[  
        {   
            _id:mongoose.Types.ObjectId  
        }            
    ]  
});

export const UserSchema = mongoose.model('users', schema);