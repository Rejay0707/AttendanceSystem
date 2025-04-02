export const compareFaces = async (capturedImageData, storedFaceData) => {
    // Load models
    await faceapi.nets.ssdMobilenetv1.loadFromUri('/models');
    await faceapi.nets.faceRecognitionNet.loadFromUri('/models');

    // Detect faces and compute descriptors
    const capturedFaceDetection = await faceapi.detectSingleFace(capturedImageData).withFaceLandmarks().withFaceDescriptor();
    const storedFaceDetection = await faceapi.detectSingleFace(storedFaceData).withFaceLandmarks().withFaceDescriptor();

    // Check for detected faces
    if (!capturedFaceDetection || !storedFaceDetection) {
        throw new Error('No face detected in one or both images');
    }

    // Calculate Euclidean distance
    const distance = faceapi.euclideanDistance(capturedFaceDetection.descriptor, storedFaceDetection.descriptor);

    // Determine similarity
    const threshold = 0.6; // Example threshold
    return distance < threshold; // Returns true if faces are similar
};