export interface CategoryDto {
  id?: number;
  name?: string;
  description?: string;
  status?: boolean;
}

export interface CategoryDto_v2 extends CategoryDto {
  checked?: boolean;
}