// Aula 24.4 - Leandro => Turma 19-B
const runSchema = (schema) => (unknown) => {
  const { error, value } = schema.validate(unknown);
  
  if (error) {
    error.message = error.details[0].message;
    switch (error.details[0].type) {
      case 'number.min':
      case 'string.min':
        error.code = 422;
        break;
      default:
        error.code = 400;
    }
    throw error;
  }

  return value;
};

module.exports = {
  runSchema,
};