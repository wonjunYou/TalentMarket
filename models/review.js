var mongoose = require('mongoose'),
    mongoosePaginate = require('mongoose-paginate'),
    Schema = mongoose.Schema;

var schema = new Schema({
  content: {type: String, required: true},
  product: { type: Schema.Types.ObjectId, ref: 'Product'},
  order: { type: Schema.Types.ObjectId, ref: 'order' },  
  trId: {type: Number},
  isBlock: {type: Boolean, default:false},

}, {
  toJSON: { virtuals: true},
  toObject: {virtuals: true}
});
schema.plugin(mongoosePaginate);
var Review = mongoose.model('Review', schema);

module.exports = Review;