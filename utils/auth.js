
import { randomBytes, createHmac } from 'crypto';
//import { fromBase64 } from 'base64url';


// Create size byte hex salt
 const genSalt = (size = 16) => {
  const buffer = randomBytes(size);
  return buffer.toString('hex');
}

// Create 32 byte b64 password
function genPass(size = 32) {
  const buffer = randomBytes(size);
  return Buffer.from(buffer).toString('base64');
}

function genUser() {
  return 'user_' + Math.round(Math.random() * 1000);
}

function genHash(password, salt) {
  const hash = createHmac('sha256', salt)
    .update(password)
    .digest('hex');
  return hash;
}

 const genRpcAuth = (username = genUser(), password = genPass(), salt = genSalt()) => {
  const hash = genHash(password, salt);
  return { username, password, salt, hash };
}
 export const genRpcAuthStr = (username, password, salt) => {
  const rpcauth = genRpcAuth(username, password, salt);
  const str = `rpcauth=${rpcauth.username}:${rpcauth.salt}$${rpcauth.hash}`;
  return str;
}

