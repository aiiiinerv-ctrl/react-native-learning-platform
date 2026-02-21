import { workshops } from '@/data/workshops';
import WorkshopPageClient from './WorkshopPageClient';

export function generateStaticParams() {
    return workshops.map(w => ({ workshopId: w.id }));
}

export default function WorkshopPage({ params }: { params: Promise<{ workshopId: string }> }) {
    return <WorkshopPageClient params={params} />;
}
