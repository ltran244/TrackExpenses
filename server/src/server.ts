import express from 'express';
import authRouter from './routes/auth';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;

(async () => {
    try {
        app.use(cors({
            origin: 'http://localhost:5173',
            credentials: true
        }));
        app.use(express.json());
        app.use(express.urlencoded({ extended: true }));
        app.use("/auth", authRouter);
        app.listen(PORT, () => {
            console.log(`Server is successfully running on port ${PORT}`);
        });
    } catch (error) {
        console.error("Fatal error during startup:", error);
        process.exit(1);
    }
})();
