export class BrowserAuthAdapter {
  private storageKey: string = 'authToken';

  constructor() {}

  // Generate a CryptoKey from a passphrase
  private async generateKey(passphrase: string): Promise<CryptoKey> {
    const enc = new TextEncoder();
    const keyMaterial = await crypto.subtle.importKey(
      'raw',
      enc.encode(passphrase),
      { name: 'PBKDF2' },
      false,
      ['deriveKey']
    );

    // Derive a key for AES-GCM
    return await crypto.subtle.deriveKey(
      {
        name: 'PBKDF2',
        salt: enc.encode('salt'), // Use a secure, randomly generated salt in a real app
        iterations: 100000,
        hash: 'SHA-256'
      },
      keyMaterial,
      { name: 'AES-GCM', length: 256 },
      false,
      ['encrypt', 'decrypt']
    );
  }

  // Encrypt a token using the derived CryptoKey
  async encryptToken(token: string, passphrase: string): Promise<string> {
    const key = await this.generateKey(passphrase);
    const iv = crypto.getRandomValues(new Uint8Array(12)); // IV for AES-GCM must be 12 bytes
    const enc = new TextEncoder();
    const encrypted = await crypto.subtle.encrypt(
      {
        name: 'AES-GCM',
        iv: iv
      },
      key,
      enc.encode(token)
    );

    // Store as base64: IV + encrypted data
    const encryptedData = new Uint8Array(encrypted);
    const ivAndData = new Uint8Array([...iv, ...encryptedData]);
    return btoa(String.fromCharCode(...ivAndData));
  }

  // Decrypt a token from the encrypted base64 string
  async decryptToken(encryptedToken: string, passphrase: string): Promise<string> {
    const key = await this.generateKey(passphrase);
    const ivAndData = new Uint8Array(atob(encryptedToken).split('').map(char => char.charCodeAt(0)));

    // Extract IV and data
    const iv = ivAndData.slice(0, 12);
    const data = ivAndData.slice(12);

    const decrypted = await crypto.subtle.decrypt(
      {
        name: 'AES-GCM',
        iv: iv
      },
      key,
      data
    );

    const dec = new TextDecoder();
    return dec.decode(decrypted);
  }

  // Store encrypted token in localStorage
  async storeToken(token: string, passphrase: string): Promise<void> {
    const encryptedToken = await this.encryptToken(token, passphrase);
    localStorage.setItem(this.storageKey, encryptedToken);
  }

  // Retrieve and decrypt token from localStorage
  async retrieveToken(passphrase: string): Promise<string | null> {
    const encryptedToken = localStorage.getItem(this.storageKey);
    if (!encryptedToken) {
      return null;
    }
    return await this.decryptToken(encryptedToken, passphrase);
  }

  // Remove token from localStorage
  clearToken(): void {
    localStorage.removeItem(this.storageKey);
  }
}

// Usage example:

// const authAdapter = new AuthAdapter();
// const apiToken = 'your-secure-api-token';
// const passphrase = 'your-secure-passphrase';
//
// // Store token securely
// authAdapter.storeToken(apiToken, passphrase)
//   .then(() => console.log('Token stored securely'));
//
// // Retrieve token securely
// authAdapter.retrieveToken(passphrase)
//   .then(token => console.log('Retrieved token:', token))
//   .catch(() => console.log('Failed to retrieve token'));
