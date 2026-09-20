import type { Metadata } from 'next';
import PageComponent from '@/components/pages/LoginPage';
export const metadata: Metadata = { title: 'Login', description: 'Design Architecture — modern architectural design and project solutions in Sri Lanka.', alternates: { canonical: '/login' } };
export default function Page(){return <PageComponent/>}
