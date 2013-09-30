var crypto = require('crypto')


module.exports = function(mongoose) {
  var Schema = mongoose.Schema

var _createCode = function(){
  return crypto.randomBytes(10).toString('hex')
}

var ForgotPasswordSchema = new Schema({
  code: { type: String, index: true, default: _createCode }
, email : { type: String, required: true}
, sent : { type: Date, default: Date.now }
})

ForgotPasswordSchema.static('verify', function(token, cb){
  this.findOne({code: token}, function(err, forgot){
    if (err || !forgot){
      return cb("Invalid Code")
    }

    if (Date.now() - forgot.sent > config.forgotpassword_expiry){ 
      return cb("Invalid Code: Expired")
    }

    return cb(null, forgot)
  })
})

ForgotPasswordSchema.static('validateRequest', function(req, res, next){

  if (!req.query.id)
    return res.redirect('/auth/forgot?fail=2')

  this.verify(req.query.id, function(err, forgot){
    if (err){
      console.log(">>> ForgotPassword : Error : ", err)
      return res.redirect('/auth/forgot?fail=2')
    }
    next()
  })
})

ForgotPasswordSchema.static('generate', function(customer, cb){
  var forgot = new this({
    email: customer.email
  })

  forgot.save(function(err, forgot){
    if (err) return cb(err);

    console.log(">>> ForgotPassword sent:", customer.email)
    customer.sendEmail(
      "Reset your password for Hosted Strider"
    , 'customer-forgot-email.html'
    , { token : forgot.code}, cb)
  })

})

var ForgotPassword = mongoose.model('ForgotPassword', ForgotPasswordSchema)
  return Forgot Password

}
