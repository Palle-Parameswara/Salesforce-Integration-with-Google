# Salesforce-Integration-with-Google

Here are the complete steps for integrating Google Vision API with Salesforce, including Google Cloud Setup, Salesforce Setup, Authentication, Named Credentials, and External Credentials.

---

### **Google Cloud Setup**:

#### **1. Create a Google Cloud Project:**
   - Go to the Google Cloud Console.
   - Click on **Select a Project** and then click **New Project**.
   - Enter a name for the project and select a billing account (if needed), then click **Create**.

#### **2. Enable the Vision API:**
   - In the Google Cloud Console, navigate to **API & Services > Library**.
   - Search for **Cloud Vision API** and click on the Cloud Vision API card, then click **Enable** to activate it for your project.

#### **3. Create OAuth 2.0 Credentials:**
   - Go to **APIs & Services > Credentials**.
   - Click on **Create Credentials**, then choose **OAuth 2.0 Client IDs**.
   - Set the **Application type** to **Web application**.
   - Under **Authorized JavaScript origins**, add `https://<your Salesforce domain>`.
   - Under **Authorized redirect URIs**, add `https://<your Salesforce domain>/services/authcallback/GoogleVisionAPI`.
   - Save the **Client ID** and **Client Secret** that are generated.

#### **4. OAuth Consent Screen Setup:**
   - Go to **APIs & Services > OAuth consent screen**.
   - Fill in the **Application name**, **User support email**, **App logo** (optional), and other necessary information.
   - Add **salesforce.com** in the **Authorized domains**.
   - Save the consent screen.

#### **5. Create a Test User for Salesforce:**
   - In the Google Cloud Console, navigate to **IAM & Admin > Service Accounts**.
   - Add a new service account and associate it with the project.
   - After adding the service account, assign roles (e.g., **Viewer** or **Editor**).
   - Under **Add Members**, add your **Salesforce user email** (e.g., `palle@self.de`) and provide the necessary permissions.
   - Download the **JSON key file** for the service account.

#### **6. Create the API Key (Optional):**
   - For testing purposes, you can create an API key by going to **Credentials > Create Credentials > API Key**.

---

### **Salesforce Setup**:

#### **Step 1: Create an Auth Provider in Salesforce**
You have already created the Auth Provider successfully with the necessary details. Let's review what needs to be configured.

**Auth Provider Settings:**
   - **Provider Type**: Google
   - **Name**: GoogleVisionAPI
   - **URL Suffix**: GoogleVisionAPI
   - **Consumer Key**: Enter the **Client ID** from Google Cloud OAuth credentials.
   - **Consumer Secret**: Enter the **Client Secret** from Google Cloud OAuth credentials.
   - **Authorize Endpoint URL**: `https://accounts.google.com/o/oauth2/v2/auth`
   - **Token Endpoint URL**: `https://accounts.google.com/o/oauth2/token`
   - **User Info Endpoint URL**: `https://www.googleapis.com/oauth2/v3/userinfo`
   - **Use Proof Key for Code Exchange (PKCE) Extension**: Checked (Important for improved security).
   - **Default Scopes**: `https://www.googleapis.com/auth/cloud-vision` (ensures access to Vision API).
   - **Include Consumer Secret in SOAP API Responses**: Checked (This ensures that the consumer secret is returned in SOAP responses).
   - **Callback URL**: `https://selfde-dev-ed.develop.my.salesforce.com/services/authcallback/GoogleVisionAPI` (This is the callback URL that Google uses after authentication).
   - **Test-Only Initialization URL**: `https://selfde-dev-ed.develop.my.salesforce.com/services/auth/test/GoogleVisionAPI` (Used to test the connection).
   - **Existing User Linking URL**: `https://selfde-dev-ed.develop.my.salesforce.com/services/auth/link/GoogleVisionAPI`
   - **OAuth-Only Initialization URL**: `https://selfde-dev-ed.develop.my.salesforce.com/services/auth/oauth/GoogleVisionAPI`
   - **Single Logout URL**: `https://selfde-dev-ed.develop.my.salesforce.com/services/auth/rp/oidc/logout` (Used for logging out).

#### **Step 2: Create a Named Credential in Salesforce**
Next, let's configure the Named Credential, which provides the connection details for Salesforce to communicate with Google Vision API.

**Named Credential Configuration:**
   - **Label**: Google Vision API
   - **Name**: Google_Vision_API
   - **URL**: `https://vision.googleapis.com` (This is the base URL for the Google Vision API).
   - **Enabled for Callouts**: Make sure this is checked, as it allows callouts to external systems.
   - **Authentication:**
     - **External Credential**: Google Vision API (Select the external credential you created earlier).
     - **Authentication Flow Type**: Browser Flow (Allows OAuth authentication).
     - **Scope**: `https://www.googleapis.com/auth/cloud-vision` (Ensure the scope is set to allow access to Google Vision API).
   - **Generate Authorization Header**: Ensure this option is checked, so that the necessary authorization header is included in each API request.
   - **Allow Formulas in HTTP Header/Body**: You can enable these options if you need dynamic content in headers or bodies.

#### **Step 3: Create External Credentials for OAuth Authentication**
**External Credential Configuration:**
   - **Label**: Google Vision API
   - **Name**: Google_Vision_API
   - **Authentication Protocol**: OAuth 2.0
   - **Authentication Flow Type**: Browser Flow
   - **Scope**: `https://www.googleapis.com/auth/cloud-vision`
   - **Identity Provider**: GoogleVisionAPI (This links the external credential to the Salesforce Auth Provider created earlier).
   - **Callout Options:**
     - Enable **Allow Callouts**.
     - Enable **Generate Authorization Header**.
   - **Principals**: Add the principals required for authorization, e.g., Named Principal.

---

### **Apex Code for Google Vision API Integration:**

**Apex Class for Image Analysis:**GoogleVisionAPIController



### **Lightning Web Component (LWC) Setup:**
 GoogleVision


### **Steps to Integrate and Test**:

1. Create **Named Credentials** in Salesforce as described above.
2. Create the **Apex class** (`GoogleVisionAPIController`) in Salesforce.
3. Deploy the **LWC** to a page or Salesforce app for interaction.

---

### **Test the Integration**:

1. Upload an image and trigger the image analysis.
2. View the results of the Google Vision API in the component.

---

These steps should provide a complete integration of the **Google Vision API** with **Salesforce**, including OAuth setup, Named Credentials, and Image Analysis.
