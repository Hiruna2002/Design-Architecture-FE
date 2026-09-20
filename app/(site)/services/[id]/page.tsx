import { notFound } from 'next/navigation';
import ServicePage, {
  Service,
} from '@/components/pages/Service';

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  'https://design-architecture-be.vercel.app';

async function getService(
  id: string
): Promise<Service | null> {
  try {
    const response = await fetch(
      `${API_URL}/api/services/${id}`,
      {
        next: {
          revalidate: 60,
        },
      }
    );

    if (!response.ok) {
      console.error(
        'Failed to fetch service:',
        response.status
      );

      return null;
    }

    return await response.json();
  } catch (error) {
    console.error(
      'Error fetching service:',
      error
    );

    return null;
  }
}

export async function generateMetadata({
  params,
}: PageProps) {
  const { id } = await params;

  const service = await getService(id);

  if (!service) {
    return {
      title: 'Service Not Found',
    };
  }

  return {
    title: `${service.name} | Design Architecture`,
    description: service.desc,
  };
}

export default async function Page({
  params,
}: PageProps) {
  const { id } = await params;

  const service = await getService(id);

  if (!service) {
    notFound();
  }

  return <ServicePage service={service} />;
}