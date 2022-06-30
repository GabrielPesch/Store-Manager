const sinon = require('sinon');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const db = require('../../../models/connection');
const productsModel = require('../../../models/productsModel');
const { PRODUCTS_LIST } = require('../utilits/constants');


chai.use(chaiAsPromised);


describe('models/productsModel', () => {
  beforeEach(sinon.restore);

  describe('list', () => {
    it('Deve disparar um erro caso o mysql rejeite a query', () => {
      sinon.stub(db, 'execute').rejects();
      chai.expect(productsModel.list()).to.eventually.be.rejected;
    });

    it('Deve retornar a lista de todos os produtos', () => {
      sinon.stub(db, 'execute').resolves(PRODUCTS_LIST);
      chai.expect(productsModel.list()).to
        .eventually.be.deep.equal(PRODUCTS_LIST);
    });
  });
});