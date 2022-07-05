const sinon = require('sinon');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const db = require('../../../models/connection');
const productsModel = require('../../../models/productsModel');


chai.use(chaiAsPromised);


describe('models/productsModel', () => {
  beforeEach(sinon.restore);

  describe('list', () => {
    it('Deve disparar um erro caso db.execute dispare um erro', () => {
      sinon.stub(db, 'execute').rejects();
      return chai.expect(productsModel.list()).to.eventually.be.rejected;
    });

    it('Deve retornar uma lista caso db.execute retorne', () => {
      sinon.stub(db, 'execute').resolves([]);
      return chai.expect(productsModel.list()).to
        .eventually.be.undefined;
    });
  });

  describe('exists', () => {
    it('Deve disparar um erro caso db.execute dispare um erro', () => {
      sinon.stub(db, 'execute').rejects();
      return chai.expect(productsModel.exists(1)).to.eventually.be.rejected;
    });
    it('Deve disparar um erro caso db.execute não retorne um array', () => {
      sinon.stub(db, 'execute').resolves([]);
      return chai.expect(productsModel.exists(1)).to.eventually.be.rejected;
    });
    it('Deve retornar false se db.execute retornar false', () => {
      sinon.stub(db, 'execute').resolves([[]]);
      return chai.expect(productsModel.exists(1)).to.eventually.be.false;
    });
    it('Deve retornar true se db.execute retornar true', () => {
      sinon.stub(db, 'execute').resolves([[{}]]);
      return chai.expect(productsModel.exists(1)).to.eventually.be.true;
    });
  });

  describe('get', () => {
    it('Deve disparar um erro caso db.execute dispare um erro', () => {
      sinon.stub(db, 'execute').rejects();
      return chai.expect(productsModel.get(1)).to.eventually.be.rejected;
    });
    it('Deve disparar um erro caso db.execute não retorne um array', () => {
      sinon.stub(db, 'execute').resolves([]);
      return chai.expect(productsModel.get(1)).to.eventually.be.rejected;
    });
    it('Deve retornar undefined se db.execute não encontrar o item', () => {
      sinon.stub(db, 'execute').resolves([[]]);
      return chai.expect(productsModel.get(1)).to.eventually.be.undefined;
    });
    it('Deve retornar um objeto se db.execute encontrar o item', () => {
      sinon.stub(db, 'execute').resolves([[{}]]);
      return chai.expect(productsModel.get(1)).to.eventually.be.deep.equal({});
    });
  });

  describe('add', () => {
    it('Deve disparar um erro caso db.execute dispare um erro', () => {
      sinon.stub(db, 'execute').rejects();
      return chai.expect(productsModel.add(1)).to.eventually.be.rejected;
    });
    it('Deve disparar um erro caso db.execute não retorne um array', () => {
      sinon.stub(db, 'execute').resolves([]);
      return chai.expect(productsModel.add(1)).to.eventually.be.rejected;
    });
    it('Deve retornar undefined se  db.execute não encontrar o item', () => {
      sinon.stub(db, 'execute').resolves([[]]);
      return chai.expect(productsModel.add(1)).to.eventually.be.undefined;
    });
    it('Deve retornar um objeto se db.execute encontrar o item', () => {
      sinon.stub(db, 'execute').resolves([{}]);
      return chai.expect(productsModel.add(1)).to.eventually.be.undefined;
    });
  });

  describe('edit', () => {
    it('Deve disparar um erro caso o db.query dispare', () => {
      sinon.stub(db, 'query').rejects();
      return chai.expect(productsModel.edit(1, {})).to.eventually.be.rejected;
    });
    it('Deve retornar undefined caso haja sucesso', () => {
      sinon.stub(db, 'query').resolves();
      return chai.expect(productsModel.edit(1, {})).to.eventually.be.undefined
    });
  });

  describe('remove', () => {
    it('Deve disparar um erro caso o db.execute também dispare', () => {
      sinon.stub(db, 'execute').rejects();
      return chai.expect(productsModel.remove(1)).to.eventually.be.rejected;
    });
    it('Deve retornar undefined caso haja sucesso', () => {
      sinon.stub(db, 'execute').resolves();
      return chai.expect(productsModel.remove(1)).to.eventually.be.undefined
    });
  });

  describe('listAllids', () => {
    it('Deve disparar um erro caso db.execute dispare um erro', () => {
      sinon.stub(db, 'execute').rejects();
      return chai.expect(productsModel.listAllIds()).to.eventually.be.rejected;
    });
    it('Deve retornar UNDEFINED caso o db.execute retorne uma lista vazia', () => {
      sinon.stub(db, 'execute').resolves([]);
      return chai.expect(productsModel.listAllIds()).to.eventually.be.undefined;
    });
    it('Deve retornar a lista caso o db.execute retorne', () => {
      sinon.stub(db, 'execute').resolves([]);
      return chai.expect(productsModel.listAllIds()).to.eventually.be.undefined;
    })
  });
});
