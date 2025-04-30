import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import { FaUser, FaWallet, FaBars, FaTimes } from 'react-icons/fa';
import Container from './Container';
import Button from './Button';
import Flex from './Flex';

const NavbarContainer = styled.header`
  background-color: rgba(10, 10, 10, 0.95);
  backdrop-filter: blur(10px);
  position: sticky;
  top: 0;
  z-index: 100;
  padding: 1rem 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
`;

const Logo = styled(Link)`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 1.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textLight};
  text-decoration: none;
  display: flex;
  align-items: center;
  
  span {
    background: ${({ theme }) => theme.colors.gradients.primary};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: neonFlicker 5s infinite alternate;
  }
`;

const NavLinks = styled.nav<{ isOpen: boolean }>`
  display: flex;
  align-items: center;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    position: fixed;
    top: 0;
    right: 0;
    height: 100vh;
    width: 250px;
    flex-direction: column;
    background: ${({ theme }) => theme.colors.backgroundDarker};
    padding: 2rem;
    transform: ${({ isOpen }) => isOpen ? 'translateX(0)' : 'translateX(100%)'};
    transition: transform 0.3s ease;
    z-index: 200;
    justify-content: flex-start;
    box-shadow: -5px 0 15px rgba(0, 0, 0, 0.3);
  }
`;

const NavLink = styled(Link)<{ active?: boolean }>`
  color: ${({ active, theme }) => active ? theme.colors.primary : theme.colors.textLight};
  margin: 0 1rem;
  text-decoration: none;
  font-weight: 500;
  position: relative;
  transition: color 0.3s ease;
  
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: ${({ active }) => active ? '100%' : '0'};
    height: 2px;
    background: ${({ theme }) => theme.colors.gradients.primary};
    transition: width 0.3s ease;
  }
  
  &:hover::after {
    width: 100%;
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    margin: 1rem 0;
  }
`;

const MobileMenuButton = styled.button`
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.colors.textLight};
  font-size: 1.5rem;
  cursor: pointer;
  display: none;
  z-index: 300;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: block;
  }
`;

const Overlay = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 150;
  opacity: ${({ isOpen }) => isOpen ? 1 : 0};
  visibility: ${({ isOpen }) => isOpen ? 'visible' : 'hidden'};
  transition: opacity 0.3s ease, visibility 0.3s ease;
`;

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  const closeMenu = () => {
    setIsMenuOpen(false);
  };
  
  return (
    <NavbarContainer>
      <Container>
        <Flex justify="space-between" align="center">
          <Logo to="/">
            <span>Guess</span>Battle
          </Logo>
          
          <MobileMenuButton onClick={toggleMenu}>
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </MobileMenuButton>
          
          <NavLinks isOpen={isMenuOpen}>
            <NavLink to="/" active={location.pathname === '/'} onClick={closeMenu}>
              Home
            </NavLink>
            <NavLink to="/how-to-play" active={location.pathname === '/how-to-play'} onClick={closeMenu}>
              How to Play
            </NavLink>
            <NavLink to="/leaderboard" active={location.pathname === '/leaderboard'} onClick={closeMenu}>
              Leaderboard
            </NavLink>
            <NavLink to="/dashboard" active={location.pathname.includes('/dashboard')} onClick={closeMenu}>
              Dashboard
            </NavLink>
            
            <Flex gap="0.5rem" style={{ marginLeft: '1rem' }}>
              <Button variant="outline" size="small" onClick={closeMenu}>
                <FaUser style={{ marginRight: '0.5rem' }} /> Login
              </Button>
              <Button variant="primary" size="small" onClick={closeMenu}>
                <FaWallet style={{ marginRight: '0.5rem' }} /> Sign Up
              </Button>
            </Flex>
          </NavLinks>
        </Flex>
      </Container>
      
      <Overlay isOpen={isMenuOpen} onClick={closeMenu} />
    </NavbarContainer>
  );
};

export default Navbar;
