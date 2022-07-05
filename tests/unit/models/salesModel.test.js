const sinon = require('sinon');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const db = require('../../../models/connection');
const salesModel = require('../../../models/salesModel');

chai.use(chaiAsPromised);

describe('models/salesModel', () => {
  beforeEach(sinon.restore);

  describe('addSale', () => {
    it('Deve disparar um erro caso o MYSQL dispare um erro', () => {
      sinon.stub(db, 'execute').rejects();
      return chai.expect(salesModel.addSale()).to.eventually.be.rejected;
    });
    it('Deve disparar um erro caso o mysql não retorne um array', () => {
      sinon.stub(db, 'execute').resolves([]);
      return chai.expect(salesModel.addSale()).to.eventually.be.rejected;
    });
    it('Deve retornar undefined se não encontrar o item', () => {
      sinon.stub(db, 'execute').resolves([[]]);
      return chai.expect(salesModel.addSale()).to.eventually.be.undefined;
    });
    it('Deve retornar um objeto se encontrar o item', () => {
      sinon.stub(db, 'execute').resolves([{}]);
      return chai.expect(salesModel.addSale()).to.eventually.be.undefined;
    });
  });

  describe('bulkAddBySale', () => {
    it('Deve disparar um erro caso o MYSQL dispare um erro', () => {
      sinon.stub(db, 'query').rejects();
      return chai.expect(salesModel.bulkAddBySale(1)).to.eventually.be.rejected;
    });
    it('Deve disparar um erro caso o mysql não retorne um array', () => {
      sinon.stub(db, 'query').resolves([]);
      return chai.expect(salesModel.bulkAddBySale(1)).to.eventually.be.rejected;
    });
    it('deve retornar false se não encontrar o item', () => {
      sinon.stub(db, 'query').resolves([{}]);
      return chai.expect(salesModel.bulkAddBySale(1)).to.eventually.be.false;
    });

    it('deve retornar true se encontrar o item', () => {
      sinon.stub(db, 'query').resolves([{affectedRows: 1}]);
      return chai.expect(salesModel.bulkAddBySale(1)).to.eventually.be.true;
    });
  });

  describe('getBySaleId', () => {
    it('Deve disparar um erro caso o MYSQL dispare um erro', () => {
      sinon.stub(db, 'execute').rejects();
      return chai.expect(salesModel.getBySaleId(1)).to.eventually.be.rejected;
    });
    it('Deve retornar UNDEFINED caso o db.query não encontre nada', () => {
      sinon.stub(db, 'execute').resolves([]);
      return chai.expect(salesModel.getBySaleId(1)).to.eventually.be.undefined;
    });
    it('Deve retornar um objeto caso o db.query retorne um item', () => {
      sinon.stub(db, 'execute').resolves([{}]);
      return chai.expect(salesModel.getBySaleId(1)).to.eventually.be.deep.equal({});
    });
  });
});