function header(req, res, next) {
    // Check if the required header exists and has the expected value
    if (
      req.headers['api_key'] !== 'eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsIm' ||
      req.headers['authantication'] !== 'mediax_backend'
      ) {
      return res.status(400).json({ error: 'Invalid headers' });
    }
  
    next();
  }
  
  module.exports = header;
  