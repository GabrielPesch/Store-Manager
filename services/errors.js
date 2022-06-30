class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ProductNotFoundError'; 
    this.message = 'Product not found';
  }
}

module.exports = {
  NotFoundError,
};
