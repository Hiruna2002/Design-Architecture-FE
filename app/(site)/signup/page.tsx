import type { Metadata } from 'next';
import { SignUp as PageComponent } from '@/components/pages/SignupPage';
export const metadata: Metadata = { title: 'Create Account', description: 'Design Architecture — modern architectural design and project solutions in Sri Lanka.', alternates: { canonical: '/signup' } };
export default function Page(){return <PageComponent/>}
