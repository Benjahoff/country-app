const express = require('express');
const app = express();
const countryRoutes = require('./src/routes/countryRoutes');
const cors = require('cors');

const allowedOrigins = [
  'http://localhost:3000'
]
app.use(express.json());


app.use(
  cors({
    origin: allowedOrigins
  })
);app.use('/api/countries', countryRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
