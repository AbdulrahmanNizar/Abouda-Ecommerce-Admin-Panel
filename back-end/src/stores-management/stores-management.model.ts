import * as mongoose from 'mongoose';

export const storeManagementSchema = new mongoose.Schema({
  storeName: { type: String, required: true },
  storeAdmins: { type: Object, required: true },
  createdAt: { type: String, required: true },
});

export interface StoreManagement {
  id: string;
  storeName: string;
  storeAdmins: string[];
  createdAt: string;
}
