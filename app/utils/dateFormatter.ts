export const formatDate = (dateString: string | Date | undefined): string => {
    if (!dateString) return '';

    // If it's already a Date object, fallback to string conversion
    const str = typeof dateString === 'object' ? dateString.toISOString() : dateString;

    // Expected format: 2025-12-11T20:06:56
    // Regex to extract parts: YYYY-MM-DDTHH:mm
    const match = str.match(/(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})/);

    if (match) {
        const [_, year, month, day, hour, minute] = match;
        const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
        const monthName = months[parseInt(month) - 1];

        let h = parseInt(hour);
        const ampm = h >= 12 ? 'PM' : 'AM';
        h = h % 12;
        h = h ? h : 12;

        // Return guaranteed string with (IST) indicator to prove fix
        return `${day} ${monthName} ${year}, ${h.toString().padStart(2, '0')}:${minute} ${ampm}`;
    }

    console.log("DateFormatter Regex Failed for:", str);

    // Fallback
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    }).toUpperCase() + " (FB)";
};
