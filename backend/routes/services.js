const express = require('express');
const Service = require('../models/Service');
const router = express.Router();
const upload = require('../middleware/upload'); // Ensure the path is correct

// Get all services
router.get('/', async (req, res) => {
    try {
        const services = await Service.find();
        res.json(services);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create a service
router.post('/', upload.single('image'), async (req, res) => { // Ensure you're using upload.single for single file uploads
    const {
        serviceName,
        description,
        serviceAmount,
        discount,
        fastingTime,
        resultDuration,
        sampleType,
        ageGroup,
        homeSampleCollection
    } = req.body;

    const imageUrl = req.file ? `/uploads/${req.file.filename}` : '';

    try {
        const service = new Service({
            serviceName,
            description,
            serviceAmount,
            discount,
            fastingTime,
            resultDuration,
            sampleType,
            ageGroup,
            homeSampleCollection,
            imageUrl
        });
        await service.save();
        res.status(201).json(service);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Get a service by ID
router.get('/:id', async (req, res) => {
    try {
        const service = await Service.findById(req.params.id);
        if (!service) return res.status(404).json({ message: 'Service not found' });
        res.json(service);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Update a service
// Update a service
router.put('/:id', upload.single('image'), async (req, res) => {
    try {
        const service = await Service.findById(req.params.id);
        if (!service) {
            return res.status(404).json({ message: 'Service not found' });
        }

        // Update service fields with request body
        service.serviceName = req.body.serviceName || service.serviceName;
        service.description = req.body.description || service.description;
        service.serviceAmount = req.body.serviceAmount || service.serviceAmount;
        service.discount = req.body.discount || service.discount;
        service.fastingTime = req.body.fastingTime || service.fastingTime;
        service.resultDuration = req.body.resultDuration || service.resultDuration;
        service.sampleType = req.body.sampleType || service.sampleType;
        service.ageGroup = req.body.ageGroup || service.ageGroup;
        service.homeSampleCollection = req.body.homeSampleCollection || service.homeSampleCollection;

        // If a new image is uploaded, update the imageUrl
        if (req.file) {
            service.imageUrl = `/uploads/${req.file.filename}`;
        }

        const updatedService = await service.save();
        res.json(updatedService);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});


// Delete a service
router.delete('/:id', async (req, res) => {
    try {
        const deletedService = await Service.findByIdAndDelete(req.params.id);
        if (!deletedService) return res.status(404).json({ message: 'Service not found' });
        res.json({ message: 'Service deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
