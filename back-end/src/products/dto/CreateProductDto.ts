export class CreateProductDto {
  readonly userId: string;
  readonly storeId: string;
  readonly storeName: string;
  readonly productPrice: number;
  readonly productName: string;
  readonly productColor: string;
  readonly productSize: string;
  readonly productCategory: string;
  readonly productImage: string;
}
