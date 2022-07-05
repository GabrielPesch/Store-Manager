const sinon = require('sinon');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const salesModel = require('../../../models/salesModel');
const salesService = require('../../../services/salesService');
const productsModel = require('../../../models/productsModel');
const { checkIfArrayOfIdsExists } = require('../../../services/salesService');

chai.use(chaiAsPromised);

describe('services/salesService', () => {
  beforeEach(sinon.restore);

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
});