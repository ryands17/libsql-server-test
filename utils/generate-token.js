import { readFile } from 'fs/promises';
import { SignJWT, importPKCS8, importSPKI } from 'jose';

const privateKeyString = await readFile('./private-key.pem', 'utf-8');
const publicKeyString = await readFile('./keys/public-key.pem', 'utf-8');
const alg = 'EdDSA';

const privateKey = await importPKCS8(privateKeyString, alg);
const publicKey = await importSPKI(publicKeyString, alg);

// allow read-write access
const jwt = await new SignJWT({ claims: { a: 'rw' } })
  .setIssuedAt()
  .setProtectedHeader({ alg })
  .setExpirationTime('1d')
  .sign(privateKey);

console.log({ jwt });

// const { payload, protectedHeader } = await jwtVerify(jwt, publicKey);
// console.log({ payload, protectedHeader });
