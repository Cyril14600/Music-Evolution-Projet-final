'use client';

interface GalleryFiltersProps {
    currentFilter: string;
    onFilterChange: (filter: string) => void;
}

const CATEGORIES = ['all', 'mariage', 'anniversaire', 'soiree', 'entreprise'];

export default function GalleryFilters({ currentFilter, onFilterChange }: GalleryFiltersProps) {
    return (
        <div className="gallery-filters reveal">
            {CATEGORIES.map((cat) => (
                <button
                    key={cat}
                    className={`filter-btn ${currentFilter === cat ? 'active' : ''}`}
                    onClick={() => onFilterChange(cat)}
                >
                    {cat === 'all' ? 'Tous' : cat.charAt(0).toUpperCase() + cat.slice(1)}
                </button>
            ))}
        </div>
    );
}
