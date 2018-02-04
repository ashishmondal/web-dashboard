const gulp = require('gulp');
const gutil = require('gulp-util');
const ftp = require('vinyl-ftp');

const host = process.env.FTP_HOST;
const user = process.env.FTP_USER;
const password = process.env.FTP_PASSWORD;

if (!host || !user || !password) {
  throw 'FTP credentials not provided!';
}

console.log(`${user}:${password}@${host}`);

gulp.task('deploy', function () {
  const remotePath = '/';

  const conn = ftp.create({
    host: '',
    user: user,
    password: password,
    log: gutil.log
  });

  gulp.src(['dist/**'], {
      base: 'dist',
      buffer: false
    })
    .pipe(conn.newer(remotePath))
    .pipe(conn.dest(remotePath));
});
