import type { Metadata } from 'next';
import PageComponent from '@/components/pages/Contact';
export const metadata: Metadata = { title: 'Contact & Get a Quote', description: 'Contact Design Architecture for architectural design inquiries and project quotations.', alternates: { canonical: '/contact' } };
export default function Page(){return <PageComponent/>}
