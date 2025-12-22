import type { Metadata } from 'next';
import LocationsContent from '@/components/locations/LocationsContent';

export const metadata: Metadata = {
    title: 'Locations | MusicEvolution14',
    description: 'Location de matériel de décoration et mobilier événementiel pour mariages, anniversaires et soirées en Normandie.',
};

export default function Locations() {
    return (
        <LocationsContent />
    );
}
