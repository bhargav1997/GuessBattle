const theme = {
   colors: {
      primary: "#6a11cb",
      secondary: "#2575fc",
      accent: "#ff4d4d",
      backgroundDark: "#121212",
      backgroundDarker: "#0a0a0a",
      textLight: "#ffffff",
      textDim: "#b3b3b3",
      success: "#4caf50",
      warning: "#ff9800",
      error: "#f44336",
      gradients: {
         primary: "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)",
         secondary: "linear-gradient(135deg, #ff4d4d 0%, #f9cb28 100%)",
      },
   },
   fonts: {
      heading: "'Orbitron', 'Montserrat', sans-serif",
      body: "'Montserrat', 'Roboto', sans-serif",
   },
   borderRadius: "8px",
   shadows: {
      card: "0 4px 20px rgba(0, 0, 0, 0.25)",
      neonGlow: "0 0 10px rgba(106, 17, 203, 0.7), 0 0 20px rgba(106, 17, 203, 0.5)",
   },
   breakpoints: {
      mobile: "576px",
      tablet: "768px",
      desktop: "1024px",
      largeDesktop: "1440px",
   },
   transitions: {
      default: "0.2s ease", // Faster transition for better performance
      fast: "0.1s ease",
      slow: "0.4s ease",
   },
   spacing: {
      xs: "0.25rem",
      sm: "0.5rem",
      md: "1rem",
      lg: "1.5rem",
      xl: "2rem",
      xxl: "3rem",
   },
};

export default theme;
