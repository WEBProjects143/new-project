import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const UploadContainer = styled.div`
    padding: 20px;
    margin: 20px;
    border-radius: 8px;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 15px;
`;

//Upload Different images ,dont same image Continuously
const ImageUpload = ({ onUploadSuccess }) => {
    const [file, setFile] = useState(null);
    const [orientation, setOrientation] = useState('landscape');
    console.log(file)
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file) return;

        const formData = new FormData();
        formData.append('image', file);
        formData.append('orientation', orientation);

        try {
            await axios.post('http://localhost:5000/api/images/upload', formData);
            onUploadSuccess();
            setFile(null);
        } catch (error) {
            console.error('Upload error:', error);
        }
    };

    return (
        <UploadContainer>
        <p>Image size should not be more than 5mb</p>

            <Form onSubmit={handleSubmit}>
                <input
                    type="file"
                    accept=".jpg,.jpeg,.png"
                    onChange={(e) => setFile(e.target.files[0])}
                />
                <select
                    value={orientation}
                    onChange={(e) => setOrientation(e.target.value)}
                >
                    <option value="landscape">Landscape</option>
                    <option value="portrait">Portrait</option>
                </select>
                <button type="submit">Upload</button>
            </Form>
        </UploadContainer>
    );
};

export default ImageUpload;