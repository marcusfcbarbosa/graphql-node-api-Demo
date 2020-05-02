//Se ao importar, usassemos asisim ./mongoose siginifica que importamos do diretorio node_modules
import * as mongoose from 'mongoose';
export const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        index: {
            unique: true
        }
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    active: {
        type: Boolean,
        required: true,
        default: true
    },
    roles: [{
        type: String,
        required: true,
        enum: ['user', 'admin'],
        default:'user'
    }],
    createdAt: {
        type: Date,
        default: Date.now()
    }
});