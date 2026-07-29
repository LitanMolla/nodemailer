const mongoose = require('mongoose')
const dbConnect = () => {
    return mongoose.connect(`mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@cluster0.eluznep.mongodb.net/${process.env.MONGODB_DBNAME}?appName=Cluster0`).then(()=>{console.log('Database connected')}).catch((error)=>{console.log(error.message)})
}

module.exports=dbConnect