const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const app = express();
const filePath = './Link.json';

app.use(bodyParser.json());
app.use(express.static('public'));

// Endpoint to update JSON
app.post('/update-json', (req, res) => {
    const { key, url, server, mb } = req.body;

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Error reading file.');
        }

        let jsonData = JSON.parse(data);
        jsonData[key] = { url, server, mb };

        fs.writeFile(filePath, JSON.stringify(jsonData, null, 4), (err) => {
            if (err) {
                return res.status(500).send('Error writing to file.');
            }
            res.send('JSON updated successfully.');
        });
    });
});

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
  
