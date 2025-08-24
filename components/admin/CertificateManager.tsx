import { getCertificates } from './content-actions';
import { CertificateEditor } from './CertificateForms';

export default async function CertificateManager() {
  const certificates = await getCertificates();

  return (
    <CertificateEditor certificates={certificates} />
  );
}
