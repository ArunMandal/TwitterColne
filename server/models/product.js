const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const proudctSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    price: String,
    description: String,
    created: Date,
    updated: Date,
    categories: [{type: Schema.Types.ObjectId, ref: 'Category'}]
});

proudctSchema.methods.saveWithTitleChecking = function(){
    if(this.title.length < 5){
        throw new Error('Product length must be greater than 5');
    } else {
        return this.save();
    }
}

proudctSchema.statics.filterByPrice = function(price) {
    return this.find().where('price').gt(price);
}

proudctSchema.pre(['save', 'saveWithTitleChecking'], function(next) {
    this.created = new Date();
    this.updated = new Date();
    next();
});


//Product => product + 's' => products
module.exports = mongoose.model('Product', proudctSchema);