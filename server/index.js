import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path'

import bookRoutes from './routes/Books.js';
import myBooksRoutes from './routes/MyBooks.js';
import userRouter from "./routes/User.js";
import pageRouter from './routes/Page.js'
import pagesRouter from './routes/Pages.js'

const app = express();

const __dirname = path.resolve(path.dirname(''));

app.use(express.static(path.join(__dirname, 'build')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors());

app.use('/api/books', bookRoutes);
app.use('/api/my_books', myBooksRoutes);
app.use("/api/users", userRouter);
app.use('/api/page', pageRouter)
app.use('/api/pages', pagesRouter)

const CONNECTION_URL = 'mongodb+srv://aadi:pratilipi@bookworm.ysrch.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const PORT = process.env.PORT|| 5000;

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
  .catch((error) => console.log(`${error} did not connect`));

mongoose.set('useFindAndModify', false);