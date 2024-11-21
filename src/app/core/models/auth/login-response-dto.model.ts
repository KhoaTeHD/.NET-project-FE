import { UserDto } from "./user-dto.model";

export interface LoginResponseDto {
    user: UserDto; // Nested model for user details
    token: string; // JWT token returned after login
  }