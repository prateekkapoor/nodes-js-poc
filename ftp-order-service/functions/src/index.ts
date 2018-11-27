import * as functions from 'firebase-functions';

import order from './api/order/order-api';
import preferenceCards from './pre-order/preference-card/preference-card';

export const orderAPI = functions.https.onRequest(order);

export const createPreferenceCards = functions.storage.bucket('ftp_demo').object().onFinalize((event) => { preferenceCards(event) });

