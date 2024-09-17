import * as mongoose from 'mongoose';

export const orderSchema = new mongoose.Schema({
  storeId: { type: String, required: true },
  storeName: { type: String, required: true },
  userId: { type: String, required: true },
  userName: { type: String, required: true },
  userPhoneNumber: { type: String, required: true },
  orderedProducts: { type: Object, requried: true },
  orderedProductsPrices: { type: Number, requried: true },
  createdAtDate: { type: String, required: true },
  createdAtTime: { type: String, required: true },
});

export interface Order {
  id: string;
  storeId: string;
  storeName: string;
  userId: string;
  userName: string;
  userPhoneNumber: string;
  orderedProducts: string[];
  orderedProductsPrices: number;
  createdAtDate: string;
  createdAtTime: string;
}
