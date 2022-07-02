const sinon = require('sinon');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const productsModel = require('../../../models/productsModel');
const productsService = require('../../../services/productsService');
const { PRODUCTS_LIST } = require('../../utilits/constants');
const { NotFoundError } = require('../../../middlewares/errors');

chai.use(chaiAsPromised);


describe('services/productsService', () => {
  beforeEach(sinon.restore);

  describe('list', () => {
    it('Espera  que dispare um erro caso o MODEL dispare um erro', () => {
      sinon.stub(productsModel, 'list').rejects();
      return chai.expect(productsService.list()).to
        .eventually.be.rejected;
    });

    it('Espera que retorne um array de items com chaves "id" e "name"', async () => {
      sinon.stub(productsModel, 'list').resolves(PRODUCTS_LIST);
      const result = await productsService.list();
      return chai.expect(result).to.deep.equal(PRODUCTS_LIST);
    });
  });

  describe('get', () => {
    it('Espera que dispare um erro caso o model dispare um erro', () => {
      sinon.stub(productsModel, 'get').rejects();
      return chai.expect(productsService.get(1))
        .to.eventually.be.rejected;
    });

    it('Espera que retorne uma array de item com chaves "id" e "name"', async () => {
      sinon.stub(productsModel, 'get').resolves(PRODUCTS_LIST);
      const result = await productsService.get();
      return chai.expect(result).to.deep.equal(PRODUCTS_LIST);
    });
  });

  describe('add', () => {
    it('Espera que dispare um erro caso o model dispare um erro', () => {
      sinon.stub(productsModel, 'add').rejects();
      return chai.expect(productsService.add(1))
        .to.eventually.be.rejected;
    });
    it('Deve retornar o ID como um número', () => {
      sinon.stub(productsModel, 'add').resolves(1);
      return chai.expect(productsService.add(0)).to.eventually.be.equal(1);
    });
  });

  describe('checkNotExists', () => {
    it('deve disparar um erro se o model disparar um erro', () => {
      sinon.stub(productsModel, 'exists').rejects();
      chai.expect(productsService.checkNotExists(0))
        .to.eventually.be.rejected;
    });
    it('Deve disparar um erro NotFoundError se o model responder false', () => {
      sinon.stub(productsModel, 'exists').resolves(false);
      return chai.expect(productsService.checkNotExists(0))
        .to.eventually.be.rejectedWith(NotFoundError);
    });
    it('Deve resolver sem problemas se o model responder true', () => {
      sinon.stub(productsModel, 'exists').resolves(true);
      return chai.expect(productsService.checkNotExists(0))
        .to.eventually.be.undefined;
    });
  });
});