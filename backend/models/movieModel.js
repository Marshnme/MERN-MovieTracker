const mongoose = require('mongoose');

const movieSchema = mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    },
    poster:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    type:{
        type:String,
        required:true
    },
    year:{
        type:String,
        required:true
    },
    imdbID:{
        type:String,
        required:true
    },
},{
    timestamps:true
}
)

module.exports = mongoose.model('Movie',movieSchema)