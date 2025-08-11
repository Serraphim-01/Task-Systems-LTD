import { partners } from "@/lib/data/partners";
import PartnerClient from "./partner-client";

export async function generateStaticParams() {
  return partners.map((partner) => ({
    partnerName: partner.name.toLowerCase().replace(/ /g, "-"),
  }));
}

export default function PartnerPage({
  params,
}: {
  params: { partnerName: string };
}) {
  const partner = partners.find(
    (p) => p.name.toLowerCase().replace(/ /g, "-") === params.partnerName
  );

  if (!partner) {
    return <div>Partner not found</div>;
  }

  return <PartnerClient partner={partner} />;
}
