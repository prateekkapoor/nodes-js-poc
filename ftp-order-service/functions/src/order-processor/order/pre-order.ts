import firebase from '../../config/config';

const csv = require('csvtojson');
const { Storage } = require('@google-cloud/storage');

const PROJECT_ID = "seismic-box-2116";
// Creates a client
const storage = new Storage({
    projectId: PROJECT_ID,
    keyFilename: '/home/prateekk/source_code/order-service/serviceAccountKey.json'
});

const createPreferenceCard = (event) => {
    console.log("inside method...")
    storage
        .bucket(event.bucket)
        .file(event.name)
        .download().then(contents => {
            console.log("data: " + contents.toString('utf-8'));
            return contents.toString('utf-8');
        })
        .then(data => csv().fromString(data))
        .then((csvRow) => {
            console.log("csvRow:" + csvRow)
            return csvRow;
        })
        .then((jsonData) => {
            var ref = firebase.database().ref('/orders/');
            ref.push(jsonData);
            return;
        })
        .catch(e => console.log(e));
    return 0;
}

export default createPreferenceCard;
