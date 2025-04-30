import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  :root {
    --primary-color: #6a11cb;
    --secondary-color: #2575fc;
    --accent-color: #ff4d4d;
    --background-dark: #121212;
    --background-darker: #0a0a0a;
    --text-light: #ffffff;
    --text-dim: #b3b3b3;
    --success-color: #4caf50;
    --warning-color: #ff9800;
    --error-color: #f44336;
    --border-radius: 8px;
    --card-shadow: 0 4px 20px rgba(0, 0, 0, 0.25);
    --neon-glow: 0 0 10px rgba(106, 17, 203, 0.7), 0 0 20px rgba(106, 17, 203, 0.5);
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Montserrat', 'Roboto', sans-serif;
    background: var(--background-dark);
    color: var(--text-light);
    line-height: 1.6;
    min-height: 100vh;
    overflow-x: hidden;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: 'Orbitron', 'Montserrat', sans-serif;
    font-weight: 700;
    margin-bottom: 1rem;
    letter-spacing: 0.5px;
  }

  a {
    color: var(--secondary-color);
    text-decoration: none;
    transition: color 0.3s ease;
    
    &:hover {
      color: var(--primary-color);
    }
  }

  button {
    cursor: pointer;
    font-family: 'Montserrat', sans-serif;
    font-weight: 600;
  }

  /* Custom scrollbar */
  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: var(--background-darker);
  }

  ::-webkit-scrollbar-thumb {
    background: var(--primary-color);
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: var(--secondary-color);
  }

  /* Animations */
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  @keyframes slideUp {
    from { transform: translateY(20px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }

  @keyframes pulse {
    0% { box-shadow: 0 0 0 0 rgba(106, 17, 203, 0.7); }
    70% { box-shadow: 0 0 0 10px rgba(106, 17, 203, 0); }
    100% { box-shadow: 0 0 0 0 rgba(106, 17, 203, 0); }
  }

  @keyframes neonFlicker {
    0%, 19%, 21%, 23%, 25%, 54%, 56%, 100% {
      text-shadow: 0 0 5px var(--primary-color), 0 0 10px var(--primary-color), 0 0 15px var(--primary-color);
    }
    20%, 24%, 55% {
      text-shadow: none;
    }
  }
`;

export default GlobalStyles;
