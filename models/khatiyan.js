const mongoose = require('mongoose');

var Khatiyan = mongoose.model('Khatiyan', {
    khatiyan_number: { type: Number },
    serial_no: { type: Number },
    owner_name: { type: String },
    owner_father: { type: String },
    owner_address: { type: String},
    part : { type: Number},
    dag_no : { type: Number},
    land_type: {type : String},
    land_quantity_by_part : { type : Number},
    comments :{ type : String }
});

module.exports = { Khatiyan };


/*
{
   
    "khatiyan_number":"2",
   "serial_no": "123",
   "owner_name": "Khalek",
   "owner_father": "Malek" ,
   "owner_address": "Mdpur",
   "part" : "1",
   "dag_no" : "1253",
   "land_type": "Canal",
   "land_quantity_by_part" :".065"
 
   
}
*/