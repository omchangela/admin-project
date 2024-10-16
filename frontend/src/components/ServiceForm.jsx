import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const ServiceForm = () => {
    const [serviceName, setServiceName] = useState('');
    const [description, setDescription] = useState('');
    const [serviceAmount, setServiceAmount] = useState('');
    const [discount, setDiscount] = useState('');
    const [fastingTime, setFastingTime] = useState('');
    const [resultDuration, setResultDuration] = useState('');
    const [sampleType, setSampleType] = useState('');
    const [ageGroup, setAgeGroup] = useState('');
    const [homeSampleCollection, setHomeSampleCollection] = useState('');
    const [image, setImage] = useState(null);
    const navigate = useNavigate();
    const { id } = useParams();  // For edit mode

    // Fetch the service data if id is present (edit mode)
    useEffect(() => {
        if (id) {
            axios.get(`http://localhost:5000/api/services/${id}`)
                .then(response => {
                    const service = response.data;
                    setServiceName(service.serviceName);
                    setDescription(service.description);
                    setServiceAmount(service.serviceAmount);
                    setDiscount(service.discount);
                    setFastingTime(service.fastingTime);
                    setResultDuration(service.resultDuration);
                    setSampleType(service.sampleType);
                    setAgeGroup(service.ageGroup);
                    setHomeSampleCollection(service.homeSampleCollection);
                })
                .catch(err => console.log(err));
        }
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('serviceName', serviceName);
        formData.append('description', description);
        formData.append('serviceAmount', serviceAmount);
        formData.append('discount', discount);
        formData.append('fastingTime', fastingTime);
        formData.append('resultDuration', resultDuration);
        formData.append('sampleType', sampleType);
        formData.append('ageGroup', ageGroup);
        formData.append('homeSampleCollection', homeSampleCollection);
        if (image) {
            formData.append('image', image);
        }

        try {
            if (id) {
                // Update existing service
                await axios.put(`http://localhost:5000/api/services/${id}`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
            } else {
                // Create new service
                await axios.post('http://localhost:5000/api/services', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
            }
            navigate('/services');
        } catch (error) {
            console.log(error);
        }
    };

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    return (
        <div>
            <h2>{id ? 'Edit Service' : 'Add Service'}</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="serviceName" className="form-label">Service Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="serviceName"
                        value={serviceName}
                        onChange={(e) => setServiceName(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <textarea
                        className="form-control"
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="serviceAmount" className="form-label">Service Amount</label>
                    <input
                        type="number"
                        className="form-control"
                        id="serviceAmount"
                        value={serviceAmount}
                        onChange={(e) => setServiceAmount(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="discount" className="form-label">Discount</label>
                    <select
                        className="form-control"
                        id="discount"
                        value={discount}
                        onChange={(e) => setDiscount(e.target.value)}
                        required
                    >
                        <option value="" disabled>Select Discount</option>
                        <option value="10%">10%</option>
                        <option value="20%">20%</option>
                        <option value="30%">30%</option>
                    </select>
                </div>

                <div className="mb-3">
                    <label htmlFor="fastingTime" className="form-label">Fasting Time</label>
                    <input
                        type="text"
                        className="form-control"
                        id="fastingTime"
                        value={fastingTime}
                        onChange={(e) => setFastingTime(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="resultDuration" className="form-label">Result Duration</label>
                    <input
                        type="text"
                        className="form-control"
                        id="resultDuration"
                        value={resultDuration}
                        onChange={(e) => setResultDuration(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="sampleType" className="form-label">Sample Type</label>
                    <select
                        className="form-control"
                        id="sampleType"
                        value={sampleType}
                        onChange={(e) => setSampleType(e.target.value)}
                        required
                    >
                        <option value="" disabled>Select Sample Type</option>
                        <option value="Blood">Blood</option>
                        <option value="Urine">Urine</option>
                        <option value="Saliva">Saliva</option>
                    </select>
                </div>

                <div className="mb-3">
                    <label htmlFor="ageGroup" className="form-label">Select Age Group</label>
                    <select
                        className="form-control"
                        id="ageGroup"
                        value={ageGroup}
                        onChange={(e) => setAgeGroup(e.target.value)}
                        required
                    >
                        <option value="" disabled>Select Age Group</option>
                        <option value="Child">Child</option>
                        <option value="Adult">Adult</option>
                        <option value="Senior">Senior</option>
                    </select>
                </div>

                <div className="mb-3">
                    <label htmlFor="homeSampleCollection" className="form-label">Home Sample Collection</label>
                    <select
                        className="form-control"
                        id="homeSampleCollection"
                        value={homeSampleCollection}
                        onChange={(e) => setHomeSampleCollection(e.target.value)}
                        required
                    >
                        <option value="" disabled>Select Option</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                    </select>
                </div>

                <div className="mb-3">
                    <label htmlFor="image" className="form-label">Service Image</label>
                    <input
                        type="file"
                        className="form-control"
                        id="image"
                        onChange={handleImageChange}
                    />
                </div>

                <button type="submit" className="btn btn-primary">{id ? 'Update Service' : 'Add Service'}</button>
            </form>
        </div>
    );
};

export default ServiceForm;
