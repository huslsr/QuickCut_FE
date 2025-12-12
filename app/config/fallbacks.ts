export const CATEGORY_FALLBACK_IMAGES: Record<string, string> = {
    'Business': 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800',
    'Technology': 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&q=80&w=800',
    'World': 'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&q=80&w=800',
    'Politics': 'https://images.unsplash.com/photo-1555848962-6e79363ec58f?auto=format&fit=crop&q=80&w=800',
    'Entertainment': 'https://images.unsplash.com/photo-1603190287605-e6ade32fa852?auto=format&fit=crop&q=80&w=800',
    'Science': 'https://images.unsplash.com/photo-1507413245164-6160d8298b31?auto=format&fit=crop&q=80&w=800',
    'Health': 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&q=80&w=800',
    'Sports': 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&q=80&w=800',
    'General': 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&q=80&w=800'
};

export const getFallbackImage = (categoryName: string): string => {
    return CATEGORY_FALLBACK_IMAGES[categoryName] || CATEGORY_FALLBACK_IMAGES['General'];
};
