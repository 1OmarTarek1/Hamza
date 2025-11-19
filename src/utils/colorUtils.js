// Common color names mapping
const colorMap = {
  // Basic colors
  '#000000': 'Black',
  '#ffffff': 'White',
  '#ff0000': 'Red',
  '#00ff00': 'Green',
  '#0000ff': 'Blue',
  '#ffff00': 'Yellow',
  '#00ffff': 'Cyan',
  '#ff00ff': 'Magenta',
  '#808080': 'Gray',
  '#c0c0c0': 'Silver',
  // Common curtain colors
  '#f5f5dc': 'Beige',
  '#f0e68c': 'Khaki',
  '#d2b48c': 'Tan',
  '#a0522d': 'Sienna',
  '#8b4513': 'Brown',
  '#800000': 'Maroon',
  '#ffd700': 'Gold',
  '#daa520': 'Goldenrod',
  '#b8860b': 'Dark Goldenrod',
  '#faf0e6': 'Linen'
};

// Function to get color name from hex code
export const getColorName = (hexColor) => {
  // Convert to lowercase for case-insensitive matching
  const normalizedHex = hexColor.toLowerCase();
  return colorMap[normalizedHex] || `Color (${hexColor})`;
};
