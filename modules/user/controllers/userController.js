const { addUser, getAllUser,  } = require('../services/userService');

async function addUser(req, res) {
  try {
    const result = await addUser(req.body);

    if (result.error) {
      // If the service returns an error, pass it to res.error
      return res.error(result.errorMessage, 400, null);
    }

    // If successful, pass the data to res.success
    return res.success(result.data, 201, 'User created successfully');
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    return res.error('User creation failed due to server error', 500, null); // Error response
  }
}

// Controller to handle retrieving a user by ID
async function getUser(req, res) {
  try {
    const result = await getAllUser();

    if (result.error) {

      return res.error(result.errorMessage, 404, null);
    }

    // If successful, pass the data to res.success
    return res.success(result.data, 200, 'User retrieved successfully');
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    return res.error('Failed to retrieve user due to server error', 500, null); // Error response
  }
}





module.exports = {

  addUser,
  getUser,
  
};