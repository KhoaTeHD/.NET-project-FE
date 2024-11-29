export interface BrandDto {
    id?: number;
    name?: string;
    status?: boolean; 
  }

  export interface BrandDto_v2 extends BrandDto {
    checked?: boolean;
  }