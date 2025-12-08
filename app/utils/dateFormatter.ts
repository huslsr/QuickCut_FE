export const formatDate = (dateString: string | Date | undefined): string => {
    if (!dateString) return '';
    const date = new Date(dateString);

    // Example: 09 Dec 2025, 02:30 PM
    return date.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    });
};
