const mongoose = require('mongoose');

const movieSchema = mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    },
    Poster:{
        type:String,
        required:true
    },
    Title:{
        type:String,
        required:true
    },
    Type:{
        type:String,
        required:true
    },
    Year:{
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