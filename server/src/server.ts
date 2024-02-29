import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'
import connectDb from './config/dbconfig';

import routes from './routes/routes'

dotenv.config();

connectDb();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}));

app.use("/api/", routes);

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server is listening in port ${port}`);
})
