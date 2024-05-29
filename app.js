require('dotenv').config();

const cors = require('cors');
const express = require('express');
const bodayParser = require('body-parser');
const { pool } = require('./config/db');
const BrandRoute = require('./routes/brandRoutes');
const CategoryRoute = require('./routes/categoryRoutes');
const ProductRoute = require('./routes/productRoutes');
const AuthRoute = require('./routes/authRoutes');
const UserRoute = require('./routes/UserRoutes')

const app = express();
const port = process.env.PORT || 3002;

app.use(cors());
app.options('*', cors());

app.use(bodayParser.json());

app.use('/api', BrandRoute);
app.use('/api', CategoryRoute);
app.use('/api', ProductRoute);

app.use('/auth', AuthRoute);
app.use('/api/user', UserRoute);


// Serve uploaded image
app.use('/public/upload', express.static('public/upload'));


app.listen(port, ()=>{
  console.log(`Server is running on http://localhost:${port}`);
})


pool.connect()
.then(() => console.log('Connected to PostgreSQL database'))
.catch((error) => console.error('Error connecting to database', error));