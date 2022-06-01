const fse = require("fs-extra");
const path = require("path");

fse.copySync(`${__dirname}/src/pages/topbar`, `${__dirname}/dist/topbar`);

fse.copySync(
  `${__dirname}/src/pages/manifest.json`,
  `${__dirname}/dist/manifest.json`
);

fse.copySync(`${__dirname}/src/assets`, `${__dirname}/dist`);
