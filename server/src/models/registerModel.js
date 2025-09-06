import mongoose from "mongoose";

const registerSchema = mongoose.Schema({

    name: {
        type: String,
        required: false
    },
    password: {
        type: String,
        required: true
    },
    email:
    {
        type: String,
        required: [true, 'Username is required'],
        trim: true,
        lowercase: true,
        validate: {
            validator: function (v) {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
            },
            message: props => `${props.value} is not a valid email!`
        }
    },
    otp: String,
    otpExpires: Date,
    isVerified: {
        type: Boolean,
        default: false
    },
    refreshtoken: [
        {
            token: {
                type: String,
                required: true
            },
            expiresAt: {
                type: Date,
                required: true
            }

        }
    ]
})
const registerModel = mongoose.model('admin', registerSchema)

export default registerModel;