export function trim(value) {
    return value
        .replace(/^\s+/, '')
        .replace(/\s+$/, '')
        .replace(/\s{2,}/g, ' ');
}