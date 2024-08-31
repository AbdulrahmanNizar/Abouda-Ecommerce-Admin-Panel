import * as mongoose from 'mongoose';

export const sizeSchema = new mongoose.Schema(
  {
    storeId: { type: String, required: true },
    storeName: { type: String, required: true },
    sizeName: { type: String, required: true },
    sizeLetter: { type: String, required: true },
    createdAtTime: { type: String, required: true },
    createdAtDate: { type: String, required: true },
  },
  { timestamps: true },
);

export interface Size {
  id: string;
  storeId: string;
  storeName: string;
  sizeName: string;
  sizeLetter: string;
  createdAtTime: string;
  createdAtDate: string;
}
