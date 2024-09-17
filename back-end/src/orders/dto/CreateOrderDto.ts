export class CreateOrderDto {
  readonly storeId: string;
  readonly storeName: string;
  readonly userId: string;
  readonly userName: string;
  readonly userPhoneNumber: string;
  readonly orderedProducts: string[];
}
