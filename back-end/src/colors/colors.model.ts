import * as mongoose from 'mongoose';

export const colorSchema = new mongoose.Schema(
  {
    storeId: { type: String, required: true },
    storeName: { type: String, required: true },
    colorName: { type: String, required: true },
    createdAtTime: { type: String, required: true },
    createdAtDate: { type: String, required: true },
  },
  { timestamps: true },
);

export interface Color {
  id: string;
  storeId: string;
  storeName: string;
  colorName: string;
  createdAtTime: string;
  createdAtDate: string;
}
