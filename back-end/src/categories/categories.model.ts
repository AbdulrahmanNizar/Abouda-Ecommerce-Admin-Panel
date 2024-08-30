import * as mongoose from 'mongoose';

export const categorySchema = new mongoose.Schema(
  {
    storeId: { type: String, required: true },
    storeName: { type: String, required: true },
    categoryName: { type: String, required: true },
    createdAtTime: { type: String, required: true },
    createdAtDate: { type: String, required: true },
  },
  { timestamps: true },
);

export interface Category {
  id: string;
  storeId: number;
  storeName: string;
  categoryName: string;
  createdAtTime: string;
  createdAtDate: string;
}
