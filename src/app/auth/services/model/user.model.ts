export interface User {
  uid: string;
  email: string;
  photoURL?: string;
  role?: string;
  displayName?: string;
  updateDate?: Date;
  isActive?: boolean;
  isDeleted?: boolean;
}
