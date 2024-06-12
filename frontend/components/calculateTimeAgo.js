function calculateTimeAgo(date) {
    const postDate = new Date(date);
    const now = new Date();
    const diff = now - postDate;

    const minute = 60 * 1000;
    const hour = 60 * minute;
    const day = 24 * hour;
    const month = 30 * day;
    const year = 12 * month;

    if (diff < hour) {
        const minutes = Math.floor(diff / minute);
        return `${minutes}min`;
    } else if (diff < day) {
        const hours = Math.floor(diff / hour);
        return `${hours}h`;
    } else if (diff < month) {
        const days = Math.floor(diff / day);
        if(day === 1) return `${days} Tag`;
        return `${days} Tagen`;
    } else if (diff < year) {
        const months = Math.floor(diff / month);
        if(day === 1) return `${months} Monat`;
        return `${months} Monaten`;
    } else {
        const years = Math.floor(diff / year);
        if(day === 1) return `${years} Jahr`;
        return `${years} Jahren`;
    }
}

export default calculateTimeAgo;

