import * as crypto from 'crypto';

export function addSalt() {
  return crypto.randomBytes(3).toString('base64');
}

export function encript(userPassword: string, salt: string): string {
  return crypto
    .pbkdf2Sync(userPassword, salt, 10000, 64, 'sha512')
    .toString('base64');
}
