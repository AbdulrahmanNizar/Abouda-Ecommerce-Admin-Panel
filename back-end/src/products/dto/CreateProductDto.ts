export class CreateProductDto {
  readonly userId: string;
  readonly storeId: string;
  readonly storeName: string;
  readonly productName: string;
  readonly productColor: string;
  readonly productSize: string;
  readonly productCategory: string;
  readonly productImage: any;
}
