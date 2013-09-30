# Forgot Password Flow

Express sub-app for a forgotton password flow.

## Assumptions:
- Mongodb / mongoose
- User model has `.findByEmail`

## Usage:

```javascript

var forgotton = require('express-forgotton-password')({ config: config, mongoose: mongoose, user : UserModel }) // Passing mongoose here _sucks_
app.use(forgotton.app)

```
