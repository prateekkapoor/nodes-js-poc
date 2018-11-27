import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

const firebase = admin.initializeApp(functions.config().firebase);

export default firebase;