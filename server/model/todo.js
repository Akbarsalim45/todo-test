const mongoose=require('mongoose')

const Todo =new mongoose.Schema([
    {
            Id:{
                type:Number
            },
        Date:{
            type:String
        },
        Description:{
            type:String
        },
        Status:{
            type:String
        }
    }
])

module.exports= mongoose.model('todo',Todo)