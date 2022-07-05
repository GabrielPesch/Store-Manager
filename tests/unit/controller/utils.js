const sinon = require('sinon');

const makeRes = () => {
  const res = {
    status: sinon.stub().callsFake(() => res),
    json: sinon.stub().returns(),
    sendStatus: sinon.stub().returns(),
  };
  return res;
};

module.exports = {
  makeRes,
};