function fieldFilter(data, allowedFields) {
  // Check if allowedFields is an array
  if (!Array.isArray(allowedFields)) {
    throw new Error('allowedFields must be an array');
  }

  // Ensure data is a valid object
  if (!data || typeof data !== 'object') {
    throw new Error('Invalid data provided for filtering');
  }

  const filteredData = {};

  for (const field of allowedFields) {
    if (data.hasOwnProperty(field)) {
      filteredData[field] = data[field];
    }
  }

  return filteredData;
}

module.exports = fieldFilter;