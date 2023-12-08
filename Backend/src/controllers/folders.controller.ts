import { Request, Response } from "express";
import { Folder } from "../models/folder.model";
import { FolderSchema } from "../models/folder.schema";

export const getFolders = (req: Request, res: Response) => {
    FolderSchema.find()
    .then((result:Array<Folder>) =>{
        res.send(result);
        res.end();
    })
    .catch((error:any) => console.error(error));
}

export const getFolder = (req: Request, res: Response) => {
    FolderSchema.findOne({_id: req.params.id})
    .then((result:Folder|null)=>{
        res.send(result);
        res.end();
    })
    .catch((error:any) => console.error(error));
}