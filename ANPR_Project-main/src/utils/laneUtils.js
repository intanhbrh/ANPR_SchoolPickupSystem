/**
 * Formats the lane string to include Inner/Outer/Middle descriptions.
 * 
 * Mapping:
 * Lane 1 -> Outer
 * Lane 2 -> Middle
 * Lane 3 -> Inner
 * 
 * @param {string} laneString - The raw lane string (e.g., "Lane 1", "1", "Lane 2")
 * @param {function} t - The translation function from i18next
 * @returns {string} - The formatted string (e.g., "Lane 1 (Outer)")
 */
export const formatLane = (laneString, t) => {
    if (!laneString) return t('unknown');

    // Normalize string to check for numbers
    const lowerLane = laneString.toString().toLowerCase();

    if (lowerLane.includes('1')) {
        return `${laneString} (${t('outer')})`;
    } else if (lowerLane.includes('2')) {
        return `${laneString} (${t('middle')})`;
    } else if (lowerLane.includes('3')) {
        return `${laneString} (${t('inner')})`;
    }

    return laneString;
};
