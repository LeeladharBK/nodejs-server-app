// Service to Validate User Input 

exports.validateUuId = uuId => {
  // validate uuId, length should be 32
  if (uuId.length === 32) return true;
  return false;
};
