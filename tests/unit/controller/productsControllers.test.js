const sinon = require('sinon');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const productsService = require('../../../services/productsService');
;
const productsController = require('../../../controllers/productsControllers');
const { makeRes } = require('./utils');

chai.use(chaiAsPromised);


describe('controllers/productsController', () => {
  beforeEach(sinon.restore);

  describe('listAll', () => {
    it('Deve disparar um erro se productsService.list disparar um erro', () => {
      sinon.stub(productsService, 'list').rejects();
      return chai.expect(productsService.list({}, {})).to.eventually.be.rejected;
    });

    it('Deve chamar o status "200" e o res.json', async () => {
      const res = makeRes()
      sinon.stub(productsService, 'list').resolves([{ id: 1 }]);
      await productsController.listAll({}, res);
      return chai.expect(res.json.getCall(0).args[0]).to.deep.equal([{ id: 1 }]);
    });
  });

  describe('get', () => {
    it('Deve disparar um erro caso productsService.validateParams também dispare', () => {
      sinon.stub(productsService, 'validateParamsId').rejects();
      return chai.expect(productsController.get({}, {})).to.eventually.be.rejected;
    });
    it('Deve disparar um erro caso productsService.checkExists também dispare', () => {
      sinon.stub(productsService, 'validateParamsId').resolves({});
      sinon.stub(productsService, 'checkExists').rejects();
      return chai.expect(productsController.get({}, {})).to.eventually.be.rejected;
    });
    it('Deve disparar um erro caso productsService.get também dispare', () => {
      sinon.stub(productsService, 'validateParamsId').resolves({});
      sinon.stub(productsService, 'checkExists').resolves();
      sinon.stub(productsService, 'get').rejects();
      return chai.expect(productsController.get({}, {})).to.eventually.be.rejected;
    });
    it('Deve chamar o status "200" e o res.json', async () => {
      sinon.stub(productsService, 'validateParamsId').resolves({});
      sinon.stub(productsService, 'checkExists').resolves();
      sinon.stub(productsService, 'get').resolves({ id: 1 });
      const res = makeRes();
      await productsController.get({}, res);
      return chai.expect(res.json.getCall(0).args[0]).to.deep.equal({ id: 1 });
    });
  });

  describe('add', () => {
    it('Deve disparar um erro caso productsService.validateBodyAdd também dispare', () => {
      sinon.stub(productsService, 'validateBodyAdd').rejects();
      return chai.expect(productsController.add({}, {})).to.eventually.be.rejected;
    });
    it('Deve disparar um erro caso productsService.add também dispare', () => {
      sinon.stub(productsService, 'validateBodyAdd').resolves();
      sinon.stub(productsService, 'add').rejects()
      return chai.expect(productsController.add({}, {})).to.eventually.be.rejected;
    });
    it('Deve disparar um erro caso productsService.get tambem dispare', () => {
      sinon.stub(productsService, 'validateBodyAdd').resolves();
      sinon.stub(productsService, 'add').resolves();
      sinon.stub(productsService, 'get').rejects();
      return chai.expect(productsController.add({}, {})).to.eventually.be.rejected;
    });
    it('Deve chamar o res.status com 201 e o res.json', async () => {
      sinon.stub(productsService, 'validateBodyAdd').resolves();
      sinon.stub(productsService, 'add').resolves();
      sinon.stub(productsService, 'get').resolves({ id: 1 });
      const res = makeRes();
      await productsController.add({}, res);
      return chai.expect(res.json.getCall(0).args[0]).to.deep.equal({ id: 1 });
    });
  });

  describe('edit', () => {
    it('DEve disparar um erro caso productsService.validateParamsId também dispare', () => {
      sinon.stub(productsService, 'validateParamsId').rejects();
      sinon.stub(productsService, 'validateBodyAdd').resolves();
      return chai.expect(productsController.edit({}, {})).to.eventually.be.rejected;
    });
    it('Deve disparar um erro caso productsService.validateBodyAdd também dispare', () => {
      sinon.stub(productsService, 'validateParamsId').resolves();
      sinon.stub(productsService, 'validateBodyAdd').rejects();
      return chai.expect(productsController.edit({}, {})).to.eventually.be.rejected;
    });
    it('Deve disparar um erro caso productsService.checkExists também dispare', () => {
      sinon.stub(productsService, 'validateParamsId').resolves();
      sinon.stub(productsService, 'validateBodyAdd').resolves();
      sinon.stub(productsService, 'checkExists').rejects();
      return chai.expect(productsController.edit({}, {})).to.eventually.be.rejected;
    });
    it('Deve disparar um erro caso productsService.edit também dispare', () => {
      sinon.stub(productsService, 'validateParamsId').resolves();
      sinon.stub(productsService, 'validateBodyAdd').resolves();
      sinon.stub(productsService, 'checkExists').resolves();
      sinon.stub(productsService, 'edit').rejects();
      return chai.expect(productsController.edit({}, {})).to.eventually.be.rejected;
    });
    it('Deve disparar um erro caso productsService.get também dispare', () => {
      sinon.stub(productsService, 'validateParamsId').resolves();
      sinon.stub(productsService, 'validateBodyAdd').resolves();
      sinon.stub(productsService, 'checkExists').resolves();
      sinon.stub(productsService, 'edit').resolves();
      sinon.stub(productsService, 'get').rejects();
      return chai.expect(productsController.edit({}, {})).to.eventually.be.rejected;
    });
    it('Deve retornar o objeto casto tenha sucesso', async () => {
      sinon.stub(productsService, 'validateParamsId').resolves({id: 1});
      sinon.stub(productsService, 'validateBodyAdd').resolves();
      sinon.stub(productsService, 'checkExists').resolves();
      sinon.stub(productsService, 'edit').resolves();
      sinon.stub(productsService, 'get').resolves({});
      const res = makeRes();
      await productsController.edit({}, res);
      return chai.expect(res.json.getCall(0).args[0]).to.deep.equal({});
    });
  });

  describe('remove', () => {
    it('Deve disparar um erro caso productsService.validateParamsID também dispare', () => {
      sinon.stub(productsService, 'validateParamsId').rejects();
      return chai.expect(productsController.remove({}, {})).to.eventually.be.rejected;
    });
    it('Deve disparar um erro caso productsService.checkExists também dispare', () => {
      sinon.stub(productsService, 'validateParamsId').resolves();
      sinon.stub(productsService, 'checkExists').rejects()
      return chai.expect(productsController.remove({}, {})).to.eventually.be.rejected;
    });
    it('Deve disparar um erro caso productsService.remove também dispare', () => {
      sinon.stub(productsService, 'validateParamsId').resolves();
      sinon.stub(productsService, 'checkExists').resolves();
      sinon.stub(productsService, 'remove').rejects();
      return chai.expect(productsController.remove({}, {})).to.eventually.be.rejected;
    });
    it('Deve chamar o res.sendStatus com o satus 204 caso sucess', async () => {
      sinon.stub(productsService, 'validateParamsId').resolves({id: 1});
      sinon.stub(productsService, 'checkExists').resolves();
      sinon.stub(productsService, 'remove').resolves();
      const res = makeRes();
      await productsController.remove({}, res);
      return chai.expect(res.sendStatus.getCall(0).args[0]).to.equal(204);
    });
  });
});