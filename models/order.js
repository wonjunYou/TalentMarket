var mongoose = require('mongoose'),
    mongoosePaginate = require('mongoose-paginate'),
    Schema = mongoose.Schema;

var schema = new Schema({
  buyer: { type: Schema.Types.ObjectId, ref: 'User'},
  seller: {type: Schema.Types.ObjectId, ref: 'User'},
  product: { type: Schema.Types.ObjectId, ref: 'Product'},
  createdAt: {type: Date, default: Date.now},
  price: {type: Number, required: true},
  closingDate: {type: Date}, 
  finish: {type: Boolean, default:false},
}, { 
  toJSON: { virtuals: true},
  toObject: {virtuals: true}
});
schema.plugin(mongoosePaginate);
var Order = mongoose.model('Order', schema);

module.exports = Order;
