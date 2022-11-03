const express = require('express');
const app = express()
const path = require('path')

app.use(express.static(path.resolve(__dirname, '../dist')));

app.get('/', function (req, res) {
    const absolutePathToHtmlFile = path.resolve(__dirname, '../dist/main.html')
    res.sendFile(absolutePathToHtmlFile)
});

app.get('/learnwithviktor', function (req, res) {
    const absolutePathToHtmlFile = path.resolve(__dirname, '../dist/learnwithviktor.html')
    res.sendFile(absolutePathToHtmlFile)
});

app.listen(3000, function () {
    console.log('Application is running on http://localhost:3000/')
})
