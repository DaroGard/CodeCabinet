import { Request, Response } from "express";
import mongoose from "mongoose";
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

export const updateFolder = (req: Request, res: Response) => {
    const folderId = req.params.id;
    const updateData = req.body;

    if (!updateData) {
        res.status(400).send('No new data');
        return;
    }

    FolderSchema.findByIdAndUpdate(folderId, updateData, { new: true })
        .then((updatedFolder: Folder | null) => {
            if (updatedFolder) {
                res.send(updatedFolder);
            } else {
                res.status(404).send('Carpeta no encontrada');
            }
        })
        .catch((error: any) => {
            console.error('Error:', error);
            res.status(500).send('Server error');
        });
};

export const deleteFolder = async (req: Request, res: Response) => {
    const folderId = req.params.id;

    try {
        const deletedFolder = await FolderSchema.findByIdAndDelete(folderId);

        if (deletedFolder) {
            res.send({ message: 'Folder deleted successfully', deletedFolder });
        } else {
            res.status(404).send({ message: 'Folder not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Error deleting folder');
    }
};

export const addFolder = (req: Request, res: Response) => {
    const { title, user, inside } = req.body;
  
    if (!title || !user) {
      res.status(400).send('Title and user are required');
      return;
    }
  
    const newFolder: Folder = {
      _id: new mongoose.Types.ObjectId(),
      title,
      user,
      favorites: false,
      shared: false,
      recycle: false,
      inside: inside || [], // Asegúrate de manejar correctamente inside
    };
  
    const folderModel = new FolderSchema(newFolder);
  
    folderModel.save()
      .then((savedFolder: Folder) => {
        res.send(savedFolder);
      })
      .catch((error: any) => {
        console.error('Error:', error);
        res.status(500).send('Server error');
      });
  };