import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';

let corsOptions = {
    origin: "http://localhost:3000",
    credentials: true,
};


const app = express();
dotenv.config({
    path: 'server/.env'
});
import './core/db';

// app.use(cors());
app.use(cors(corsOptions));
app.use(express.json());


app.use(cookieParser());

// app.use(bodyParser.urlencoded({ extended: false }))
// app.use(bodyParser.json())

import router from './router';

app.use('/api', router);


app.listen(3001, () => {
    console.log('server running');
});


'use strict';
const {
    Model
} = require('sequelize');



