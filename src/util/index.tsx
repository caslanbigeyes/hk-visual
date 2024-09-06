
const hexToRgba = (hex, alpha) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};



const formatCount = (count, type) => {
    const numberCount = Number(count);

    if (!type) {
        if (numberCount < 1000) {
            return numberCount;
        } else {
            return Math.floor(numberCount / 1000); // 不保留小数
        }
    } else if (type === 'total' && numberCount > 10000000) {
        return Math.floor(numberCount / 1000); // 不保留小数
    } else {
        return numberCount;
    }
};

export { hexToRgba, formatCount }

