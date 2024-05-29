const crypto = require('crypto');

function generateSecretKey(length = 64) {
  return crypto.randomBytes(length).toString('hex');
}

const secretKey = generateSecretKey();
console.log(`Your generated secret key is: ${secretKey}`);
