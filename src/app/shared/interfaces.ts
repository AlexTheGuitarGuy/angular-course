export interface User {
  email: string;
  password: string;
  returnSecureToken?: boolean;
}

export interface FirebaseAuthResponse {
  idToken: string;
  expiresIn: string;
}
