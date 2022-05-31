const fse = require("fs-extra");
const path = require("path");

fse.copySync(
  `${__dirname}/package.json`,
  `${__dirname}/extension/package.json`
);

fse.copySync(
  `${__dirname}/README.md`,
  `${__dirname}/extension/README.md`
);

fse.copySync(
  `${__dirname}/src/pages/topbar`,
  `${__dirname}/extension/topbar`
);

fse.copySync(
  `${__dirname}/src/pages/manifest.json`,
  `${__dirname}/extension/manifest.json`
);