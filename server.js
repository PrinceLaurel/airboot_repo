const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const Airtable = require('airtable');

const app = express();
const base = new Airtable({ apiKey: 'patlKBlqPGg6xh4rQ.e68f2d76aeab7d268c50cfbdfaf55085417d8be4a87c718c12cef5d9f21aad9d' }).base('apprHL0OZkQaPWmSd')

app.use(bodyParser.json());
app.use(express.static('public'));

app.get('/', (req,res) => {
    res.sendFile('index');
});

app.get('/data', (req,res) => {
    fs.readFile('data.json', 'utf-8', (err, data) => {
        res.json(JSON.parse(data));
    } );
});

app.get('/contacts', (req, res) => {
    let contacts = [];

    base('Contacts').select({
        view: 'Grid view'
    }).eachPage((records, fetchNextPage) => {
        records.forEach(record => {
            contacts.push({
                id: record.id,
                name: record.get('Name'),
                email: record.get('Email')
            });
        });
        fetchNextPage();
    }, (err) => {
        if (err) {
            console.error(err);
            res.status(500).send('Server error');
            return;
        }
        res.json(contacts);
    });
});

app.listen(4242, () => {
    console.log('Server up and running on 4242');
});
