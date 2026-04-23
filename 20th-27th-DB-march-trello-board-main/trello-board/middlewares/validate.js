// middlewares/validate.js

const validate = (schema) => {
  return (req, res, next) => {
    try {
      schema.parse(req.body);
      next(); // Validation passed ✅
    } catch (error) {
      if (error.errors) {
        return res.status(400).json({
          success: false,
          errors: error.errors.map(err => ({
            field: err.path[0],
            message: err.message
          }))
        });
      }
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }
  };
};

module.exports = validate;