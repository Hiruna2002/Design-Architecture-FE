import type { Metadata } from 'next';
import PageComponent from '@/components/pages/Service';
export const metadata: Metadata = { title: 'Architectural Services', description: 'Explore our architectural design and planning services.', alternates: { canonical: '/services' } };
export default function Page(){return <PageComponent/>}
