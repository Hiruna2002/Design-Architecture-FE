import type { Metadata } from 'next';
import PageComponent from '@/components/pages/Process';
export const metadata: Metadata = { title: 'Our Design Process', description: 'See our architectural design process from consultation to completion.', alternates: { canonical: '/process' } };
export default function Page(){return <PageComponent/>}
