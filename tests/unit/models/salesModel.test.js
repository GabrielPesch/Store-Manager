const sinon = require('sinon');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const db = require('../../../models/connection');
const salesModel = require('../../../models/salesModel');
chai.use(chaiAsPromised);

describe('models/salesModel', () => {
  beforeEach(sinon.restore);

  describe('list', () => {
    it('Deve disparar um erro caso db.execute dispare um erro', () => {
      sinon.stub(db, 'execute').rejects();
      return chai.expect(salesModel.list()).to.eventually.be.rejected;
    });
    it('Deve retornar uma lista caso db.execute retorne', () => {
      sinon.stub(db, 'execute').resolves([]);
      return chai.expect(salesModel.list()).to.eventually.be.undefined;
    });
  });

  describe('exists', () => {
    it('Deve disparar um erro caso db.execute dispare um erro', () => {
      sinon.stub(db, 'execute').rejects();
      return chai.expect(salesModel.exists(1)).to.eventually.be.rejected;
    });
    it('Deve disparar um erro caso db.execute não retorne um array', () => {
      sinon.stub(db, 'execute').resolves([]);
      return chai.expect(salesModel.exists(1)).to.eventually.be.rejected;
    });
    it('Deve retornar false se db.execute retornar false', () => {
      sinon.stub(db, 'execute').resolves([[]]);
      return chai.expect(salesModel.exists(1)).to.eventually.be.false;
    });
    it('Deve retornar true se db.execute retornar true', () => {
      sinon.stub(db, 'execute').resolves([[{}]]);
      return chai.expect(salesModel.exists(1)).to.eventually.be.true;
    })
  });

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
    it('Deve disparar um erro caso data não seja um array', () => {
      return chai.expect(salesModel.bulkAddBySale('', 1)).to.eventually.be.rejected;
    })
    it('Deve disparar um erro caso o MYSQL dispare um erro', () => {
      sinon.stub(db, 'query').rejects();
      return chai.expect(salesModel.bulkAddBySale([], 1)).to.eventually.be.rejected;
    });
    it('Deve disparar um erro caso o mysql não retorne um array', () => {
      sinon.stub(db, 'query').resolves([]);
      return chai.expect(salesModel.bulkAddBySale([], 1)).to.eventually.be.rejected;
    });
    it('deve retornar false se não encontrar o item', () => {
      sinon.stub(db, 'query').resolves([{}]);
      return chai.expect(salesModel.bulkAddBySale([], 1)).to.eventually.be.false;
    });

    it('deve retornar true se encontrar o item', () => {
      sinon.stub(db, 'query').resolves([{affectedRows: 1}]);
      return chai.expect(salesModel.bulkAddBySale([{ productId: 1, quantity: 2}], 1)).to.eventually.be.true;
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

  describe('remove', () => {
    it('Deve disparar um erro caso o db.execute também dispare', () => {
      sinon.stub(db, 'execute').rejects();
      return chai.expect(salesModel.remove(1)).to.eventually.be.rejected;
    })
    it('Deve retornar undefined caso haja sucesso', () => {
      sinon.stub(db, 'execute').resolves();
      return chai.expect(salesModel.remove(1)).to.eventually.be.undefined
    });
  });

  describe('edit', () => {
    it('Deve disparar um erro caso db.query dispare um erro', () => {
      sinon.stub(db, 'query').rejects();
      return chai.expect(salesModel.edit({}, {})).to.eventually.be.rejected;
    });
    it('Deve retornar undefined caso haja sucesso', () => {
      sinon.stub(db, 'query').resolves();
      return chai.expect(salesModel.edit({}, {})).to.eventually.be.undefined;
    });
  });
});