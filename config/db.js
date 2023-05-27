const mongoose = require('mongoose')

const connectDB = async () => await mongoose.connect(process.env.MONGO).then(()=>{
    console.log('connected to mongoDB');
}).catch((err)=>{    
    console.log(err);
})  


module.exports = connectDB