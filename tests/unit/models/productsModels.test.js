const sinon = require('sinon');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const db = require('../../../models/connection');
const productsModel = require('../../../models/productsModel');
const { PRODUCTS_LIST } = require('../../utilits/constants');


chai.use(chaiAsPromised);


describe('models/productsModel', () => {
  beforeEach(sinon.restore);

  describe('list', () => {
    it('Deve disparar um erro caso o mysql rejeite a query', () => {
      sinon.stub(db, 'execute').rejects();
      chai.expect(productsModel.list()).to.eventually.be.rejected;
    });

    it('Deve retornar a lista de todos os produtos', () => {
      sinon.stub(db, 'execute').resolves(PRODUCTS_LIST);
      chai.expect(productsModel.list()).to
        .eventually.be.deep.equal(PRODUCTS_LIST);
    });
  });

  describe('exists', () => {
    it('Deve disparar um erro caso o MYSQL dispare um erro', () => {
      sinon.stub(db, 'execute').rejects();
      chai.expect(productsModel.exists(1)).to.eventually.be.rejected;
    });
    it('Deve disparar um erro caso o mysql não retorne um array', () => {
      sinon.stub(db, 'execute').resolves([{ insertId: 1 }]);
      chai.expect(productsModel.exists(1)).to.eventually.be.rejected;
    });
    it('Deve retornar false se não encontrar o item', () => {
      sinon.stub(db, 'execute').resolves([[]]);
      chai.expect(productsModel.exists(1)).to.eventually.be.false;
    });
    it('Deve retornar true se encontrar o item', () => {
      sinon.stub(db, 'execute').resolves([[{}]]);
      chai.expect(productsModel.exists(1)).to.eventually.be.true;
    });
  });

  describe('get', () => {
    it('Deve disparar um erro caso o MYSQL dispare um erro', () => {
      sinon.stub(db, 'execute').rejects();
      chai.expect(productsModel.get(1)).to.eventually.be.rejected;
    });
    it('Deve disparar um erro caso o mysql não retorne um array', () => {
      sinon.stub(db, 'execute').resolves([{ insertId: 1 }]);
      chai.expect(productsModel.get(1)).to.eventually.be.rejected;
    });
    it('Deve retornar false se não encontrar o item', () => {
      sinon.stub(db, 'execute').resolves([[]]);
      chai.expect(productsModel.get(1)).to.eventually.be.false;
    });
    it('Deve retornar true se encontrar o item', () => {
      sinon.stub(db, 'execute').resolves([[{}]]);
      chai.expect(productsModel.get(1)).to.eventually.be.true;
    });
  });

  describe('add', () => {
    it('Deve disparar um erro caso o MYSQL dispare um erro', () => {
      sinon.stub(db, 'execute').rejects();
      chai.expect(productsModel.add(1)).to.eventually.be.rejected;
    });
    it('Deve disparar um erro caso o mysql não retorne um array', () => {
      sinon.stub(db, 'execute').resolves([{ name: 'ProdutoX' }]);
      chai.expect(productsModel.add(1)).to.eventually.be.rejected;
    });
    it('Deve retornar o ID como um número', () => {
      sinon.stub(db, 'execute').resolves([{ insertId: 1 }]);
      chai.expect(productsModel.add(0)).to.eventually.be.equal(1);
    });
  });
});