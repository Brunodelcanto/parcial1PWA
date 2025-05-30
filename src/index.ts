import express from 'express';
import cors from 'cors';
import routes from './routes/index';
import "dotenv/config";

const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/",(req,res)=>{
    res.send("Hello World from Express");
});

app.use("/api", routes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});