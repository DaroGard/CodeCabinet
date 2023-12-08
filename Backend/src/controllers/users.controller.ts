import { Request, Response } from "express";
import mongoose from "mongoose";
import { User } from "../models/user.model";
import { UserSchema } from "../models/user.schema";

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

export const addFolder = (req: Request, res: Response) => {
    UserSchema.updateOne({_id: req.params.id},
      {
        $push: { 
            folders: {
              _id: new mongoose.Types.ObjectId(req.body.id),
            } 
        }
      }
    ).then(result => {
      res.send({message: 'Folder its add', result});
      res.end();
    }).catch(error => {
      res.send({message: 'Error', error});
      res.end();
    })
  };