const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

const nameRoute = require('./routes/nameRoute');
app.use('/', nameRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});