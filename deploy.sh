#!/bin/sh
HOST='ftp.mondal.in'
USER='dashboard@mondal.in'
PASSWD='6Hr2^CqXMD2A6%qA'
FILE='*'

cd dist
ftp -n $HOST <<END_SCRIPT
quote USER $USER
quote PASS $PASSWD
ascii
prompt
mput $FILE
quit
END_SCRIPT
cd ..
exit 0