const sinon = require('sinon');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const productsService = require('../../../services/productsService');
const { PRODUCTS_LIST } = require('../../utilits/constants');
const { expect } = require('chai');
const { listAll } = require('../../../controllers/productsControllers');
const productsController = require('../../../controllers/productsControllers');
const { NotFoundError } = require('../../../middlewares/errors');

chai.use(chaiAsPromised);


describe('controllers/productsController', () => {
  const response = {};
  const request = {};

  // beforeEach(sinon.restore);
  beforeEach(() => {
    sinon.restore();
    response.status = sinon.stub().returns(response);
    response.json = sinon.stub().returns();
  })

  describe('listAll', () => {
    before(() => {  
      sinon.stub(productsService, 'list').resolves({ PRODUCTS_LIST });
    });

    it('Deve disparar um erro se productsService disparar um erro', () => {
      sinon.stub(productsService, 'list').rejects();
      return chai.expect(productsService.list()).to.eventually.be.rejected;
    });

    it('Deve retornar o status "200" quando for bem sucedido', async () => {
      await productsController.listAll(request, response);
      expect(response.status.calledWith(200)).to.be.equal(true);
    });
    it('Deve retornar uma lista de produtos', async () => {
      await productsController.listAll(request, response);
      expect(response.json.calledWith(sinon.match.array)).to.be.equal(true)
    })
  });

  describe('get', () => {
    beforeEach(() => {
      sinon.stub(productsService, 'get').resolves({})
    });
    it('Deve disparar um erro se validateParamsID disparar um erro', () => {
      sinon.stub(productsService, 'validateParamsId').rejects();
      return chai.expect(productsService.validateParamsId(1)).to.eventually.be.rejected;
    });
    it('Deve retornar o status "200" quando for bem sucedido', async () => {
      sinon.stub(productsService, 'validateParamsId').resolves(1);
      sinon.stub(productsService, 'checkNotExists').resolves(undefined);
      await productsController.get(request, response);
      expect(response.status.calledWith(200)).to.be.equal(true);
    });
    it('Deve ser chamado o método "json" passando um objeto', async () => {
      sinon.stub(productsService, 'validateParamsId').resolves(1);
      sinon.stub(productsService, 'checkNotExists').resolves(undefined);
      await productsController.get(request, response);
      expect(response.json.calledWith(sinon.match.object)).to.be.equal(true)
    });
  });

  describe('add', () => {
    beforeEach(() => {
      sinon.stub(productsService, 'get').resolves({})
    });
    it('Deve disparar um erro se validateBodyAdd disparar um erro', () => {
      sinon.stub(productsService, 'validateBodyAdd').rejects();
      return chai.expect(productsService.validateBodyAdd({})).to.eventually.be.rejected;
    });
    it('Deve retornar o status "200" quando for bem sucedido', async () => {
      sinon.stub(productsService, 'validateBodyAdd').resolves();
      sinon.stub(productsService, 'add').resolves(1);
      await productsController.add(request, response);
      expect(response.status.calledWith(201)).to.be.equal(true);
    });
    it('Deve ser chamado o método "json" passando um objeto', async () => {
      sinon.stub(productsService, 'validateBodyAdd').resolves();
      sinon.stub(productsService, 'add').resolves(1);
      await productsController.add(request, response);
      expect(response.json.calledWith(sinon.match.object)).to.be.equal(true)
    });
  });
});