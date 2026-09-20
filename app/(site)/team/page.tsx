import type { Metadata } from 'next';
import PageComponent from '@/components/pages/Team';
export const metadata: Metadata = { title: 'Our Team', description: 'Design Architecture — modern architectural design and project solutions in Sri Lanka.', alternates: { canonical: '/team' } };
export default function Page(){return <PageComponent/>}
