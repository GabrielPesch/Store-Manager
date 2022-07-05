class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ProductNotFoundError'; 
  }
}

module.exports = {
  NotFoundError,
};
