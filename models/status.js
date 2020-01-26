var mongoose = require('mongoose'),
    mongoosePaginate = require('mongoose-paginate'),
    Schema = mongoose.Schema;

var schema = new Schema({
  order_id: {type: Schema.Types.ObjectId, ref: 'Order'},
  content: {type: String},
  img: {type: String},
  createdAt: {type: Date, default: Date.now},
  approval: {type: Boolean, default: false}
}, { 
  toJSON: { virtuals: true},
  toObject: {virtuals: true}
});
schema.plugin(mongoosePaginate);
var Status = mongoose.model('Status', schema);

module.exports = Status;