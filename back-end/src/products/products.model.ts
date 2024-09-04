import * as mongoose from 'mongoose';

export const productSchema = new mongoose.Schema({
  storeId: { type: String, required: true },
  storeName: { type: String, required: true },
  productColor: { type: String, required: true },
  productCategory: { type: String, required: true },
  productSize: { type: String, required: true },
  productName: { type: String, required: true },
  createdAtTime: { type: String, required: true },
  createdAtDate: { type: String, required: true },
});

export interface Product {
  id: string;
  storeId: string;
  storeName: string;
  productColor: string;
  productCategory: string;
  productSize: string;
  productName: string;
  createdAtTime: string;
  createdAtDate: string;
}
