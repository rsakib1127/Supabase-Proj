const createSchemaModel = require('../../../utils/dbUtils/createSchemaModel');

const UserSchema = createSchemaModel({
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  isActive: { type: Boolean, default: true },
});

module.exports = UserSchema;

