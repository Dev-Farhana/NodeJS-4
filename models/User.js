import {mongoose,Schema} from 'mongoose';


const UserSchema = new mongoose.Schema({
    name :{
        type: Schema.Types.String,
        required: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    phone:{
        type: Number,
        require: false
    },
    password: { 
        type: String,
        require: true
    }
})

const User = mongoose.model("User" , UserSchema);

export default User;