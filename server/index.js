import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';

import postRoutes from './routes/posts.js';

const app = express();

app.use('/posts', postRoutes);

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

const CONNECTION_URL = 'mongodb+srv://LazySpinach:LazySpinach123@cluster0.xukxsh7.mongodb.net/?retryWrites=true&w=majority';
const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
    .catch((error) => console.log(error.message));
//https://www.mongodb.com/cloud/atlas

// mongoose.set('useFindAndModify', false); DEPRECRATED 
// use instead mongoose.connect(CONNECTION_URL).then(()=>{console.log('...')})
// https://stackoverflow.com/questions/69030963/error-usefindandmodify-is-an-invalid-option