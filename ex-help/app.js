const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const app = express();
const userRoutes = require('./routes/userRoutes');
const projectRoutes = require('./routes/projectRoutes');
const jobRoutes = require('./routes/jobRoutes');
const freelancerRoutes = require('./routes/freelancerRoutes');


const db = require('./config/mongooseconnection');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); 

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());

app.use('/', userRoutes);
app.use('/project', projectRoutes); 
app.use('/job', jobRoutes);
app.use('/', freelancerRoutes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
