export interface Admin {
  id: number;
  username: string;
  /** Plaintext for this local/test JSON database only — never do this against a real backend. */
  password: string;
  fullName: string;
  email: string;
  phone: string;
  role: string;
}

/** What actually gets kept in the signal/sessionStorage — password is stripped out. */
export type AdminSession = Omit<Admin, 'password'>;
