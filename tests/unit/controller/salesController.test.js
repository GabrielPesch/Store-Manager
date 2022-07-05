const sinon = require('sinon');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const salesService = require('../../../services/salesService');
const salesController = require('../../../controllers/salesController');
const { makeRes } = require('./utils');

chai.use(chaiAsPromised);

describe('controller/salesController', () => {
  beforeEach(sinon.restore);

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