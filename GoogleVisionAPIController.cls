public class GoogleVisionAPIController {

    @AuraEnabled(cacheable=true)
    public static String analyzeImage(String base64Image) {
        if (String.isEmpty(base64Image)) {
            return 'Error: No image data provided.';
        }

        String endpoint = 'https://vision.googleapis.com/v1/images:annotate';
        String requestBody = '{"requests":[{"image":{"content":"' + base64Image + '"},"features":[{"type":"LABEL_DETECTION","maxResults":5}]}]}';

        // Create HTTP request using Named Credentials
        HttpRequest req = new HttpRequest();
        req.setEndpoint('callout:Google_Vision_API/v1/images:annotate'); // Using Named Credential
        req.setMethod('POST');
        req.setHeader('Content-Type', 'application/json');
        req.setBody(requestBody);

        // Send the request
        Http http = new Http();
        HttpResponse res = http.send(req);

        // Handle the response
        if (res.getStatusCode() == 200) {
            return res.getBody(); // Return the response from Vision API
        } else {
            // Log and return error if API call fails
            return 'Error: ' + res.getStatusCode() + ' - ' + res.getBody();
        }
    }
}