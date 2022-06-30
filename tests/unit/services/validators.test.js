const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const Joi = require('joi');
const sinon = require('sinon');
const { runSchema } = require('../../../services/validators');

chai.use(chaiAsPromised);

const schema = Joi.object()

describe('validators', () => {
  beforeEach(sinon.restore);

  describe('runSchema', () => {
    it('deve disparar um erro se o schema disparar um erro', () => {
      sinon.stub(schema, 'validateAsync').rejects();
      chai.expect(runSchema(schema)())
        .to.eventually.be.rejected;
    });

    it('deve retornar alguma coisa se der certor', () => {
      sinon.stub(schema, 'validateAsync').resolves();
      chai.expect(runSchema(schema)()).to.eventually.be.undefined;
    });
  });
});