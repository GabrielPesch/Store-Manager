const errorHandler = (err, _req, res, _next) => {
  switch (err.name) {
    case 'ValidationError':
      return res.status(err.code).json({ message: err.message });
    case 'ProductNotFoundError':
      return res.status(404).json({ message: err.message });
    default:
      return res.status(500).json({ message: err.message });
  }
};

module.exports = errorHandler;