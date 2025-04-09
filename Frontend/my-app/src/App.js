import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ImageUpload from './components/imageUpload';
import ImageGrid from './components/ImageGrid';
import styled from 'styled-components';

const Container = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
`;
const Title = styled.div`
    display:flex;
    justify-content:center;
    font-size: 40px;
    font-weight: bold;
    padding: 20px;
`;

const App = () => {
      const [images, setImages] = useState([]);

    const fetchImages = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/images');
            setImages(response.data);
        } catch (error) {
            console.log('Error fetching images:', error);
        }
    };

    useEffect(() => {
        fetchImages();
    }, []);

    return (
        <Container>
            <Title>Image Gallery</Title>
            <ImageUpload onUploadSuccess={fetchImages} />
            <ImageGrid images={images} />
        </Container>
    );
};

export default App;