const express = require('express')
const app = express()

const PORT = process.env.PORT || 3000


//route 

app.get('/', (req, res) => {
    res.send ("Welcome to Express sever api!");
});













app.listen(PORT, () => {console.log(`Server listening on port ${PORT}`)});