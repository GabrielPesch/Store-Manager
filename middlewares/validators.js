// Aula 24.4 - Leandro => Turma 19-B
const runSchema = (schema) => async (value) => {
  const result = await schema.validateAsync(value);
  return result;
};

module.exports = {
  runSchema,
};