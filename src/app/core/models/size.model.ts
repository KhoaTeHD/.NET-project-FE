export interface SizeDto {
  id?: number;
  name?: string;
  desc?: string;
  status?: boolean;
}

export interface SizeDto_v2 extends SizeDto {
  checked?: boolean;
}