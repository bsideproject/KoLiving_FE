export interface User {
  id: number;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  gender: string;
  birthDate: string;
  description: string;
  imageUrl: string | null;
  userRole: string;
  signUpStatus: string;
  createdDate: string;
  lastModifiedDate: string;
  accountNonExpired: boolean;
  credentialsNonExpired: boolean;
  benabled: boolean;
  blocked: boolean;
  authorities: [
    {
      authority: 'ROLE_USER';
    },
  ];
  username: string;
  accountNonLocked: boolean;
  enabled: boolean;
}

export interface ImageFile {
  deleted: boolean;
  createdAt: string;
  updatedAt: string;
  id: number;
  path: string;
  size: number;
}

export interface Profile {
  profileId: number;
  gender: string;
  firstName: string;
  lastName: string;
  birthDate: string;
  description: string;
  email: string;
  id: number;
  imageFile: ImageFile;
  userRole: string;
  signUpStatus: string;
}
