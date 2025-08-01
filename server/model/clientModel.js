import mongoose from 'mongoose';
import { pathToFileURL } from 'url';

const clientSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone:{
      type: String,
      required: false,
    }
  },

  {
    timestamps: true,
  }
);

const Client = mongoose.model('Client', clientSchema);

export default Client;