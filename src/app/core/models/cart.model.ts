export interface CartDto {
  item_Id?: number;
  cus_Id?: string;
  price?: number;
  quantity?: number;
}

export interface CartDtoExtendStatus extends CartDto {
  status?: boolean;
}
