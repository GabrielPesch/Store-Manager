const sinon = require('sinon');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const productsModel = require('../../../models/productsModel');
const productsService = require('../../../services/productsService');
const { NotFoundError } = require('../../../middlewares/errors');

chai.use(chaiAsPromised);


describe('services/productsService', () => {
  beforeEach(sinon.restore);

  describe('list', () => {
    it('Deve disparar um erro caso productsModel.list dispare um erro', () => {
      sinon.stub(productsModel, 'list').rejects();
      return chai.expect(productsService.list()).to
        .eventually.be.rejected;
    });
    it('Deve retornar uma lista caso o db.execute retorne', () => {
      sinon.stub(productsModel, 'list').resolves([]);
      return chai.expect(productsService.list()).to.eventually.deep.equal([]);
    });
  });

  describe('get', () => {
    it('Deve disparar um erro caso productsModel.get dispare um erro', () => {
      sinon.stub(productsModel, 'get').rejects();
      return chai.expect(productsService.get(1))
        .to.eventually.be.rejected;
    });

    it('Deve retornar uma lista caso o db.execute retorne', () => {
      sinon.stub(productsModel, 'get').resolves([]);
      return chai.expect(productsService.get(1)).to.eventually.deep.equal([]);
    });
  });

  describe('add', () => {
    it('Deve disparar um erro caso productsModel.add dispare um erro', () => {
      sinon.stub(productsModel, 'add').rejects();
      return chai.expect(productsService.add(1))
        .to.eventually.be.rejected;
    });
    it('Deve retornar um numero caso o db.execute retorne', () => {
      sinon.stub(productsModel, 'add').resolves(1);
      return chai.expect(productsService.add(0)).to.eventually.be.equal(1);
    });
  });

  describe('checkExists', () => {
    it('Deve disparar um erro caso productsModel também disparar', () => {
      sinon.stub(productsModel, 'exists').rejects();
      return chai.expect(productsService.checkExists(0))
        .to.eventually.be.rejected;
    });
    it('Deve disparar um erro caso productsModel retorne false', () => {
      sinon.stub(productsModel, 'exists').resolves(false);
      return chai.expect(productsService.checkExists(0))
        .to.eventually.be.rejectedWith(NotFoundError);
    });
    it('Deve retornar caso productsModel retorne true', () => {
      sinon.stub(productsModel, 'exists').resolves(true);
      return chai.expect(productsService.checkExists(0))
        .to.eventually.be.undefined;
    });
  });
});