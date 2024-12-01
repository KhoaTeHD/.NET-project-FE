export interface ColorDto {
  id?: number;
  name?: string;
  status?: boolean;
}

export interface ColorDto_v2 extends ColorDto {
  checked?: boolean;
}