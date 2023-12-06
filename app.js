const express = require('express');
require('dotenv').config();
const cors = require('cors')
const morgan = require('morgan')
const PORT = process.env.PORT || 5000;
const openaiRoutes = require('./routes/openAiRoutes')

const app = express();

// middlewares
app.use(express.json())
app.use(cors())
app.use(morgan('dev'))

app.use('/openai', openaiRoutes)

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`)
})

