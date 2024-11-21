export interface RegistrationRequestDto {
    name: string;
    email: string;
    phoneNumber: string;
    birthDateTemp: Date;
    birthDate: string;
    gender: string;
    password: string;
    status: boolean;
    role: string; // Optional field
}