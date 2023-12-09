import mongoose from "mongoose";

export interface Folder {
    _id:mongoose.Types.ObjectId,
        title: string,
        user: {
            _id:mongoose.Types.ObjectId,
            username: string
        },
        favorites: boolean,
        shared: boolean,
        recycle: boolean,
        inside: [
            {
                html: string
            },
            {
                css: string
            },
            {
                js: string
            }
        ]    

}