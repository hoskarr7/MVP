const common = [
  '--require-module ts-node/register',
  '--require support/**/*.ts',
  '--require features/step-definitions/**/*.ts',
  '--format progress-bar',
  '--format html:reports/cucumber-report.html',
  '--format json:reports/cucumber-report.json',
].join(' ');

module.exports = {
  default: common,
};
