function validateData(schema, data) {
  const validatedData = {};

  // Iterate through the data fields
  for (const field in data) {
    // Reject fields not defined in the schema
    if (!schema[field]) {
      throw new Error(`Field "${field}" is not allowed.`);
    }

    const { type, enum: enumValues } = schema[field];
    const value = data[field];

    // Determine the actual type of the value
    const actualType = Array.isArray(value) ? 'array' : typeof value;

    // Validate the type
    if (actualType !== type) {
      throw new Error(`Field "${field}" must be of type ${type}, but received ${actualType}.`);
    }

    // Validate enum values if defined
    if (enumValues && !enumValues.includes(value)) {
      throw new Error(
        `Field "${field}" must be one of the following values: ${enumValues.join(', ')}.`
      );
    }

    validatedData[field] = value;
  }

  // Enforce required fields and apply defaults
  for (const field in schema) {
    const { required, default: defaultValue, type } = schema[field];

    // Ensure required fields are present
    if (required && validatedData[field] === undefined) {
      throw new Error(`Field "${field}" is required.`);
    }

    // Apply default values if the field is not present in data
    if (validatedData[field] === undefined && defaultValue !== undefined) {
      validatedData[field] =
        typeof defaultValue === 'function' ? defaultValue() : defaultValue;

      // Validate the type of the default value
      const defaultType = Array.isArray(validatedData[field])
        ? 'array'
        : typeof validatedData[field];
      if (defaultType !== type) {
        throw new Error(
          `Field "${field}" default value must be of type ${type}, but received ${defaultType}.`
        );
      }
    }
  }

  return validatedData;
}

function partialValidator(schema, data) {
  const validatedData = {};

  // Ensure all fields in data exist in the schema
  for (const field in data) {
    if (!schema[field]) {
      throw new Error(`Field "${field}" is not allowed.`);
    }

    const { type, enum: enumValues } = schema[field];
    const value = data[field];

    // Validate type
    const actualType = Array.isArray(value) ? 'array' : typeof value;
    if (actualType !== type) {
      throw new Error(`Field "${field}" must be of type ${type}, but received ${actualType}.`);
    }

    // Validate enum values
    if (enumValues && !enumValues.includes(value)) {
      throw new Error(
        `Field "${field}" must be one of the following values: ${enumValues.join(', ')}.`
      );
    }

    validatedData[field] = value;
  }

  return validatedData;
}



module.exports = {
  validateData,
  partialValidator
};
