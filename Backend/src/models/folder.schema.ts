import mongoose from "mongoose";
import { Folder } from "./folder.model"; 

const schema = new mongoose.Schema<Folder>({
    _id:mongoose.Types.ObjectId,        
    title: String,      
    user:{        
        _id:mongoose.Types.ObjectId,        
        username: String      
    },      
    Favorites: Boolean,      
    Shared: Boolean,      
    recycle: Boolean,     
    inside:[       
        {       
            html: String       
        },       
        {       
            css: String       
        },        
        {       
            js: String  
        }
        ]    
});

export const FolderSchema = mongoose.model('folders', schema);