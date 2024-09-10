export class UpdateProductDto {
  readonly productId: string;
  readonly userId: string;
  readonly storeId: string;
  readonly updatedProductName: string;
  readonly updatedProductSize: string;
  readonly updatedProductColor: string;
  readonly updatedProductCategory: string;
  readonly updatedProductPrice: number;
  readonly updatedProductImage: string;
}
