import type { Metadata } from 'next';
import PageComponent from '@/components/pages/Feedback';
export const metadata: Metadata = { title: 'Client Feedback', description: 'Design Architecture — modern architectural design and project solutions in Sri Lanka.', alternates: { canonical: '/feedback' } };
export default function Page(){return <PageComponent/>}
