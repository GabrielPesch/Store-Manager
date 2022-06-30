const sinon = require('sinon');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const productsModel = require('../../../models/productsModel');
const productsService = require('../../../services/productsService');
const { PRODUCTS_LIST } = require('../utilits/constants');

chai.use(chaiAsPromised);


describe('services/productsService', () => {
  beforeEach(sinon.restore);

  describe('list', () => {
    it('Espera  que dispare um erro caso o MODEL dispare um erro', () => {
      sinon.stub(productsModel, 'list').rejects();
      chai.expect(productsService.list()).to
        .eventually.be.rejected;
    });

    it('Espera que retorne um array de items com chaves "id" e "name"', async () => {
      sinon.stub(productsModel, 'list').resolves(PRODUCTS_LIST);
      const result = await productsService.list();
      chai.expect(result).to.deep.equal(PRODUCTS_LIST);
    });
  });

  describe('get', () => {
    it('Espera que dispare um erro caso o model dispare um erro', () => {
      sinon.stub(productsModel, 'get').rejects();
      chai.expect(productsService.get(1)).to
        .eventually.be.rejected;
    });

    it('Espera que retorne uma array de item com chaves "id" e "name"', async () => {
      sinon.stub(productsModel, 'get').resolves(PRODUCTS_LIST);
      const result = await productsService.get();
      chai.expect(result).to.deep.equal(PRODUCTS_LIST);
    });
  });
});