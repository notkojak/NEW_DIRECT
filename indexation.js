import { index } from 'google-indexing-script'
import serviceAccount from './i1.json' with { type: 'json' } // À remplacer par le chemin de votre fichier JSON


index('marineblog.net', {
  client_email: serviceAccount.client_email,
  private_key: serviceAccount.private_key,
  quota: {
    rpmRetry: true
  }
})
  .then(console.log)
  .catch(console.error)
