import type { Metadata } from 'next';
import PageComponent from '@/components/pages/About';
export const metadata: Metadata = { title: 'About Us', description: 'Learn about Design Architecture and our approach to modern, functional architectural design.', alternates: { canonical: '/about' } };
export default function Page(){return <PageComponent/>}
