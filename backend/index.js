import express from 'express';
import postRoutes from './routes/postsRoutes.js';

const app = express();

app.use('/user', postRoutes)

app.use('/', (req, res) => res.status(200).json({ message: 'Hello World' }));

app.listen(3001, () => console.log('listening on port 3001'));