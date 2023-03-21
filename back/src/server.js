const express = require('express');
const cors = require('cors');
const { PORT } = require('./config');

const app = express();

// route imports
const { authRoutes } = require('./routes/authRoute');
const { accountsRoutes } = require('./routes/accountsRoute');
const { billsRoutes } = require('./routes/billsRoute');
const { groupsRoutes } = require('./routes/groupsRoute');

// middleware
app.use(cors());
app.use(express.json());

// routes
app.use('/auth', authRoutes);
app.use('/accounts', accountsRoutes);
app.use('/bills', billsRoutes);
app.use('/groups', groupsRoutes);

app.all('*', (req, res) => {
  res.status(404).send('404 Not Found');
});

app.listen(PORT, () => {
  console.log('Server is running on ', PORT);
});
