import bcrypt from "bcryptjs";

export interface User {
  id: string;
  email: string;
  name: string;
  password?: string;
}

export interface Donation {
  id: string;
  userId: string;
  category: string;
  amount: number;
  paymentMethod: string;
  transactionId: string;
  date?: string;
  status: 'success' | 'failed';
}

const USERS_KEY = 'donation_platform_users';
const CURRENT_USER_KEY = 'donation_platform_current_user';
const DONATIONS_KEY = 'donation_platform_donations';

export const getUsers = (): User[] => {
  const users = localStorage.getItem(USERS_KEY);
  return users ? JSON.parse(users) : [];
};

export const getCurrentUser = (): User | null => {
  const user = localStorage.getItem(CURRENT_USER_KEY);
  return user ? JSON.parse(user) : null;
};

export const login = (email: string, password: string): { success: boolean; user?: User; error?: string } => {
  const users = getUsers();
  const user = users.find(u => u.email === email);
  
  if (!user) {
    return { success: false, error: 'User not found. Please sign up first.' };
  }
  
  const storedPassword = localStorage.getItem(`password_${email}`);
  if (storedPassword !== password) {
    return { success: false, error: 'Invalid password.' };
  }
  
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
  return { success: true, user };
};

export const signup = (name: string, email: string, password: string): { success: boolean; user?: User; error?: string } => {
  const users = getUsers();
  
  if (users.find(u => u.email === email)) {
    return { success: false, error: 'User already exists with this email.' };
  }

  const hash = bcrypt.hashSync("bacon", 10);
  
  const newUser: User = {
    id: crypto.randomUUID(),
    email,
    name,
    password: hash
  };
  
  users.push(newUser);
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
  localStorage.setItem(`password_${email}`, password);
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(newUser));
  
  return { success: true, user: newUser };
};

export const logout = (): void => {
  localStorage.removeItem(CURRENT_USER_KEY);
};

export const saveDonation = (donation: Omit<Donation, 'id' | 'transactionId' | 'date' | 'status'>): Donation => {
  const donations = getDonations();
  
  const newDonation: Donation = {
    ...donation,
    id: crypto.randomUUID(),
    transactionId: `TXN${Date.now()}${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
    date: new Date().toISOString(),
    status: 'success',
  };
  
  donations.push(newDonation);
  localStorage.setItem(DONATIONS_KEY, JSON.stringify(donations));
  
  return newDonation;
};

export const getDonations = (): Donation[] => {
  const donations = localStorage.getItem(DONATIONS_KEY);
  return donations ? JSON.parse(donations) : [];
};

export const getUserDonations = (userId: string): Donation[] => {
  return getDonations().filter(d => d.userId === userId);
};
