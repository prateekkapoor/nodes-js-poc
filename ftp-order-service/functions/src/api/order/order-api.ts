import * as functions from 'firebase-functions';
import * as express from 'express';
import * as bodyParser from "body-parser";
import firebase from '../../config/config';

const app = express();
const main = express();

main.use('/v1', app);
main.use(bodyParser.json());
main.use(bodyParser.urlencoded({ extended: false }));

export const orderAPI = functions.https.onRequest(main);

// Add new order
app.post('/order', (req, res) => {
    const order = req.body;
    const now = new Date();
    const storeId = req.body.storeId;
    const key = `${storeId} - ${now.toISOString().replace(".", "_")}`
    order['creationTime'] = new Date();
    return firebase.database().ref(`/j&j/orders/${storeId}/${key}`).
        push(order).then(success => {
            res.send('order is created successfully');
        })
})

export default main;
