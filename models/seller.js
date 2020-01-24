var mongoose = require('mongoose'),
    mongoosePaginate = require('mongoose-paginate'),
    Schema = mongoose.Schema;
    
var schema = new Schema({
  seller_id: { type: Schema.Types.ObjectId, ref: 'User'},
  name: {type: String},
  img: {type: String},
  introduce: {type: String},
  university: {type: String},
  major: {type: String}
}, {
  toJSON: { virtuals: true},
  toObject: {virtuals: true}
});
schema.plugin(mongoosePaginate);
var Seller = mongoose.model('Seller', schema);

module.exports = Seller;