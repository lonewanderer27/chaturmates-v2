const ColorPalette = [
  "#80cbc4", // Muted Teal
  "#b2ebf2", // Soft Cyan
  "#b3e5fc", // Light Blue
  "#ce93d8", // Soft Purple
  "#b39ddb", // Light Deep Purple
  "#9fa8da", // Light Indigo
  "#90caf9", // Soft Blue
  "#c5e1a5", // Muted Light Green
  "#a5d6a7", // Soft Green
  "#e6ee9c", // Light Lime
  "#ffe082", // Soft Amber
  "#ffcc80", // Soft Orange
  "#ffab91", // Light Deep Orange
  "#f48fb1", // Soft Pink
  "#ef9a9a", // Light Red
  "#d1c4e9", // Lavender
  "#cfd8dc", // Light Blue Grey
  "#ffecb3", // Light Yellow
  "#bcaaa4", // Light Brown
  "#e0e0e0", // Light Grey
];

// Function to get a random color from the palette
const getRandomColor = () => {
  return ColorPalette[Math.floor(Math.random() * ColorPalette.length)];
};

export default ColorPalette;
export { getRandomColor };