import type { Metadata } from 'next';
import PageComponent from '@/components/pages/ProductDetails';
export const metadata: Metadata={title:'Project Details',robots:{index:true,follow:true}};
export default function Page(){return <PageComponent/>}
