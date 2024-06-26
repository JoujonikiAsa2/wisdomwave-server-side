exports.logger = async(req, res, next) => {
    console.log(req.hostname, req.method, req.url)
    next()
  }