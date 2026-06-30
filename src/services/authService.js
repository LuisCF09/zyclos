import { readStorage, removeStorage, writeStorage } from './storageService.js';

const USERS_KEY = 'zyclos_users';
const CURRENT_USER_KEY = 'zyclos_current_user';

const demoUser = {
  id: 'user-demo',
  name: 'Usuario Demo',
  email: 'demo@zyclos.com',
  password: '123456',
  city: 'Sao Paulo, SP',
  bio: 'Apaixonado por moda consciente, trocas locais e pecas com historia.',
  avatar:
    'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=80',
  sustainableScore: 58,
  history: [
    {
      id: 'h-001',
      type: 'Compra',
      item: 'Camiseta basica algodao',
      date: '12/06/2026',
    },
    {
      id: 'h-002',
      type: 'Troca',
      item: 'Moletom verde musgo',
      date: '18/06/2026',
    },
  ],
};

function sanitizeUser(user) {
  const { password, ...safeUser } = user;
  return safeUser;
}

function normalizeEmail(email) {
  return email.trim().toLowerCase();
}

function getUsers() {
  const users = readStorage(USERS_KEY, []);
  if (users.length > 0) {
    return users;
  }

  writeStorage(USERS_KEY, [demoUser]);
  return [demoUser];
}

function saveUsers(users) {
  writeStorage(USERS_KEY, users);
}

export const authService = {
  register({ name, email, password }) {
    const users = getUsers();
    const normalizedEmail = normalizeEmail(email);
    const alreadyExists = users.some((user) => user.email === normalizedEmail);

    if (alreadyExists) {
      throw new Error('Este e-mail ja esta cadastrado.');
    }

    const newUser = {
      id: `user-${Date.now()}`,
      name: name.trim(),
      email: normalizedEmail,
      password,
      city: 'Cidade nao informada',
      bio: 'Novo integrante da comunidade Zyclos.',
      avatar:
        'https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&w=300&q=80',
      sustainableScore: 35,
      history: [],
    };

    saveUsers([...users, newUser]);
    const safeUser = sanitizeUser(newUser);
    writeStorage(CURRENT_USER_KEY, safeUser);
    return safeUser;
  },

  login({ email, password }) {
    const normalizedEmail = normalizeEmail(email);
    const user = getUsers().find(
      (storedUser) => storedUser.email === normalizedEmail && storedUser.password === password,
    );

    if (!user) {
      throw new Error('E-mail ou senha invalidos.');
    }

    const safeUser = sanitizeUser(user);
    writeStorage(CURRENT_USER_KEY, safeUser);
    return safeUser;
  },

  logout() {
    removeStorage(CURRENT_USER_KEY);
  },

  getCurrentUser() {
    return readStorage(CURRENT_USER_KEY, null);
  },

  updateUser(updates) {
    const currentUser = this.getCurrentUser();
    if (!currentUser) {
      return null;
    }

    const users = getUsers();
    const nextUsers = users.map((user) =>
      user.id === currentUser.id ? { ...user, ...updates } : user,
    );
    const updatedUser = sanitizeUser(nextUsers.find((user) => user.id === currentUser.id));

    saveUsers(nextUsers);
    writeStorage(CURRENT_USER_KEY, updatedUser);
    return updatedUser;
  },
};
