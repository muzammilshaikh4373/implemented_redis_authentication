import express from 'express';
import dotenv from 'dotenv';
import dbConnection from './dbconnection/db.js';
import userRoutes from './routes/userRoutes.js';
import taskRoutes from './routes/taskRoutes.js';
dotenv.config();

let app = express();
app.use(express.json())
app.use('/user',userRoutes,)
app.use('/task',taskRoutes)

app.listen(process.env.PORT||8080,()=>{
    dbConnection(process.env.DBNAME,process.env.DBURL)
    console.log(`server started at ${process.env.PORT || 8080}`)

})
