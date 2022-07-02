const { expect } = require('chai');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const Joi = require('joi');
const sinon = require('sinon');
const { runSchema } = require('../../../middlewares/validators');


chai.use(chaiAsPromised);

const schema = Joi.object()

describe('validators', () => {
  beforeEach(sinon.restore);

  describe('runSchema', () => {
    it('deve disparar um erro se o schema disparar um erro', () => {
      error = new Error('string.min');
      sinon.stub(schema, 'validate').throws(error);
     expect(() => runSchema(schema)()).to.throw(error);
    });

    it('deve retornar algo se a validação for bem sucedida', () => {
      sinon.stub(schema, 'validate').resolves({});
      return chai.expect(runSchema(schema)()).to.be.undefined;
    });
  });
});