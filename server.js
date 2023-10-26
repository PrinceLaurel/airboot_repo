const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const Airtable = require('airtable');

const app = express();
//const base = new Airtable({ apiKey: 'patShrnb94DMI7BFw.5c79b99efb239663bc9d29e8075aaf9ce8483229d43ffc908ccbf65ee3f24ff0' }).base('appSO4a0KYEfoNwQT')
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

app.post('/contacts', (req,res)=>{
    base('contacts').create(req.body, function(err, record) {
        if (err) {
          console.error(err);
          return;
        }
        res.json({
            id: record.getId(),
            fields: record.fields
        });
      });
});

app.delete('/contacts/:id', async (req, res) => {
    const id = req.params.id;
    console.log('Asked to deleted: ' + id);

    try {
        await base('contacts').destroy(id, (err, deletedRecord) => {
            if (err) {
                console.error(err);
                res.status(500).send('Server Error');
                return;
            }
            console.log('Airtable confirmed deletion of: ' + deletedRecord.id);
            res.json({ deletedRecordId: deletedRecord.id });
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});

app.listen(4242, () => {
    console.log('Server up and running on 4242');
});
