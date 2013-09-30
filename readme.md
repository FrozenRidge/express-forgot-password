# Forgot Password Flow

Express sub-app for a forgotton password flow.

## Assumptions:
- Mongodb

## Usage:

```javascript

var forgotton = require('express-forgotton-password')({ config: config, db : db, user : UserModel })
app.use(forgotton.app)

```
