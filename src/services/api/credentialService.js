import credentialsData from '../mockData/credentials.json';
import categoriesData from '../mockData/categories.json';

// Simulate network delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// In-memory storage for demo purposes
let credentials = [...credentialsData];
let categories = [...categoriesData];

const credentialService = {
  async getAll() {
    await delay(300);
    return [...credentials];
  },

  async getById(id) {
    await delay(200);
    const credential = credentials.find(c => c.id === id);
    if (!credential) {
      throw new Error('Credential not found');
    }
    return { ...credential };
  },

  async create(credentialData) {
    await delay(400);
    const newCredential = {
      ...credentialData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      lastUsed: new Date().toISOString()
    };
    credentials.push(newCredential);
    return { ...newCredential };
  },

  async update(id, credentialData) {
    await delay(400);
    const index = credentials.findIndex(c => c.id === id);
    if (index === -1) {
      throw new Error('Credential not found');
    }
    
    const updatedCredential = {
      ...credentials[index],
      ...credentialData,
      updatedAt: new Date().toISOString()
    };
    credentials[index] = updatedCredential;
    return { ...updatedCredential };
  },

  async delete(id) {
    await delay(300);
    const index = credentials.findIndex(c => c.id === id);
    if (index === -1) {
      throw new Error('Credential not found');
    }
    credentials.splice(index, 1);
    return true;
  },

  async getCategories() {
    await delay(200);
    return [...categories];
  },

  async searchCredentials(query) {
    await delay(250);
    const lowercaseQuery = query.toLowerCase();
    return credentials.filter(credential =>
      credential.title.toLowerCase().includes(lowercaseQuery) ||
      credential.username.toLowerCase().includes(lowercaseQuery) ||
      credential.url.toLowerCase().includes(lowercaseQuery)
    );
  },

  async getWeakPasswords() {
    await delay(200);
    return credentials.filter(credential => credential.strength < 50);
  },

  async getDuplicatePasswords() {
    await delay(200);
    const passwordMap = new Map();
    credentials.forEach(credential => {
      if (passwordMap.has(credential.password)) {
        passwordMap.get(credential.password).push(credential);
      } else {
        passwordMap.set(credential.password, [credential]);
      }
    });
    
    return Array.from(passwordMap.values()).filter(group => group.length > 1);
  }
};

export default credentialService;