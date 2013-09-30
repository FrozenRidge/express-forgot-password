module.exports = function(opts){
  return {
    app : require('./app')(opts.config, opts.mongoose, opts.user)
  }
}
