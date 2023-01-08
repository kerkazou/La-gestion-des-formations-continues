const express = require('express')
const app = express()
require('dotenv').config();
const cors = require("cors");

// Connection to database
require('./config/db');
require('./models')

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'))

// Routers
// const { userPermission, authPermission } = require('./middlewares/Permission');
const authRoutes = require('./routes/authRoutes')
app.use('/api/auth', authRoutes)
const Routes = require('./routes/Routes')
app.use('/', Routes)
app.all('*', (req, res) => {
  res.send('Page not found');
})

// Port
const port = process.env.PORT || 1112;
app.listen(port, () =>
  console.log(`Server running on http://localhost:${port}`)
);

module.exports = app