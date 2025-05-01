import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { 
  FaShieldAlt, 
  FaClock, 
  FaCoins, 
  FaExclamationTriangle, 
  FaPhoneAlt, 
  FaEnvelope,
  FaCheck,
  FaArrowRight
} from 'react-icons/fa';
import Container from '../components/Container';
import Card from '../components/Card';
import Button from '../components/Button';
import Grid from '../components/Grid';
import Flex from '../components/Flex';
import { Link } from 'react-router-dom';

const PageContainer = styled.div`
  padding: 4rem 0;
`;

const PageTitle = styled.h1`
  font-size: 3rem;
  text-align: center;
  margin-bottom: 1rem;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: 2.5rem;
  }
`;

const PageSubtitle = styled.p`
  font-size: 1.25rem;
  text-align: center;
  color: ${({ theme }) => theme.colors.textDim};
  max-width: 800px;
  margin: 0 auto 3rem;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: 1.125rem;
  }
`;

const IntroSection = styled.section`
  margin-bottom: 4rem;
`;

const IntroCard = styled(Card)`
  padding: 2.5rem;
  text-align: center;
`;

const IntroText = styled.p`
  color: ${({ theme }) => theme.colors.textDim};
  font-size: 1.125rem;
  line-height: 1.7;
  max-width: 800px;
  margin: 0 auto 2rem;
`;

const CommitmentBadges = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2rem;
  margin-top: 2rem;
`;

const CommitmentBadge = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: 180px;
`;

const BadgeIcon = styled.div`
  font-size: 2.5rem;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 1rem;
`;

const BadgeTitle = styled.h3`
  font-size: 1.125rem;
  margin-bottom: 0.5rem;
`;

const BadgeText = styled.p`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.textDim};
`;

const SectionTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  
  svg {
    margin-right: 1rem;
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const ContentSection = styled.section`
  margin-bottom: 4rem;
`;

const ContentCard = styled(motion(Card))`
  padding: 2rem;
  height: 100%;
  border: 1px solid rgba(255, 255, 255, 0.05);
`;

const CardTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  
  svg {
    margin-right: 0.75rem;
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const CardContent = styled.div`
  color: ${({ theme }) => theme.colors.textDim};
  line-height: 1.7;
  
  p {
    margin-bottom: 1rem;
    
    &:last-child {
      margin-bottom: 0;
    }
  }
  
  ul {
    margin-bottom: 1rem;
    padding-left: 1.5rem;
    
    li {
      margin-bottom: 0.5rem;
    }
  }
  
  a {
    color: ${({ theme }) => theme.colors.primary};
    text-decoration: none;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

const WarningSign = styled.div`
  background: rgba(255, 87, 34, 0.1);
  border-left: 4px solid ${({ theme }) => theme.colors.error};
  padding: 1.5rem;
  margin: 1.5rem 0;
  border-radius: ${({ theme }) => theme.borderRadius};
`;

const WarningTitle = styled.h4`
  font-size: 1.125rem;
  color: ${({ theme }) => theme.colors.error};
  margin-bottom: 0.75rem;
  display: flex;
  align-items: center;
  
  svg {
    margin-right: 0.75rem;
  }
`;

const ResourcesSection = styled.section`
  margin-bottom: 4rem;
`;

const ResourceCard = styled(motion(Card))`
  padding: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.05);
  display: flex;
  align-items: center;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    transform: translateY(-3px);
  }
`;

const ResourceIcon = styled.div`
  font-size: 2rem;
  color: ${({ theme }) => theme.colors.primary};
  margin-right: 1.5rem;
`;

const ResourceInfo = styled.div`
  flex: 1;
`;

const ResourceTitle = styled.h4`
  font-size: 1.125rem;
  margin-bottom: 0.5rem;
`;

const ResourceDescription = styled.p`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.textDim};
`;

const ResourceLink = styled.a`
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 500;
  font-size: 0.875rem;
  margin-top: 0.5rem;
  
  svg {
    margin-left: 0.5rem;
    transition: transform 0.2s ease;
  }
  
  &:hover svg {
    transform: translateX(3px);
  }
`;

const SelfExclusionSection = styled.section`
  margin-bottom: 4rem;
`;

const SelfExclusionCard = styled(Card)`
  padding: 2.5rem;
  background: linear-gradient(135deg, rgba(106, 17, 203, 0.1) 0%, rgba(37, 117, 252, 0.1) 100%);
  border: 1px solid rgba(106, 17, 203, 0.2);
`;

const SelfExclusionTitle = styled.h3`
  font-size: 1.75rem;
  margin-bottom: 1.5rem;
  text-align: center;
`;

const SelfExclusionText = styled.p`
  color: ${({ theme }) => theme.colors.textDim};
  line-height: 1.7;
  margin-bottom: 2rem;
  text-align: center;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
`;

const SelfExclusionOptions = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const ExclusionOption = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: ${({ theme }) => theme.borderRadius};
  padding: 1.5rem;
  width: 200px;
  text-align: center;
`;

const OptionTitle = styled.h4`
  font-size: 1.125rem;
  margin-bottom: 0.75rem;
`;

const OptionDescription = styled.p`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.textDim};
`;

const CTASection = styled.section`
  text-align: center;
`;

const CTATitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 1.5rem;
`;

const CTAText = styled.p`
  color: ${({ theme }) => theme.colors.textDim};
  max-width: 700px;
  margin: 0 auto 2rem;
  font-size: 1.125rem;
`;

const ResponsibleGamingPage: React.FC = () => {
  return (
    <PageContainer>
      <Container>
        <PageTitle>Responsible Gaming</PageTitle>
        <PageSubtitle>
          At GuessBattle, we are committed to promoting responsible gaming and providing a safe environment for our players.
        </PageSubtitle>
        
        <IntroSection>
          <IntroCard>
            <IntroText>
              We believe that gaming should be an enjoyable form of entertainment, not a way to make money or escape from problems. We encourage all our players to maintain control over their gaming habits and to play responsibly.
            </IntroText>
            
            <CommitmentBadges>
              <CommitmentBadge>
                <BadgeIcon>
                  <FaShieldAlt />
                </BadgeIcon>
                <BadgeTitle>Player Protection</BadgeTitle>
                <BadgeText>We implement measures to protect vulnerable players</BadgeText>
              </CommitmentBadge>
              
              <CommitmentBadge>
                <BadgeIcon>
                  <FaClock />
                </BadgeIcon>
                <BadgeTitle>Time Limits</BadgeTitle>
                <BadgeText>Set time limits to manage your gaming sessions</BadgeText>
              </CommitmentBadge>
              
              <CommitmentBadge>
                <BadgeIcon>
                  <FaCoins />
                </BadgeIcon>
                <BadgeTitle>Deposit Limits</BadgeTitle>
                <BadgeText>Control your spending with customizable deposit limits</BadgeText>
              </CommitmentBadge>
              
              <CommitmentBadge>
                <BadgeIcon>
                  <FaCheck />
                </BadgeIcon>
                <BadgeTitle>Self-Assessment</BadgeTitle>
                <BadgeText>Tools to help you evaluate your gaming habits</BadgeText>
              </CommitmentBadge>
            </CommitmentBadges>
          </IntroCard>
        </IntroSection>
        
        <ContentSection>
          <SectionTitle>
            <FaExclamationTriangle /> Know the Risks
          </SectionTitle>
          
          <Grid columns="1fr 1fr" gap="2rem">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <ContentCard>
                <CardTitle>
                  <FaExclamationTriangle /> Gambling Awareness
                </CardTitle>
                <CardContent>
                  <p>While GuessBattle is primarily a skill-based game, it shares some characteristics with gambling activities. It's important to understand the potential risks associated with gaming for money:</p>
                  
                  <ul>
                    <li>Gaming can become addictive for some individuals</li>
                    <li>Spending more money than you can afford to lose</li>
                    <li>Chasing losses can lead to financial problems</li>
                    <li>Excessive gaming can impact relationships and work/study commitments</li>
                    <li>Using gaming as an escape from problems can worsen mental health issues</li>
                  </ul>
                  
                  <p>Being aware of these risks is the first step toward responsible gaming. If you feel that your gaming habits are becoming problematic, we encourage you to use our responsible gaming tools or seek professional help.</p>
                </CardContent>
              </ContentCard>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <ContentCard>
                <CardTitle>
                  <FaExclamationTriangle /> Warning Signs
                </CardTitle>
                <CardContent>
                  <p>It's important to recognize the warning signs of problematic gaming behavior. You may have a problem if you:</p>
                  
                  <WarningSign>
                    <WarningTitle>
                      <FaExclamationTriangle /> Warning Signs of Problem Gambling
                    </WarningTitle>
                    <ul>
                      <li>Spend more time or money on gaming than you intended</li>
                      <li>Feel restless or irritable when not gaming</li>
                      <li>Have tried to cut down or stop gaming without success</li>
                      <li>Lie to family members or others about your gaming habits</li>
                      <li>Use gaming as a way to escape from problems or relieve feelings of helplessness, guilt, anxiety, or depression</li>
                      <li>Chase losses by continuing to play to recover money</li>
                      <li>Jeopardize or lose important relationships, job opportunities, or educational opportunities due to gaming</li>
                      <li>Rely on others to provide money to relieve desperate financial situations caused by gaming</li>
                    </ul>
                  </WarningSign>
                  
                  <p>If you identify with several of these warning signs, we encourage you to take our self-assessment test or speak with a professional counselor.</p>
                </CardContent>
              </ContentCard>
            </motion.div>
          </Grid>
        </ContentSection>
        
        <ContentSection>
          <SectionTitle>
            <FaClock /> Set Limits
          </SectionTitle>
          
          <Grid columns="1fr 1fr" gap="2rem">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <ContentCard>
                <CardTitle>
                  <FaClock /> Time Limits
                </CardTitle>
                <CardContent>
                  <p>Setting time limits is an effective way to ensure that gaming remains a balanced part of your life. GuessBattle offers several tools to help you manage your gaming time:</p>
                  
                  <ul>
                    <li><strong>Session Reminders:</strong> Receive notifications when you've been playing for a certain amount of time</li>
                    <li><strong>Daily Time Limits:</strong> Set a maximum amount of time you can play each day</li>
                    <li><strong>Cool-Down Periods:</strong> Schedule breaks between gaming sessions</li>
                    <li><strong>Time-Out Option:</strong> Temporarily suspend your account for a period of your choosing (24 hours, 7 days, 30 days)</li>
                  </ul>
                  
                  <p>These tools can be accessed in your account settings under "Responsible Gaming." Time limits can be adjusted at any time, but increases to your limits will only take effect after a 24-hour cooling-off period.</p>
                </CardContent>
              </ContentCard>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              <ContentCard>
                <CardTitle>
                  <FaCoins /> Money Limits
                </CardTitle>
                <CardContent>
                  <p>Managing your finances is a crucial aspect of responsible gaming. GuessBattle provides several tools to help you control your spending:</p>
                  
                  <ul>
                    <li><strong>Deposit Limits:</strong> Set daily, weekly, or monthly limits on how much you can deposit</li>
                    <li><strong>Loss Limits:</strong> Set limits on how much you can lose in a given period</li>
                    <li><strong>Bet Limits:</strong> Set maximum bet amounts for individual games</li>
                    <li><strong>Reality Check:</strong> Receive notifications showing your wins and losses during a session</li>
                  </ul>
                  
                  <p>These limits can be set up in your account settings under "Responsible Gaming." While you can decrease your limits at any time with immediate effect, increases will only take effect after a 24-hour cooling-off period.</p>
                  
                  <p>Remember: Never gamble with money you cannot afford to lose, and never try to chase your losses.</p>
                </CardContent>
              </ContentCard>
            </motion.div>
          </Grid>
        </ContentSection>
        
        <ResourcesSection>
          <SectionTitle>
            <FaPhoneAlt /> Resources and Links
          </SectionTitle>
          
          <Grid columns="1fr 1fr" gap="2rem">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.4 }}
            >
              <ResourceCard>
                <ResourceIcon>🇨🇦</ResourceIcon>
                <ResourceInfo>
                  <ResourceTitle>Responsible Gambling Council (Canada)</ResourceTitle>
                  <ResourceDescription>
                    Information, resources, and support for Canadians experiencing gambling problems.
                  </ResourceDescription>
                  <ResourceLink href="https://www.responsiblegambling.org" target="_blank" rel="noopener noreferrer">
                    Visit Website <FaArrowRight />
                  </ResourceLink>
                </ResourceInfo>
              </ResourceCard>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.45 }}
            >
              <ResourceCard>
                <ResourceIcon>🌐</ResourceIcon>
                <ResourceInfo>
                  <ResourceTitle>Gamblers Anonymous</ResourceTitle>
                  <ResourceDescription>
                    A fellowship of men and women who share their experience, strength and hope with each other to solve their common problem.
                  </ResourceDescription>
                  <ResourceLink href="https://www.gamblersanonymous.org" target="_blank" rel="noopener noreferrer">
                    Visit Website <FaArrowRight />
                  </ResourceLink>
                </ResourceInfo>
              </ResourceCard>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.5 }}
            >
              <ResourceCard>
                <ResourceIcon>📞</ResourceIcon>
                <ResourceInfo>
                  <ResourceTitle>Problem Gambling Helpline</ResourceTitle>
                  <ResourceDescription>
                    24/7 confidential support for anyone affected by gambling problems.
                  </ResourceDescription>
                  <ResourceLink href="tel:1-800-123-4567">
                    1-800-123-4567 <FaArrowRight />
                  </ResourceLink>
                </ResourceInfo>
              </ResourceCard>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.55 }}
            >
              <ResourceCard>
                <ResourceIcon>📋</ResourceIcon>
                <ResourceInfo>
                  <ResourceTitle>Self-Assessment Test</ResourceTitle>
                  <ResourceDescription>
                    Take a confidential test to evaluate your gaming habits and identify potential problems.
                  </ResourceDescription>
                  <ResourceLink href="#self-assessment">
                    Take the Test <FaArrowRight />
                  </ResourceLink>
                </ResourceInfo>
              </ResourceCard>
            </motion.div>
          </Grid>
        </ResourcesSection>
        
        <SelfExclusionSection>
          <SectionTitle>
            <FaShieldAlt /> Self-Exclusion
          </SectionTitle>
          
          <SelfExclusionCard>
            <SelfExclusionTitle>Need a Break from Gaming?</SelfExclusionTitle>
            <SelfExclusionText>
              If you feel that you need to take a break from gaming, our self-exclusion program allows you to temporarily or permanently exclude yourself from GuessBattle. During the self-exclusion period, you will not be able to access your account or create a new one.
            </SelfExclusionText>
            
            <SelfExclusionOptions>
              <ExclusionOption>
                <OptionTitle>6 Months</OptionTitle>
                <OptionDescription>
                  Take a significant break to reassess your gaming habits
                </OptionDescription>
              </ExclusionOption>
              
              <ExclusionOption>
                <OptionTitle>1 Year</OptionTitle>
                <OptionDescription>
                  A longer period to establish new habits and routines
                </OptionDescription>
              </ExclusionOption>
              
              <ExclusionOption>
                <OptionTitle>5 Years</OptionTitle>
                <OptionDescription>
                  Extended break for those with serious concerns
                </OptionDescription>
              </ExclusionOption>
              
              <ExclusionOption>
                <OptionTitle>Permanent</OptionTitle>
                <OptionDescription>
                  Permanently exclude yourself from GuessBattle
                </OptionDescription>
              </ExclusionOption>
            </SelfExclusionOptions>
            
            <Flex justify="center">
              <Button as={Link} to="/contact" size="large">
                Request Self-Exclusion
              </Button>
            </Flex>
          </SelfExclusionCard>
        </SelfExclusionSection>
        
        <CTASection>
          <CTATitle>Need Help? Contact Support</CTATitle>
          <CTAText>
            Our support team is available 24/7 to assist you with any questions or concerns about responsible gaming. We're here to help you maintain a healthy relationship with gaming.
          </CTAText>
          <Button as={Link} to="/contact" size="large">
            <FaEnvelope style={{ marginRight: '0.5rem' }} /> Contact Support
          </Button>
        </CTASection>
      </Container>
    </PageContainer>
  );
};

export default ResponsibleGamingPage;
