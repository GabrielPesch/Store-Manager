const sinon = require('sinon');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const productsService = require('../../../services/productsService');
const { PRODUCTS_LIST } = require('../utilits/constants');
const { expect } = require('chai');
const { listAll } = require('../../../controllers/productsControllers');
const productsController = require('../../../controllers/productsControllers');

chai.use(chaiAsPromised);

describe('controllers/productsController', () => {
  beforeEach(sinon.restore);

  describe('listAll', () => {
    const response = {};
    const request = {};

    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
        
      sinon.stub(productsService, 'list').resolves({ PRODUCTS_LIST });
    });

    it('Deve disparar um erro se productsService disparar um erro', () => {
      sinon.stub(productsService, 'list').rejects();
      chai.expect(productsService.list()).to.eventually.be.rejected;

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
});