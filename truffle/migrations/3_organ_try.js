const OrganTry = artifacts.require('OrganTry');

module.exports = function (_deployer) {
  // Use deployer to state migration tasks.
  _deployer.deploy(OrganTry);
};
