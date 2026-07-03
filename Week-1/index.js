import express from 'express';
import userRoutes from './routes/userRoutes.js';

const app = express();
const PORT = 3000;


app.use(express.json());


app.use('/users', userRoutes);

app.listen(PORT, () => {
    console.log(`Stateless server running on http://localhost:${PORT}`);
});
