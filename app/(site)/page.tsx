import type { Metadata } from 'next';
import PageComponent from '@/components/pages/Home';
export const metadata: Metadata = { title: 'Home | Architectural Design Sri Lanka', description: 'Design Architecture — modern architectural design and project solutions in Sri Lanka.', alternates: { canonical: '/' } };
export default function Page(){return <PageComponent/>}
