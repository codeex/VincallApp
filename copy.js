const fse = require('fs-extra');

fse.copySync(`${__dirname}/src/assets`, `${__dirname}/dist`);
