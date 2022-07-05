const sinon = require('sinon');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const salesModel = require('../../../models/salesModel');
const salesService = require('../../../services/salesService');
const productsModel = require('../../../models/productsModel');
const { checkIfArrayOfIdsExists } = require('../../../services/salesService');
const { exist } = require('joi');
const { NotFoundError } = require('../../../middlewares/errors');

chai.use(chaiAsPromised);

describe('services/salesService', () => {
  beforeEach(sinon.restore);

  describe('list', () => {
    it('Deve disparar um erro caso salesModel.list dispare um erro', () => {
      sinon.stub(salesModel, 'list').rejects();
      return chai.expect(salesService.list()).to.eventually.be.rejected;
    });
    it('Deve retornar uma lista caso o db.execute retorne', () => {
      sinon.stub(salesModel, 'list').resolves([]);
      return chai.expect(salesService.list()).to.eventually.deep.equal([]);
    })
  });

  describe('add', () => {
    it('Deve disparar um erro caso salesMode.addSale dispare um erro', () => {
      sinon.stub(salesModel, 'addSale').rejects();
      return chai.expect(salesService.add(1)).to.eventually.be.rejected;
    });
    it('Deve disparar um erro caso salesMode.bulkAddBySale dispare um erro', () => {
      sinon.stub(salesModel, 'addSale').resolves();
      sinon.stub(salesModel, 'bulkAddBySale').rejects();
      return chai.expect(salesService.add(1)).to.eventually.be.rejected;
    });
    it('Deve retornar o id caso salesModel.addSale retorne o id', () => {
      sinon.stub(salesModel, 'addSale').resolves(1);
      sinon.stub(salesModel, 'bulkAddBySale').resolves();
      return chai.expect(salesService.add([{productId: 1}])).to.eventually.equal(1);
    });
  });

  describe('get', () => {
    it('Deve disparar um erro caso salesModel.get dispare um erro', () => {
      sinon.stub(salesModel, 'getBySaleId').rejects();
      return chai.expect(salesService.get(1))
        .to.eventually.be.rejected;
    });

    it('Deve retornar uma lista caso o db.execute retorne', () => {
      sinon.stub(salesModel, 'getBySaleId').resolves([]);
      return chai.expect(salesService.get(1)).to.eventually.deep.equal([]);
    });
  });
  
  describe('checkIfArrayOfIdsExists', () => {
    it('Deve disparar um erro caso productsModel.listAllIds dispare um erro', () => {
      sinon.stub(productsModel, 'listAllIds').rejects();
      return chai.expect(salesService.checkIfArrayOfIdsExists([])).to.eventually.be.rejected;
    });
    it('Deve disparar um erro "Product not found" caso no parâmetro "arrayOfIds" seja passado com um id inválido', () => {
      sinon.stub(productsModel, 'listAllIds').resolves([{ id: 1 }]);
      return chai.expect(checkIfArrayOfIdsExists([100])).to.eventually.be.rejectedWith('Product not found');
    });
    it('Deve retornar "undefined" caso o parâmetro "arrayOfIds" seja passado com um id válido', () => {
      sinon.stub(productsModel, 'listAllIds').resolves([{ id: 1 }]);
      return chai.expect(checkIfArrayOfIdsExists([1])).to.eventually.be.
        undefined;
    });
  });

  describe('checkExists', () => {
    it('Deve disparar um erro caso salesModel.exists também disparar', () => {
      sinon.stub(salesModel, 'exists').rejects();
      return chai.expect(salesService.checkExists(0)).to.eventually.be.rejected;
    });
    it('Deve disparar um NOTFOUNDERROR caso salesModel retorne false', () => {
      sinon.stub(salesModel, 'exists').resolves(false);
      return chai.expect(salesService.checkExists(0)).to.eventually.be.rejectedWith(NotFoundError);
    });
    it('Deve retornar caso salesModels retorner true', () => {
      sinon.stub(salesModel, 'exists').resolves(true);
      return chai.expect(salesService.checkExists(0)).to.eventually.be.undefined;
    });
  });

  describe('remove', () => {
    it('Deve disparar um erro caso salesModel.remove dispare um erro', () => {
      sinon.stub(salesModel, 'remove').rejects;
      return chai.expect(salesService.remove(1)).to.eventually.be.undefined;
    });
    it('Deve retornar undefined caso salesModel.remove remova o produto', () => {
      sinon.stub(salesModel, 'remove').resolves();
      return chai.expect(salesService.remove(1)).to.eventually.be.undefined;
    });
  });
});