const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.9ozwr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        await client.connect();
        const activityCollection = client.db('volunteer').collection('activity');

        app.get('/', (req, res) => {
            res.send('Volunteers server is running.......');
        })

        app.get('/activity', async (req, res) => {
            const query = {};
            const cursor = activityCollection.find(query);
            const activity = await cursor.toArray();

            res.send(activity);
        });

        app.post('/activity', async (req, res) => {
            const activity = req.body;
            console.log(activity);
            const result = activityCollection.insertOne(activity);
            res.send(result);
        })

    }
    finally {

    }
}

run().catch(console.dir);



app.listen(port, () => {
    console.log('Volunteers running at port-', port);
})