import express from 'express';
import postRoutes from './routes/postsRoutes.js';
import userRoutes from './routes/userRoutes.js';
import loginRoutes from './routes/loginRoutes.js';

const app = express();

app.use(express.json());

app.use('/user', userRoutes);
app.use('/post', postRoutes);
app.use('/login', loginRoutes);

app.use('/', (req, res) => res.status(200).json({ message: 'Hello World' }));

app.listen(3001, () => console.log('listening on port 3001'));