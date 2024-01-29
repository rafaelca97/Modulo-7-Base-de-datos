const mongoose = require('mongoose');

const DeviceSchema = new mongoose.Schema(
    {
        _id: String,
        name: String,
        brand: String
    },
    {
        versionKey: false,
        collection: 'dispositivos'
    }
);

module.exports = mongoose.model('Device', DeviceSchema);