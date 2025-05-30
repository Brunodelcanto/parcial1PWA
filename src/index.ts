import express from 'express';
import cors from 'cors';
import routes from './routes/index';
import "dotenv/config";
import connectDB from './database';

const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

console.log("🔍 URI de conexión:", process.env.MONGO_URI);

connectDB();

app.get("/",(req,res)=>{
    res.send("Hello World from Express");
});

app.use("/api", routes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});