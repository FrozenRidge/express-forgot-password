module.exports = function(opts){

  if (! opts.dbconn ) {
    throw "express-forgot-password needs a mongodb url"
  }

  if (! opts.mailFrom )
    opts.mailFrom = "No Reply <noreply@noreply.com>"

  if (! opts.resetMailSubject )
    opts.resetMailSubject = "Reset your password"

  if (! opts.mailConfig )
    throw "express-forgot-password needs config for nodemailer"

  if (! opts.resetMailContent )
    throw "express-forgot-password needs a function resetMailContent(user, token) to supply the email body"

  var model = require('./model')(
        opts.dbconn
      , opts.mailConfig
      , opts.mailFrom
      , opts.resetMailSubject
      , opts.resetMailContent
      )
  
  return {
    app : require('./app')(model, opts.user)
  }
}
