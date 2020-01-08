import { Schema } from 'mongoose';
import { Tools } from 'src/common/tools/tools';
import { genSalt, hash, compare } from 'bcrypt';
import { IUser } from 'src/common/interfaces/interfaces';

export const userSchema = new Schema({
    name: {
        type: String,
    },
    password: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
        set: Tools.removeSpaces,
        lowercase: true,
        sparse: true,
    },
    role: {
        type: String,
        enum : ['admin', 'basic'],
        default: 'basic',
    },
}, {timestamps: true});

userSchema.pre<IUser>('save', async function save(next) {
    if (!this.isModified('password')) {
        return next();
    }
    const user = this;
    try {
      const salt    = await genSalt(10);
      user.password = await hash(user.password , salt);
      return next();
    } catch (err) {
      return next(err);
    }
  });

userSchema.methods.validatePassword = async function validatePassword(candidatePassword) {
    return compare(candidatePassword, this.password);
    };
