import { getCertificates } from './content-actions';
import { AddCertificateForm, CertificateList } from './CertificateForms';

export default async function CertificateManager() {
  const certificates = await getCertificates();

  return (
    <div>
      <AddCertificateForm />
      <CertificateList certificates={certificates} />
    </div>
  );
}
