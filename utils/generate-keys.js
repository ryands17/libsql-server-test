import crypto from 'crypto';
import { writeFile } from 'fs/promises';

const { publicKey, privateKey } = crypto.generateKeyPairSync('ed25519', {
  publicKeyEncoding: {
    type: 'spki',
    format: 'pem',
  },
  privateKeyEncoding: {
    type: 'pkcs8',
    format: 'pem',
  },
});

await writeFile('keys/public-key.pem', publicKey, 'utf-8');
await writeFile('private-key.pem', privateKey, 'utf-8');
