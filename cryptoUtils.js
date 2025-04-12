const CryptoJS = require('crypto-js');

// Encryption
const algorithm = 'aes-256-cbc';
const key = CryptoJS.lib.WordArray.random(32); // 32 bytes for aes-256
const iv = CryptoJS.lib.WordArray.random(16);  // 16 bytes for aes

function encrypt(text) {
  const ciphertext = CryptoJS.AES.encrypt(text, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  });
  
  return {
    encryptedData: ciphertext.toString(),
    iv: iv.toString(),
    key: key.toString()
  };
}

// Decryption
function decrypt(encryptedData, keyHex, ivHex) {
  const key = CryptoJS.enc.Hex.parse(keyHex);
  const iv = CryptoJS.enc.Hex.parse(ivHex);
  
  const decrypted = CryptoJS.AES.decrypt(encryptedData, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  });
  
  return decrypted.toString(CryptoJS.enc.Utf8);
}


const result = encrypt("Hello, world!");
console.log("Encrypted:", result.encryptedData);
console.log("Decrypted:", decrypt(result.encryptedData, result.key, result.iv));

module.exports = {
  encrypt,
  decrypt
}; 