import { index } from "google-indexing-script";
import serviceAccount from "./i1.json" with { type: "json" };

index("marineblog.net", {
  client_email: serviceAccount.client_email,
  private_key: serviceAccount.private_key,
})
  .then(console.log)
  .catch(console.error);
