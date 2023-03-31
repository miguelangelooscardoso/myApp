// export interface User {
//     id: number;
//     firstName: string;
//     lastName: string;
//     email: string;
//     address: string;
//     mobile: string;
//     password: string;
//     createdAt: string;
//     modifiedAt: string;
// }

export interface User {
    id: number;
    fullName: string;
    dateCreated: string;
    dateModified: string;
    userName: string;
    normalizedUserName: string;
    email: string;
    normalizedEmail: string;
    emailConfirmed: boolean;
    passwordHash: string;
    securityStamp: string;
    concurrencyStamp: string;
    phoneNumber: string;
    phoneNumberConfirmed: boolean;
    twoFactorEnabled: boolean;
    lockoutEnd: string;
    lockoutEnabled: boolean;
    accessFailedCount: number;
    }
