import { LightningElement } from 'lwc';
import analyzeImage from '@salesforce/apex/GoogleVisionAPIController.analyzeImage';

export default class GoogleVision extends LightningElement {
    imageUrl = '';
    analysisResult = '';
    imageBase64 = '';

    handleImageUpload(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                this.imageBase64 = reader.result.split(',')[1]; // Get base64 string from image
                this.imageUrl = reader.result; // Preview image
            };
            reader.readAsDataURL(file); // Read the image as base64 string
        }
    }

    handleAnalyzeImage() {
        if (this.imageBase64) {
            analyzeImage({ base64Image: this.imageBase64 })
                .then(result => {
                    try {
                        let parsedResult = JSON.parse(result);
                        
                        // Check if labelAnnotations exist and have data
                        if (parsedResult.responses && parsedResult.responses[0] && parsedResult.responses[0].labelAnnotations) {
                            let labels = parsedResult.responses[0].labelAnnotations;
                            let labelText = labels.map(label => label.description).join(', ');
                            this.analysisResult = `Detected Labels: ${labelText}`;
                        } else {
                            this.analysisResult = 'No labels detected in the image.';
                        }
                    } catch (error) {
                        this.analysisResult = 'Error parsing the response from the API.';
                    }
                })
                .catch(error => {
                    this.analysisResult = 'Error: ' + error.body.message;
                });
        } else {
            this.analysisResult = 'Please upload an image first.';
        }
    }

    handleCancel() {
        this.imageUrl = '';
        this.analysisResult = '';
        this.imageBase64 = '';
    }
}