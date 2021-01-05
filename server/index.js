const express = require('express');

const authRoutes = require('./routes/auth');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = process.env.PORT || 5000;
const baseURL = '/bloggy';

app.use(express.json());
app.use(cookieParser());
app.use(`${baseURL}/auth`, authRoutes);

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
