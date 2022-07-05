const sinon = require('sinon');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const salesService = require('../../../services/salesService');
const salesController = require('../../../controllers/salesController');
const { makeRes } = require('./utils');

chai.use(chaiAsPromised);

describe('controller/salesController', () => {
  beforeEach(sinon.restore);

  describe('listAll', () => {
    it('Deve disparar um erro se salesService.list disparar um erro', () => {
      sinon.stub(salesService, 'list').rejects();
      return chai.expect(salesService.list({}, {})).to.eventually.be.rejected;
    });
    it('Deve chamar o status "200" e o res.json', async () => {
      sinon.stub(salesService, 'list').resolves([{ id: 1 }]);
      const res = makeRes();
      await salesController.listAll({}, res);
      return chai.expect(res.json.getCall(0).args[0]).to.deep.equal([{ id: 1 }]);
    });
  });

  describe('get', () => {
    it('Deve disparar um erro caso salesService.valdiateParamsID também dispare', () => {
      sinon.stub(salesService, 'validateParamsId').rejects();
      return chai.expect(salesController.get({}, {})).to.eventually.be.rejected;
    });
    it('Deve disparar um erro caso salesService.checkExists também dispare', () => {
      sinon.stub(salesService, 'validateParamsId').resolves({});
      sinon.stub(salesService, 'checkExists').rejects();
      return chai.expect(salesController.get({}, {})).to.eventually.be.rejected;
    });
    it('Deve disparar um erro caso salesSErvice.get também dispare', () => {
      sinon.stub(salesService, 'validateParamsId').resolves({});
      sinon.stub(salesService, 'checkExists').resolves();
      sinon.stub(salesService, 'get').rejects();
      return chai.expect(salesController.get({}, {})).to.eventually.be.rejected;
    });
    it('Deve chamar o status "200" e o res.jsjon', async () => {
       sinon.stub(salesService, 'validateParamsId').resolves({});
      sinon.stub(salesService, 'checkExists').resolves();
      sinon.stub(salesService, 'get').resolves({ id: 1 });
      const res = makeRes();
      await salesController.get({}, res);
      return chai.expect(res.json.getCall(0).args[0]).to.deep.equal({id: 1})
    });
  });

  describe('addSale', () => {
    it('Deve disparar um erro caso salesService.valdiateBodyAdd também dispare', () => {
      sinon.stub(salesService, 'validateBodyAdd').rejects();
      return chai.expect(salesController.addSale({}, {})).to.eventually.be.rejected;
    });
    it('Deve disparar um erro caso salesService.checkIfArrayOfIdsExists também dispare', () => {
      sinon.stub(salesService, 'validateBodyAdd').resolves([{ productId: 1 }]);
      sinon.stub(salesService, 'checkIfArrayOfIdsExists').rejects();
      return chai.expect(salesController.addSale({}, {})).to.eventually.be.rejected;
    });
    it('Deve disparar um erro caso salesService.add também dispare', () => {
      sinon.stub(salesService, 'validateBodyAdd').resolves([{ productId: 1 }]);
      sinon.stub(salesService, 'checkIfArrayOfIdsExists').resolves();
      sinon.stub(salesService, 'add').rejects();
      return chai.expect(salesController.addSale({}, {})).to.eventually.be.rejected;
    });
    it('Deve chamar o res.status com 201 e o res.json', async () => {
      sinon.stub(salesService, 'validateBodyAdd').resolves([{ productId: 1 }]);
      sinon.stub(salesService, 'checkIfArrayOfIdsExists').resolves();
      sinon.stub(salesService, 'add').resolves(1);
      const res = makeRes();
      await salesController.addSale({}, res);
      return chai.expect(res.json.getCall(0).args[0]).to.deep.equal({ id: 1, itemsSold: [{ productId: 1 } ]});
    });
  });
});