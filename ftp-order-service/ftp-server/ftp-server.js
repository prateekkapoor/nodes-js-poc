const FtpSvr = require('ftp-srv');
const hostname = '0.0.0.0';
const port = 1111;

const ftpServer = new FtpSvr('ftp://' + hostname + ':' + port,
    { anonymous: true, greeting: ["Hello", "Welcome"] });

ftpServer.listen()
    .then(() => {
        console.log(`Server running at http://${hostname}:${port}/`);
    });

ftpServer.on('login', (data, resolve, reject) => {
    console.log('connection: ' + data);
    console.log('resolve: ' + resolve);
    console.log('reject: ' + reject);

    resolve({ root: '/home/prateekk/source_code/ftp/ftpfiles' });
});