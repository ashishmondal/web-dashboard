const gulp = require('gulp');
const gutil = require('gulp-util');
const GulpSSH = require('gulp-ssh');

const host = process.env.SSH_HOST;
const user = process.env.SSH_USER;
const key = process.env.SSH_KEY;

const config = {
  host: host,
  port: 22,
  username: user,
  privateKey: key
};

const gulpSSH = new GulpSSH({
  ignoreErrors: false,
  sshConfig: config
});

gulp.task('deploy', function () {
  return gulp
    .src(['dist/**'])
    .pipe(gulpSSH.dest('/opt/bitnami/apache2/htdocs'))
});
