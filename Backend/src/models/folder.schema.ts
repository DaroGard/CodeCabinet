import mongoose from "mongoose";
import { Folder } from "./folder.model"; 

const InsideSchema = new mongoose.Schema({
    html: String,
    css: String,
    js: String,
  });
  

const schema = new mongoose.Schema<Folder>({
    _id:mongoose.Types.ObjectId,        
    title: String,      
    user:{        
        _id:mongoose.Types.ObjectId,        
        username: String      
    },      
    favorites: Boolean,      
    shared: Boolean,      
    recycle: Boolean,     
    inside:[InsideSchema]    
});

export const FolderSchema = mongoose.model('folders', schema);