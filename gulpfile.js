var gulp = require('gulp');
var gutil = require('gulp-util');
var ftp = require('vinyl-ftp');

var Client = require('ftp');
var fs = require('fs');


var user = process.env.FTP_USER;
var password = process.env.FTP_PWD;

if (!user || !password) {
    throw 'Username or password not provided!';
}

console.log(user + ':' + password);

gulp.task('deploy', function () {
    var remotePath = '/';

    var conn = ftp.create({
        host: 'ftp.mondal.in',
        user: user,
        password: password,
        log: gutil.log
    });

    var c = new Client({
        host: 'ftp.mondal.in',
        user: user,
        password: password,
        log: gutil.log
    });

    c.on('ready', function () {
        console.log('ftp: ready');
        c.put('package.json', function (err) {
            if (err) throw err;
            console.log('ftp: put');
            c.end();
        });
    });
    // connect to localhost:21 as anonymous 
    c.connect();

    gulp.src(['dist/**'], { base: '.', buffer: false })
        .pipe(conn.newer(remotePath))
        .pipe(conn.dest(remotePath));
});
