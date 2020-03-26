var mongoose = require('mongoose'),
    mongoosePaginate = require('mongoose-paginate'),
    Schema = mongoose.Schema;
    
var schema = new Schema({
  title: {type: String},
  content:{type: String},
  date :{type : Date, default: Date.now}
}, {
  toJSON: {virtuals: true},
  toObject: {virtuals: true}
});
schema.plugin(mongoosePaginate);
var Notice = mongoose.model('Notice', schema);

module.exports = Notice;