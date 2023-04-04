
const express = require('express');
const cors = require('cors');
const app = express();
const search  = require('./Router/search');
const tracker = require('./Router/tracker');


require('dotenv').config();

app.use(cors());
app.use(express.json());
app.use('/search', search);
app.use('/download', tracker);


app.listen(8080, () => {
    console.log('listening 8080')
})




