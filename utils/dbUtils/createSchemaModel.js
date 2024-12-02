function createSchemaModel(schemaDefinition) {
  const schema = {};

  Object.keys(schemaDefinition).forEach((field) => {
    const fieldDefinition = schemaDefinition[field];

    // Handle shorthand types: String, Number, Boolean
    if (fieldDefinition === String || fieldDefinition === Number || fieldDefinition === Boolean) {
      schema[field] = {
        type: parseType(fieldDefinition),
        required: false,
        default: null,
      };
    } 
    // Handle arrays, e.g., [String], [Number], etc.
    else if (Array.isArray(fieldDefinition) && fieldDefinition.length === 1) {
      schema[field] = {
        type: 'array',
        required: false,
        default: [],
        itemType: parseType(fieldDefinition[0]), // Extract array element type
      };
    } 
    // Handle full object configurations
    else if (typeof fieldDefinition === 'object') {
      const { type, required = false, default: defaultValue = null } = fieldDefinition;

      if (!type) {
        throw new Error(`Field "${field}" must have a "type" property`);
      }

      schema[field] = {
        type: parseType(type),
        required,
        default: typeof defaultValue === 'function' ? defaultValue() : defaultValue,
      };

      // Add itemType for arrays in full object configuration
      if (schema[field].type === 'array' && Array.isArray(type) && type.length === 1) {
        schema[field].itemType = parseType(type[0]);
      }
    } 
    // Handle unsupported types
    else {
      throw new Error(`Unsupported type for field "${field}"`);
    }
  });

  return schema;
}

function parseType(type) {
  if (type === String) return 'string';
  if (type === Number) return 'number';
  if (type === Boolean) return 'boolean';
  if (type === Date) return 'date';
  if (type === Object) return 'object';
  if (Array.isArray(type) && type.length === 1) return 'array';
  throw new Error(`Unsupported type: ${type}`);
}

module.exports = createSchemaModel;
