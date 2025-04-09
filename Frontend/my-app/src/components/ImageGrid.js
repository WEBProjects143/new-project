import React from 'react';
import styled from 'styled-components';

//Image Grid styling
const GridContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 15px;
    padding: 20px;
    max-width: 1200px;
    margin: 0 auto;
`;

const ImageItem = styled.div`
    position: relative;
    width: 100%;
    height: ${props => props.orientation === 'landscape' ? '250px' : '300px'};

    ${props => {
        const { position, firstImageOrientation } = props;
        
        // Layout for landscape first image
        if (firstImageOrientation === 'landscape') {
            switch (position) {
                case 1: // First landscape
                    return 'grid-column: 1 / span 6;';
                case 2: // Second portrait
                case 3: // Fourth portrait
                    return 'grid-column: span 3;';
                case 4: // Third landscape
                    return 'grid-column: 1 / span 6;';
                case 5: // Sixth portrait
                case 6: // Seventh portrait
                    return 'grid-column: span 3;';
                case 7: // Fifth landscape
                    return 'grid-column: 1 / span 6;';
                default:
                    return 'grid-column: span 3;';
            }
        }
        // Layout for portrait first image
        else {
            switch (position) {
                case 1: // First portrait
                case 2: // Third portrait
                    return 'grid-column: span 3;';
                case 3: // Second landscape
                    return 'grid-column: 1 / span 6;';
                case 4: // Fifth portrait
                case 5: // Seventh portrait
                    return 'grid-column: span 3;';
                case 6: // Fourth landscape
                case 9: // Sixth landscape
                    return 'grid-column: 1 / span 6;';
                default:
                    return 'grid-column: span 3;';
            }
        }
    }}

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
`;

const ImageGrid = ({ images }) => {
    // Get first image orientation
    const firstImageOrientation = images[0]?.orientation || 'landscape';

    return (
        <GridContainer>
            {images.map((image) => (
                <ImageItem 
                    key={image._id}
                    orientation={image.orientation}
                    position={image.position}
                    firstImageOrientation={firstImageOrientation}
                >
                    <img src={`http://localhost:5000/${image.path}`} alt={image.filename} />
                </ImageItem>
            ))}
        </GridContainer>
    );
};

export default ImageGrid;