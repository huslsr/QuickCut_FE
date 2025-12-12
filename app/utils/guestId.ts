export const getGuestId = (): string => {
    if (typeof window === 'undefined') return 'server-side-guest';

    const STORAGE_KEY = 'quickcut_guest_id';
    let guestId = localStorage.getItem(STORAGE_KEY);

    if (!guestId) {
        guestId = 'guest_' + Math.random().toString(36).substr(2, 9) + Date.now().toString(36);
        localStorage.setItem(STORAGE_KEY, guestId);
    }

    return guestId;
};
