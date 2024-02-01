const mongoose = require('mongoose');
const ProductSchema = new mongoose.Schema({


    title : {
         type: String,
         minlength:[2, "The tittle should be more than 2 characters"],
         required: [true, "The name is required"],
         },
    product: { 
        type: String,
        minlength:[2, "The product should be more than 2 characters"],
        required: [true, "The product is required"], 
    },
    barcode: { 
        type: Number,
        minlength:[2, "The barcode should be more than 2 characters"],
        required: [true, "The barcode is required"], 
        unique : true
    },
    quantity: { 
        type: Number,
        minlength:[1, "The quanity should be more than 2 characters"],
        required: [true, "The quanity is required"], 
    },
   
    priceofpurchase: { 
        type: Number ,
       
        required: [true, "The quanity is required"], 
    },
    priceofsell: { 
        type: Number ,
       
        required: [true, "The quanity is required"], 
    },
    newQuanity: { 
        type: Number,
 
    },
    totalPrice: { 
        type: Number ,
       
    },

}, { timestamps: true });
module.exports = mongoose.model('Product', ProductSchema);

