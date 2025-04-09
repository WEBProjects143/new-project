const Image = require('../models/Image');

exports.uploadImage = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        const { orientation } = req.body;
        const getImages = await Image.find().sort('createdAt');
        let position = await calculateGridPosition(orientation, getImages.length + 1, getImages);  // Calculating image position

        const image = new Image({
            filename: req.file.filename,
            path: req.file.path,
            orientation,
            position
        });

        await image.save();
        res.status(201).json(image);
    } catch (error) {
        console.error('Upload error:', error);
        res.status(500).json({ message: error.message });
    }
};

exports.getImages = async (req, res) => {
    try {
        const images = await Image.find().sort('position');
        res.json(images);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

async function calculateGridPosition(currentImageOrientation, imageNumber, images) {
    const firstImage = images[0];
    const firstImageOrientation = firstImage ? firstImage.orientation : currentImageOrientation;

    const positionMappings = {
        landscape: {
            sequence: {
                landscape: [1, null, 4, null, 7],
                portrait: [null, 2, 3, null, 5, 6]
            }
        },
        portrait: {
            sequence: {
                portrait: [1, 2, null, 4, 5],
                landscape: [null, 3, null, 6, null, 9]
            }
        }
    };

    const layoutSequence = positionMappings[firstImageOrientation].sequence;
    const orientationSequence = layoutSequence[currentImageOrientation];

    let position = null;
    const usedPositions = images.map(img => img.position);

    for (const pos of orientationSequence) {
        if (pos && !usedPositions.includes(pos)) {
            position = pos;
            break;
        }
    };
    
    if (!position) {
        position = Math.max(...usedPositions, 0) + 1;
    }

    return position;
}