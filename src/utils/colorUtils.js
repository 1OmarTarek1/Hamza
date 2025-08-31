// Available color names and their codes - using lowercase for consistent matching
export const colorMap = {
  'أحمر': '#ff0000',
  'أخضر': '#00ff00',
  'أزرق': '#0000ff',
  'أصفر': '#ffff00',
  'أسود': '#000000',
  'أبيض': '#ffffff',
  'رمادي': '#808080',
  'وردي': '#ffc0cb',
  'برتقالي': '#ffa500',
  'بنفسجي': '#800080',
  'بني': '#a52a2a',
  'ذهبي': '#ffd700',
  'فضي': '#c0c0c0',
  'تركواز': '#40e0d0',
  'نيلي': '#4b0082',
  'كريمي': '#fffdd0',
  'بيج': '#f5f5dc',
  'خمري': '#800000',
  'كحلي': '#000080',
  'سماوي': '#87ceeb',
  'زيتوني': '#808000',
  'باستيل': '#fdfd96',
  'درجات': ['#gradient1', '#gradient2']
};

/**
 * Get color name from hex code - handles both direct matches and color variations
 * @param {string} colorCode - The color code to look up
 * @returns {string} The color name or 'مخصص' if not found
 */
export const getColorName = (colorCode) => {
  if (!colorCode) return 'مخصص';
  
  // Normalize the color code to lowercase for comparison
  const normalizedColor = colorCode.toLowerCase();
  
  // First try exact match
  const exactMatch = Object.entries(colorMap).find(([_, code]) => {
    if (Array.isArray(code)) {
      return code.some(c => c.toLowerCase() === normalizedColor);
    }
    return code.toLowerCase() === normalizedColor;
  })?.[0];
  
  return exactMatch || 'مخصص';
};

/**
 * Find color code by name (case insensitive)
 * @param {string} colorName - The color name to look up
 * @returns {string} The color code or null if not found
 */
export const findColorCode = (colorName) => {
  if (!colorName) return null;
  
  const normalizedSearch = colorName.trim().toLowerCase();
  
  const match = Object.entries(colorMap).find(([name]) => 
    name.toLowerCase() === normalizedSearch
  );
  
  return match ? (Array.isArray(match[1]) ? match[1][0] : match[1]) : null;
};
