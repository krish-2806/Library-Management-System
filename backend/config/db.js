import mongoose from "mongoose";

export const connectDB = async () =>{
    mongoose.connect("mongodb://krishprajapati2806_db_user:krrish_ooo1_@ac-lwhxdbb-shard-00-00.j0cy0iu.mongodb.net:27017,ac-lwhxdbb-shard-00-01.j0cy0iu.mongodb.net:27017,ac-lwhxdbb-shard-00-02.j0cy0iu.mongodb.net:27017/?ssl=true&replicaSet=atlas-6c5iw9-shard-0&authSource=admin&appName=Cluster0")
    .then(()=>{
        console.log("DB Connected");
    })
}