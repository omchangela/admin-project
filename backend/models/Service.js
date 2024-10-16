// backend/models/Service.js
const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
    serviceName: { type: String, required: true },
    description: { type: String, required: true },
    serviceAmount: { type: Number, required: true },
    discount: { type: String, required: true },  // Dropdown
    fastingTime: { type: String, required: true },
    resultDuration: { type: String, required: true },
    sampleType: { type: String, required: true },  // Dropdown
    ageGroup: { type: String, required: true },    // Dropdown
    homeSampleCollection: { type: String, required: true },  // Dropdown
    imageUrl: { type: String, required: false }  // Image field
});

module.exports = mongoose.model('Service', serviceSchema);
