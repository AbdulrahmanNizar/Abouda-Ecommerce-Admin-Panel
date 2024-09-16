import * as mongoose from 'mongoose';

export const productSchema = new mongoose.Schema({
  storeId: { type: String, required: true },
  storeName: { type: String, required: true },
  productPrice: { type: Number, required: true },
  productColor: { type: String, required: true },
  productCategory: { type: String, required: true },
  productSize: { type: String, required: true },
  productName: { type: String, required: true },
  productImage: { type: Object, required: true },
  featuredProduct: { type: Boolean, required: true },
  archivedProduct: { type: Boolean, required: true },
  createdAtTime: { type: String, required: true },
  createdAtDate: { type: String, required: true },
});

export interface Product {
  id: string;
  storeId: string;
  storeName: string;
  productPrice: number;
  productColor: string;
  productCategory: string;
  productSize: string;
  productName: string;
  createdAtTime: string;
  createdAtDate: string;
  productImage: string | any;
  featuredProduct: boolean;
  archivedProduct: boolean;
}
