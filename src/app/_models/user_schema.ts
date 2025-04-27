import mongoose, { Schema, model, Model } from 'mongoose';

export interface IUser extends mongoose.Document {
  userType: string;
  fullname: string;
  email: string;
  phone: string;
  address: string;
  password: string;
  createdAt: Date;
}

const UserSchema = new Schema<IUser>({
  userType: { 
    type: String, 
    required: true, 
    enum: ['COMMUTER_SELF', 'COMMUTER_PARENT', 'DRIVER', 'AGENCY'] 
  },
  fullname: { 
    type: String, 
    required: true 
  },
  email: { 
    type: String, 
    required: true, 
    unique: true 
  },
  phone: { 
    type: String, 
    required: true 
  },
  address: { 
    type: String, 
    required: true 
  },
  password: { 
    type: String, 
    required: true 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
});

// Prevent model overwrite issue in dev
const User = mongoose.models.User || model<IUser>('User', UserSchema);

export default User as Model<IUser>;