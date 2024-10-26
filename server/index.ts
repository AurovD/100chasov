import express from 'express';
import dotenv from 'dotenv';
// import cors from 'cors';


const app = express();
// dotenv.config({
//     path: 'server/.env'
// });
// import './core/db';

// app.use(cors());
app.use(express.json());

// app.use(bodyParser.urlencoded({ extended: false }))
// app.use(bodyParser.json())


app.listen(3001, () => {
    console.log('server running');
});