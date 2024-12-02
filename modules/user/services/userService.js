
const bcrypt = require('bcrypt');
const {validateData} = require('../../../utils/validators/validateData');
const UserSchema = require('../models/userModel');
const { insert, findUserById, findUserByUsernameOrEmail, getUser } = require('../userDBHelper/userDB');
const fieldFilter = require('../../../utils/fieldFilter/fieldFilter')

const jwt = require('jsonwebtoken');

async function addUser(userData) {
  try {
    // Validate the user data against the schema
    const validatedUserData = validateData(UserSchema, userData);

    // Check for existing user by username or email
    const existingUserResult = await findUserByUsernameOrEmail(validatedUserData.username, validatedUserData.email);
    if (existingUserResult.error === false && existingUserResult.data) {
      return { error: true, data: null, errorMessage: 'Username or email already exists' };
    }

    // Hash the password if it exists
    if (validatedUserData.password) {
      const saltRounds = 10;
      validatedUserData.password = await bcrypt.hash(validatedUserData.password, saltRounds);
    }

    // Insert the new user into the database
    const insertResult = await insertUser(validatedUserData);
    if (insertResult.error) {
      return insertResult; // Pass the error structure from the database layer
    }

    // Filter out sensitive fields from the response (e.g., password)
    const filteredUser = fieldFilter(insertResult.data, ['username', 'email', 'isActive']);
    return { error: false, data: filteredUser, errorMessage: null };
  } catch (error) {
    console.error(error);
    return { error: true, data: null, errorMessage: error.message };
  }
}

async function getAllUser() {
  try {
    // Validate the user data against the schema
    let result = await getUser()
    if(result.error){
      return { error: true, data: [], errorMessage: "User list not found" };
    }else{
      return { error: false, data: result.data, errorMessage: null };
    }
  } catch (error) {
    console.error(error);
    return { error: true, data: null, errorMessage: error.message };
  }
}







module.exports = {
  addUser,
  getAllUser


};