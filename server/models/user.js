var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var UserSchema = new mongoose.Schema({
  name: { type: String, required: true},
  buckets: [{type: Schema.Types.ObjectId, ref: "Bucket"}],
}, {timestamps: true});

var BucketSchema = new mongoose.Schema({
 title:{type:String},
 description:{ type: String},
 user_id:{type: Schema.Types.ObjectId, ref: "User"},
 check: Boolean,
 date: Date
});

////////////////////////////////////////////////////////
//               validations                          //
////////////////////////////////////////////////////////
UserSchema.path("name").validate(function(val) {
    return val.length > 1;
}, "user name must be two letters or more.");

UserSchema.path("name").required(true, "Please add a name!");

mongoose.model('User', UserSchema);
mongoose.model('Bucket', BucketSchema);
