import * as mongoose from 'mongoose';

export const storeManagementSchema = new mongoose.Schema({
  storeName: { type: String, required: true },
  storeAdmins: { type: Object, required: true },
  storeProducts: { type: Object, required: true },
  storeSales: { type: Number, required: true },
  storeTotalRevenue: { type: Number, required: true },
  createdAt: { type: String, required: true },
});

export interface StoreManagement {
  id: string;
  storeName: string;
  storeAdmins: string[];
  storeProducts: string[];
  storeSales: number;
  storeTotalRevenue: number;
  createdAt: string;
}
