import { JWT } from "google-auth-library";
import { google } from "googleapis";
import serviceAccount from "./i1.json" with { type: "json" };

const cleanPrivateKey = serviceAccount.private_key.replace(/\\n/g, '\n');

async function diagnoseServiceAccount() {
  console.log("=== Service Account Diagnosis ===");
  console.log("Project ID:", serviceAccount.project_id);
  console.log("Client Email:", serviceAccount.client_email);
  console.log("Client ID:", serviceAccount.client_id);
  console.log("Private Key ID:", serviceAccount.private_key_id);
  
  // Test with different scopes
  const scopes = [
    'https://www.googleapis.com/auth/indexing',
    'https://www.googleapis.com/auth/webmasters',
    'https://www.googleapis.com/auth/siteverification'
  ];
  
  for (const scope of scopes) {
    try {
      console.log(`\nTesting scope: ${scope}`);
      
      const jwtClient = new JWT({
        email: serviceAccount.client_email,
        key: cleanPrivateKey,
        scopes: [scope]
      });

      const tokens = await jwtClient.authorize();
      console.log(`✓ Scope ${scope} - SUCCESS`);
      
      // Test token info
      const response = await fetch(`https://www.googleapis.com/oauth2/v2/tokeninfo?access_token=${tokens.access_token}`);
      const tokenInfo = await response.json();
      console.log("Token info:", tokenInfo);
      
    } catch (error) {
      console.log(`✗ Scope ${scope} - FAILED: ${error.message}`);
    }
  }
}

diagnoseServiceAccount();
