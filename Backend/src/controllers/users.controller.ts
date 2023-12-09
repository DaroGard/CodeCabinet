import { Request, Response } from "express";
import mongoose from "mongoose";
import { User } from "../models/user.model";
import { UserSchema } from "../models/user.schema";
import { FolderSchema } from "../models/folder.schema";
const { ObjectId } = mongoose.Types;

export const getUsers = (req: Request, res: Response) => {
    UserSchema.find()
    .then((result:Array<User>) =>{
        res.send(result);
        res.end();
    })
    .catch((error:any) => console.error(error));
};

export const getUser = (req: Request, res: Response) => {
    UserSchema.findOne({_id: req.params.id})
    .then((result:User|null)=>{
        res.send(result);
        res.end();
    })
    .catch((error:any) => console.error(error));
};

export const updateUser = (req: Request, res: Response) => {
  const userId = req.params.id;
  const updateData = req.body;

  if (!updateData) {
      res.status(400).send('No new data');
      return;
  }

  UserSchema.findByIdAndUpdate(userId, updateData, { new: true })
      .then((updatedUser: User | null) => {
          if (updatedUser) {
              res.send(updatedUser);
          } else {
              res.status(404).send('Usuario no encontrado');
          }
      })
      .catch((error: any) => {
          console.error('Error:', error);
          res.status(500).send('Server error');
      });
};

export const addUser = (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400).send('Username and password are required');
    return;
  }
  
  const newUser = new UserSchema({
    _id: new mongoose.Types.ObjectId(),
    username,
    password,
    profileimg: '/assets/img/default-picture.png',
    membership: 'Free',
    folders: [], 
  });

  newUser.save()
    .then((savedUser: User) => {
      res.send(savedUser);
    })
    .catch((error: any) => {
      console.error('Error:', error);
      res.status(500).send('Server error');
    });
};

export const deleteFolder = (req: Request, res: Response) => {
  const userId = req.params.id;
  const folderIdToDelete = req.params.folderId;

  UserSchema.findOneAndUpdate(
    { _id: userId },
    { $pull: { folders: { _id: folderIdToDelete } } },
    { new: true }
  )
    .then((updatedUser: User | null) => {
      if (updatedUser) {
        res.send(updatedUser);
      } else {
        res.status(404).send('Usuario no encontrado');
      }
    })
    .catch((error: any) => {
      console.error(error);
      res.status(500).send('Error interno del servidor');
    });
};
