import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaGoogle, FaEnvelope, FaLock, FaUser } from 'react-icons/fa';
import Container from '../components/Container';
import Card from '../components/Card';
import Button from '../components/Button';
import Input, { FormGroup, Label, ErrorMessage } from '../components/Input';
import Flex from '../components/Flex';

type AuthMode = 'login' | 'signup' | 'forgot';

const AuthContainer = styled.div`
  padding: 5rem 0;
  min-height: calc(100vh - 200px);
  background: linear-gradient(135deg, rgba(10, 10, 10, 0.9) 0%, rgba(18, 18, 18, 0.9) 100%),
    url('/auth-background.jpg') no-repeat center center;
  background-size: cover;
`;

const AuthCard = styled(Card)`
  max-width: 500px;
  margin: 0 auto;
  padding: 2.5rem;
`;

const AuthTitle = styled.h2`
  font-size: 2rem;
  text-align: center;
  margin-bottom: 2rem;
`;

const OrDivider = styled.div`
  display: flex;
  align-items: center;
  margin: 1.5rem 0;
  
  &::before, &::after {
    content: '';
    flex: 1;
    height: 1px;
    background: rgba(255, 255, 255, 0.1);
  }
  
  span {
    padding: 0 1rem;
    color: ${({ theme }) => theme.colors.textDim};
  }
`;

const SocialButton = styled(Button)`
  margin-bottom: 1rem;
`;

const AuthLink = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.primary};
  cursor: pointer;
  font-size: 0.875rem;
  text-decoration: underline;
  transition: color 0.3s ease;
  
  &:hover {
    color: ${({ theme }) => theme.colors.secondary};
  }
`;

const AuthFooter = styled.div`
  text-align: center;
  margin-top: 1.5rem;
  color: ${({ theme }) => theme.colors.textDim};
  font-size: 0.875rem;
`;

const AnimatedBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  z-index: -1;
`;

const FloatingNumber = styled(motion.div)`
  position: absolute;
  font-family: ${({ theme }) => theme.fonts.heading};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
  opacity: 0.1;
  font-size: ${() => `${Math.random() * 3 + 1}rem`};
`;

const AuthPage: React.FC = () => {
  const [mode, setMode] = useState<AuthMode>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (mode !== 'forgot') {
      if (!password) {
        newErrors.password = 'Password is required';
      } else if (password.length < 6) {
        newErrors.password = 'Password must be at least 6 characters';
      }
    }
    
    if (mode === 'signup' && !name) {
      newErrors.name = 'Name is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Handle form submission based on mode
      console.log('Form submitted:', { mode, email, password, name });
    }
  };
  
  const renderFloatingNumbers = () => {
    const numbers = [];
    for (let i = 0; i < 20; i++) {
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      const number = Math.floor(Math.random() * 100);
      
      numbers.push(
        <FloatingNumber
          key={i}
          initial={{ x: `${x}%`, y: `${y}%`, opacity: 0 }}
          animate={{ 
            y: [`${y}%`, `${y - 10}%`, `${y}%`],
            opacity: [0, 0.1, 0],
          }}
          transition={{ 
            repeat: Infinity, 
            duration: Math.random() * 5 + 5,
            delay: Math.random() * 5,
          }}
        >
          {number.toString().padStart(2, '0')}
        </FloatingNumber>
      );
    }
    return numbers;
  };
  
  return (
    <AuthContainer>
      <AnimatedBackground>
        {renderFloatingNumbers()}
      </AnimatedBackground>
      
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <AuthCard variant="elevated">
            <AuthTitle>
              {mode === 'login' && 'Welcome Back'}
              {mode === 'signup' && 'Create Account'}
              {mode === 'forgot' && 'Reset Password'}
            </AuthTitle>
            
            <form onSubmit={handleSubmit}>
              {mode === 'signup' && (
                <FormGroup>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    fullWidth
                    error={!!errors.name}
                  />
                  {errors.name && <ErrorMessage>{errors.name}</ErrorMessage>}
                </FormGroup>
              )}
              
              <FormGroup>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  fullWidth
                  error={!!errors.email}
                />
                {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
              </FormGroup>
              
              {mode !== 'forgot' && (
                <FormGroup>
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    fullWidth
                    error={!!errors.password}
                  />
                  {errors.password && <ErrorMessage>{errors.password}</ErrorMessage>}
                </FormGroup>
              )}
              
              {mode === 'login' && (
                <Flex justify="flex-end">
                  <AuthLink type="button" onClick={() => setMode('forgot')}>
                    Forgot Password?
                  </AuthLink>
                </Flex>
              )}
              
              <Button type="submit" fullWidth style={{ marginTop: '1.5rem' }}>
                {mode === 'login' && 'Sign In'}
                {mode === 'signup' && 'Create Account'}
                {mode === 'forgot' && 'Reset Password'}
              </Button>
            </form>
            
            {mode !== 'forgot' && (
              <>
                <OrDivider>
                  <span>OR</span>
                </OrDivider>
                
                <SocialButton variant="outline" fullWidth>
                  <FaGoogle style={{ marginRight: '0.5rem' }} /> Continue with Google
                </SocialButton>
              </>
            )}
            
            <AuthFooter>
              {mode === 'login' && (
                <>
                  Don't have an account?{' '}
                  <AuthLink type="button" onClick={() => setMode('signup')}>
                    Sign Up
                  </AuthLink>
                </>
              )}
              
              {mode === 'signup' && (
                <>
                  Already have an account?{' '}
                  <AuthLink type="button" onClick={() => setMode('login')}>
                    Sign In
                  </AuthLink>
                </>
              )}
              
              {mode === 'forgot' && (
                <AuthLink type="button" onClick={() => setMode('login')}>
                  Back to Sign In
                </AuthLink>
              )}
            </AuthFooter>
          </AuthCard>
        </motion.div>
      </Container>
    </AuthContainer>
  );
};

export default AuthPage;
