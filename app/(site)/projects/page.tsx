import type { Metadata } from 'next';
import PageComponent from '@/components/pages/Projects';
export const metadata: Metadata = { title: 'Architecture Projects', description: 'Browse selected architecture and design projects by Design Architecture.', alternates: { canonical: '/projects' } };
export default function Page(){return <PageComponent/>}
