const { ValidationError, ForeignKeyConstraintError, EmptyResultError } = require('sequelize');

const handleSequelizeError = (error, res) => {
  console.error(error);

  if (error instanceof ForeignKeyConstraintError) {
    return res.status(400).json(
      { 
        message: global.ENVIRONMENT.ERROR_REASONS_TEXT.FOREIGN_KEY_ERROR, 
        errCode: global.ENVIRONMENT.ERROR_REASONS_CODE.FOREIGN_KEY_ERROR 
      }
    );
  } else if (error instanceof ValidationError) {
    return res.status(400).json(
      { 
        message: global.ENVIRONMENT.ERROR_REASONS_TEXT.VALIDATION_ERROR, 
        errCode: global.ENVIRONMENT.ERROR_REASONS_CODE.VALIDATION_ERROR 
      }
    );
  } else if (error instanceof EmptyResultError) {
    return res.status(400).json(
      { 
        message: global.ENVIRONMENT.ERROR_REASONS_TEXT.EMPTY_RESULT, 
        errCode: global.ENVIRONMENT.ERROR_REASONS_CODE.EMPTY_RESULT 
      }
    );
  } else {
    return res.status(500).json(
      { 
        message: error?.errorMessage || error?.message ? error.errorMessage || error?.message : global.ENVIRONMENT.ERROR_REASONS_TEXT.INTERNAL_ERROR, 
        errCode: global.ENVIRONMENT.ERROR_REASONS_CODE.INTERNAL_ERROR 
      }
    );
  }
};

// Incluir funções para formatação de strings, datas, etc

module.exports = {
    handleSequelizeError
};