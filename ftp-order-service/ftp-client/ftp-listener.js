const FtpWatcher = require('ftp-watcher');
var Client = require('ftp');
var fs = require('fs');
const { Storage } = require('@google-cloud/storage');
const ftpCredentials = {
    host: '0.0.0.0',
    //port: 1111
    //user: 'prateekk',
    //password: ''
}
const PROJECT_ID = "seismic-box-2116";
const bucketName = 'ftp_demo';
// Creates a client
const storage = new Storage({
    projectId: PROJECT_ID,
    keyFilename: '../serviceAccountKey.json'
});

const speedtestWatcher = new FtpWatcher({
    ftpCredentials: ftpCredentials,
    cron: '*/10 * * * * *',
    fileExtension: '.csv', // optional
    // fileNameContains: 'GB' // optional
})

speedtestWatcher.on('error', handleError)
speedtestWatcher.on('snapshot', handleSnapshot)

function handleSnapshot(snapshot) {
    console.log(snapshot)
    downloadFile(snapshot);
}

function handleError(error) {
    console.error(error)
}
speedtestWatcher.watch()

function downloadFile(snapshot) {
    var c = new Client({
        host: '0.0.0.0',
        //port: 1111
        //user: 'prateekk',
        //password: ''
    });
    c.on('ready', function () {
        for (let key in snapshot) {
            if (snapshot[key].includes("processed")) {
                continue;
            }
            c.get(snapshot[key], function (err, stream) {
                if (err) throw err;
                stream.once('close', function () { c.end(); });
                stream.pipe(fs.createWriteStream(`order-${key}.csv`));
                c.rename(snapshot[key], `./processed/${Date.now()}-${snapshot[key]}`, error => {
                    if (error != null) {
                        console.log(error);
                    } else {
                        console.log('file processed to' + `./processed/${Date.now()}-${snapshot[key]}`);
                    }
                })
                console.log(`order-${key}.csv`);
                uploadFile(`order-${key}.csv`)
            });
        }
    });
    // connect to localhost:21 as anonymous
    c.connect();
}
function uploadFile(fileName) {
    let bucket = storage.bucket(`${bucketName}`)
    bucket.upload(fileName, { destination: "/orders/order123-" + Date.now() + '.csv' }, (err, file) => {
        if (err != null) {
            console.log(err);
        } else {
            console.log('file uploaded successfully....' + fileName);
            deleteFile(fileName)
        }
    });
}
function deleteFile(fileName) {
    fs.stat(fileName, function (err, stats) {
        console.log(stats);

        if (err) {
            return console.error(err);
        }

        fs.unlink(fileName, function (err) {
            if (err) return console.log(err);
            console.log('file deleted successfully');
        });
    })
}
