function errors(err, req, res, next) {
    console.error('[error]', err);
  
    const message = err.message || 'Error interno';
    const status = err.statusCode || 500;
  
    res.status(status).send({
      error: true,
      status: status,
      body: message,
    });
  }
  
  export default errors;