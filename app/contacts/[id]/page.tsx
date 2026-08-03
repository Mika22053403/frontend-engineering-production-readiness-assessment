import ContactDetailsPage from "@/features/contacts/components/contact-details-page";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <ContactDetailsPage id={id} />;
}
