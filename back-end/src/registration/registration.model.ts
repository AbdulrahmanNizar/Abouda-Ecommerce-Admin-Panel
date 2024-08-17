import * as mongoose from 'mongoose';

export const registrationSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  online: { type: Boolean, required: true },
});

export interface Registration {
  id: string;
  username: string;
  email: string;
  password: string;
  online: boolean;
}
