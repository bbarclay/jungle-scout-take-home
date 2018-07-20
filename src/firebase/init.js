import firebase from 'firebase';
import firestore from 'firebase/firestore';

const fbConfig = require('../../.runtimeconfig.json').fb_init;

const config = {
  apiKey: fbConfig.api_key,
  authDomain: fbConfig.auth_domain,
  databaseURL: fbConfig.database_url,
  projectId: fbConfig.project_id,
  storageBucket: fbConfig.storage_bucket,
  messagingSenderId: fbConfig.message_sender_id,
}

const firebaseApp = firebase.initializeApp(config);

firebaseApp.firestore().settings({ timestampsInSnapshots: true });

export default firebaseApp.firestore();
