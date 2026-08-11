import ContactDetailsPage from "@/features/contacts/components/contact-details-page";

interface ContactPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function Page({ params }: ContactPageProps) {
  const { id } = await params;

  return <ContactDetailsPage id={id} />;
}