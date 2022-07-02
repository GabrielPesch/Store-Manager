// Aula 24.4 - Leandro => Turma 19-B
const runSchema = (schema) => (unknown) => {
  const { error, value } = schema.validate(unknown);
  
  if (error) {
    error.message = error.details[0].message;
    // types of error = https://github.com/sideway/joi/blob/v14.3.1/API.md#list-of-errors
    switch (error.details[0].type) {
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