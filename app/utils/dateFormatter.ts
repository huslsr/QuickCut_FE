export const formatDate = (dateString: string | Date | undefined): string => {
    if (!dateString) return '';

    try {
        // Convert input to string if it's a Date object
        let str = typeof dateString === 'object' ? dateString.toISOString() : dateString;

        // If the date string looks like an ISO date but has no timezone info (no Z or +),
        // we append 'Z' to treat it as UTC.
        // Backend (Java/Mongo) sends LocalDateTime which is implicitly UTC but lacks the 'Z' suffix in JSON.
        // Example input: "2025-12-11T20:06:56" -> Treat as "2025-12-11T20:06:56Z"
        if (str.includes('T') && !str.endsWith('Z') && !str.includes('+')) {
            str += 'Z';
        }

        const date = new Date(str);

        // Check if date is valid
        if (isNaN(date.getTime())) {
            // Fallback for weird formats, just return as is or empty
            return String(dateString);
        }

        // Format to user's local timezone (e.g., IST if user is in India)
        return date.toLocaleString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        }).toUpperCase();

    } catch (e) {
        console.error("Date formatting error:", e);
        return String(dateString);
    }
};
