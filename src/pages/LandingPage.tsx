import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaChartLine, FaUsers, FaMoneyBillWave, FaShieldAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Container from '../components/Container';
import Button from '../components/Button';
import Card from '../components/Card';
import Flex from '../components/Flex';
import Grid from '../components/Grid';

const HeroSection = styled.section`
  padding: 6rem 0;
  background: linear-gradient(135deg, rgba(10, 10, 10, 0.9) 0%, rgba(18, 18, 18, 0.9) 100%),
    url('/hero-background.jpg') no-repeat center center;
  background-size: cover;
  text-align: center;
`;

const HeroTitle = styled(motion.h1)`
  font-size: 3.5rem;
  margin-bottom: 1.5rem;
  background: ${({ theme }) => theme.colors.gradients.primary};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: 2.5rem;
  }
`;

const HeroSubtitle = styled(motion.p)`
  font-size: 1.25rem;
  max-width: 700px;
  margin: 0 auto 2.5rem;
  color: ${({ theme }) => theme.colors.textDim};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: 1.125rem;
  }
`;

const HowItWorksSection = styled.section`
  padding: 5rem 0;
  background-color: ${({ theme }) => theme.colors.backgroundDarker};
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 3rem;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: 2rem;
  }
`;

const StepCard = styled(motion(Card))`
  text-align: center;
  padding: 2rem;
  height: 100%;
`;

const StepIcon = styled.div`
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  color: ${({ theme }) => theme.colors.primary};
`;

const StepNumber = styled.div`
  position: absolute;
  top: -15px;
  left: -15px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.gradients.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  box-shadow: ${({ theme }) => theme.shadows.neonGlow};
`;

const StepTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

const StepDescription = styled.p`
  color: ${({ theme }) => theme.colors.textDim};
`;

const FeaturesSection = styled.section`
  padding: 5rem 0;
`;

const FeatureCard = styled(motion(Card))`
  padding: 2rem;
  height: 100%;
`;

const FeatureIcon = styled.div`
  font-size: 2rem;
  margin-bottom: 1.5rem;
  color: ${({ theme }) => theme.colors.primary};
`;

const FeatureTitle = styled.h3`
  font-size: 1.25rem;
  margin-bottom: 1rem;
`;

const FeatureDescription = styled.p`
  color: ${({ theme }) => theme.colors.textDim};
`;

const TestimonialsSection = styled.section`
  padding: 5rem 0;
  background-color: ${({ theme }) => theme.colors.backgroundDarker};
`;

const TestimonialCard = styled(motion(Card))`
  padding: 2rem;
  height: 100%;
`;

const TestimonialText = styled.p`
  font-style: italic;
  margin-bottom: 1.5rem;
  color: ${({ theme }) => theme.colors.textDim};
`;

const TestimonialAuthor = styled.div`
  display: flex;
  align-items: center;
`;

const AuthorAvatar = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.gradients.primary};
  margin-right: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
`;

const AuthorInfo = styled.div``;

const AuthorName = styled.h4`
  font-size: 1.125rem;
  margin-bottom: 0.25rem;
`;

const AuthorWinnings = styled.p`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.accent};
`;

const CTASection = styled.section`
  padding: 5rem 0;
  text-align: center;
`;

const CTATitle = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: 2rem;
  }
`;

const CTADescription = styled.p`
  font-size: 1.125rem;
  max-width: 700px;
  margin: 0 auto 2.5rem;
  color: ${({ theme }) => theme.colors.textDim};
`;

const SecuritySection = styled.section`
  padding: 5rem 0;
  background-color: ${({ theme }) => theme.colors.backgroundDarker};
  text-align: center;
`;

const SecurityIcons = styled.div`
  display: flex;
  justify-content: center;
  gap: 3rem;
  margin-top: 2rem;
  flex-wrap: wrap;
`;

const SecurityIcon = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const IconWrapper = styled.div`
  font-size: 2.5rem;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 1rem;
`;

const IconLabel = styled.p`
  font-weight: 500;
`;

const LandingPage: React.FC = () => {
  return (
    <>
      <HeroSection>
        <Container>
          <HeroTitle
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Win Real Money by Guessing Numbers!
          </HeroTitle>
          <HeroSubtitle
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Join the exciting world of GuessBattle where your number prediction skills can earn you real cash. Compete with friends, join tables, and win big!
          </HeroSubtitle>
          <Flex justify="center" gap="1rem">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Button as={Link} to="/game" size="large">
                Play Now
              </Button>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <Button as={Link} to="/signup" variant="outline" size="large">
                Sign Up
              </Button>
            </motion.div>
          </Flex>
        </Container>
      </HeroSection>

      <HowItWorksSection>
        <Container>
          <SectionTitle>How It Works</SectionTitle>
          <Grid columns="repeat(auto-fit, minmax(250px, 1fr))" gap="2rem">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <StepCard variant="elevated">
                <StepNumber>1</StepNumber>
                <StepIcon>💰</StepIcon>
                <StepTitle>Buy Chips</StepTitle>
                <StepDescription>
                  Purchase chips to start playing. Various packages available to suit your budget.
                </StepDescription>
              </StepCard>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <StepCard variant="elevated">
                <StepNumber>2</StepNumber>
                <StepIcon>🎮</StepIcon>
                <StepTitle>Join a Table</StepTitle>
                <StepDescription>
                  Join an existing game table or create your own and invite friends to play.
                </StepDescription>
              </StepCard>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <StepCard variant="elevated">
                <StepNumber>3</StepNumber>
                <StepIcon>🔢</StepIcon>
                <StepTitle>Guess Number</StepTitle>
                <StepDescription>
                  Pick a number between 00-99 or choose from special betting options.
                </StepDescription>
              </StepCard>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              viewport={{ once: true }}
            >
              <StepCard variant="elevated">
                <StepNumber>4</StepNumber>
                <StepIcon>🏆</StepIcon>
                <StepTitle>Win Money</StepTitle>
                <StepDescription>
                  If your guess matches the winning number, you win! Cash out your winnings anytime.
                </StepDescription>
              </StepCard>
            </motion.div>
          </Grid>
        </Container>
      </HowItWorksSection>

      <FeaturesSection>
        <Container>
          <SectionTitle>Why Choose GuessBattle</SectionTitle>
          <Grid columns="repeat(auto-fit, minmax(250px, 1fr))" gap="2rem">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <FeatureCard>
                <FeatureIcon>
                  <FaUsers />
                </FeatureIcon>
                <FeatureTitle>Multiplayer Experience</FeatureTitle>
                <FeatureDescription>
                  Play with friends or meet new players from around the world. Compete in real-time with up to 10 players per table.
                </FeatureDescription>
              </FeatureCard>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <FeatureCard>
                <FeatureIcon>
                  <FaMoneyBillWave />
                </FeatureIcon>
                <FeatureTitle>Real Money Winnings</FeatureTitle>
                <FeatureDescription>
                  Win actual cash that you can withdraw to your bank account or e-wallet. Fast and secure transactions.
                </FeatureDescription>
              </FeatureCard>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <FeatureCard>
                <FeatureIcon>
                  <FaChartLine />
                </FeatureIcon>
                <FeatureTitle>Leaderboards & Stats</FeatureTitle>
                <FeatureDescription>
                  Track your performance, climb the global leaderboards, and earn special rewards for consistent winning.
                </FeatureDescription>
              </FeatureCard>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              viewport={{ once: true }}
            >
              <FeatureCard>
                <FeatureIcon>
                  <FaShieldAlt />
                </FeatureIcon>
                <FeatureTitle>Secure & Fair</FeatureTitle>
                <FeatureDescription>
                  Our platform uses advanced encryption and fair play algorithms to ensure a secure and transparent gaming experience.
                </FeatureDescription>
              </FeatureCard>
            </motion.div>
          </Grid>
        </Container>
      </FeaturesSection>

      <TestimonialsSection>
        <Container>
          <SectionTitle>What Our Players Say</SectionTitle>
          <Grid columns="repeat(auto-fit, minmax(300px, 1fr))" gap="2rem">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <TestimonialCard>
                <TestimonialText>
                  "I was skeptical at first, but after winning $500 in my first week, I'm hooked! The game is simple yet addictive, and the community is amazing."
                </TestimonialText>
                <TestimonialAuthor>
                  <AuthorAvatar>JD</AuthorAvatar>
                  <AuthorInfo>
                    <AuthorName>John Doe</AuthorName>
                    <AuthorWinnings>Won $2,450 total</AuthorWinnings>
                  </AuthorInfo>
                </TestimonialAuthor>
              </TestimonialCard>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <TestimonialCard>
                <TestimonialText>
                  "GuessBattle has become my favorite way to spend evenings. The thrill of guessing the right number and seeing your balance grow is unmatched!"
                </TestimonialText>
                <TestimonialAuthor>
                  <AuthorAvatar>JS</AuthorAvatar>
                  <AuthorInfo>
                    <AuthorName>Jane Smith</AuthorName>
                    <AuthorWinnings>Won $1,875 total</AuthorWinnings>
                  </AuthorInfo>
                </TestimonialAuthor>
              </TestimonialCard>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <TestimonialCard>
                <TestimonialText>
                  "I've tried many number games, but GuessBattle stands out with its sleek design and fair gameplay. The 30-second rounds keep things exciting!"
                </TestimonialText>
                <TestimonialAuthor>
                  <AuthorAvatar>RJ</AuthorAvatar>
                  <AuthorInfo>
                    <AuthorName>Robert Johnson</AuthorName>
                    <AuthorWinnings>Won $3,210 total</AuthorWinnings>
                  </AuthorInfo>
                </TestimonialAuthor>
              </TestimonialCard>
            </motion.div>
          </Grid>
        </Container>
      </TestimonialsSection>

      <CTASection>
        <Container>
          <CTATitle>Ready to Start Winning?</CTATitle>
          <CTADescription>
            Join thousands of players already winning real money on GuessBattle. Sign up now and get a welcome bonus of 100 free chips!
          </CTADescription>
          <Button as={Link} to="/signup" size="large">
            Create Your Account
          </Button>
        </Container>
      </CTASection>

      <SecuritySection>
        <Container>
          <SectionTitle>Safe & Secure Gaming</SectionTitle>
          <SecurityIcons>
            <SecurityIcon>
              <IconWrapper>
                <FaShieldAlt />
              </IconWrapper>
              <IconLabel>Secure Payments</IconLabel>
            </SecurityIcon>
            <SecurityIcon>
              <IconWrapper>🔒</IconWrapper>
              <IconLabel>Data Protection</IconLabel>
            </SecurityIcon>
            <SecurityIcon>
              <IconWrapper>⚖️</IconWrapper>
              <IconLabel>Fair Play</IconLabel>
            </SecurityIcon>
            <SecurityIcon>
              <IconWrapper>🛡️</IconWrapper>
              <IconLabel>Licensed & Regulated</IconLabel>
            </SecurityIcon>
          </SecurityIcons>
        </Container>
      </SecuritySection>
    </>
  );
};

export default LandingPage;
