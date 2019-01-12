'use strict';

//exports.DATABASE_URL = process.env.DATABASE_URL || 'mongodb://localhost/capstone';
exports.DATABASE_URL = process.env.DATABASE_URL || 'mongodb://admin:34excachilles@ds153824.mlab.com:53824/time-flies-db';
exports.TEST_DATABASE_URL = process.env.TEST_DATABASE_URL || 'mongodb://localhost:27017/tempTestDb';

exports.PORT = process.env.PORT || 8080;

exports.JWT_SECRET = process.env.JWT_SECRET || 'mytestkey';
exports.JWT_EXPIRY = process.env.JWT_EXPIRY || '7d';