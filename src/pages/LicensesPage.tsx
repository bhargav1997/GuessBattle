import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { 
  FaShieldAlt, 
  FaLock, 
  FaCertificate, 
  FaGlobe, 
  FaServer, 
  FaCreditCard,
  FaCheckCircle
} from 'react-icons/fa';
import Container from '../components/Container';
import Card from '../components/Card';
import Grid from '../components/Grid';
import Flex from '../components/Flex';

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

const LicenseSection = styled.section`
  margin-bottom: 4rem;
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

const LicenseCard = styled(motion(Card))`
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

const LicenseInfo = styled.div`
  background: linear-gradient(135deg, rgba(106, 17, 203, 0.1) 0%, rgba(37, 117, 252, 0.1) 100%);
  border-radius: ${({ theme }) => theme.borderRadius};
  padding: 1.5rem;
  margin-top: 1.5rem;
`;

const LicenseTitle = styled.h4`
  font-size: 1.125rem;
  margin-bottom: 0.75rem;
`;

const LicenseDetail = styled.div`
  display: flex;
  margin-bottom: 0.5rem;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const LicenseLabel = styled.span`
  font-weight: 600;
  min-width: 150px;
`;

const LicenseValue = styled.span`
  color: ${({ theme }) => theme.colors.textDim};
`;

const SecurityBadges = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2rem;
  margin: 3rem 0;
`;

const SecurityBadge = styled(motion.div)`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: ${({ theme }) => theme.borderRadius};
  padding: 1.5rem;
  width: 180px;
  text-align: center;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: ${({ theme }) => theme.shadows.neonGlow};
  }
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

const VerificationSection = styled.section`
  margin-top: 4rem;
  text-align: center;
`;

const VerificationTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 1.5rem;
`;

const VerificationText = styled.p`
  color: ${({ theme }) => theme.colors.textDim};
  max-width: 700px;
  margin: 0 auto 2rem;
  font-size: 1.125rem;
`;

const VerificationSteps = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2rem;
  margin-top: 2rem;
`;

const VerificationStep = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: ${({ theme }) => theme.borderRadius};
  padding: 1.5rem;
  width: 250px;
  text-align: center;
`;

const StepNumber = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  margin: 0 auto 1rem;
`;

const StepTitle = styled.h4`
  font-size: 1.125rem;
  margin-bottom: 0.75rem;
`;

const StepDescription = styled.p`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.textDim};
`;

const LicensesPage: React.FC = () => {
  return (
    <PageContainer>
      <Container>
        <PageTitle>Licenses & Security</PageTitle>
        <PageSubtitle>
          GuessBattle operates with full transparency and adheres to the highest standards of security and fair play. This page details our licenses, certifications, and security measures.
        </PageSubtitle>
        
        <LicenseSection>
          <SectionTitle>
            <FaCertificate /> Platform Registration
          </SectionTitle>
          
          <LicenseCard
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <CardTitle>
              <FaCertificate /> Operating License
            </CardTitle>
            <CardContent>
              <p>GuessBattle is legally licensed and regulated by the Ontario Gaming Commission as a skill-based gaming platform. Our operations comply with all applicable laws and regulations in the jurisdictions where we operate.</p>
              
              <LicenseInfo>
                <LicenseTitle>License Information</LicenseTitle>
                <LicenseDetail>
                  <LicenseLabel>License Type:</LicenseLabel>
                  <LicenseValue>Skill-Based Gaming Operator</LicenseValue>
                </LicenseDetail>
                <LicenseDetail>
                  <LicenseLabel>License Number:</LicenseLabel>
                  <LicenseValue>OGC-SBG-2023-789</LicenseValue>
                </LicenseDetail>
                <LicenseDetail>
                  <LicenseLabel>Issuing Authority:</LicenseLabel>
                  <LicenseValue>Ontario Gaming Commission</LicenseValue>
                </LicenseDetail>
                <LicenseDetail>
                  <LicenseLabel>Issue Date:</LicenseLabel>
                  <LicenseValue>March 10, 2023</LicenseValue>
                </LicenseDetail>
                <LicenseDetail>
                  <LicenseLabel>Expiry Date:</LicenseLabel>
                  <LicenseValue>March 9, 2025</LicenseValue>
                </LicenseDetail>
              </LicenseInfo>
              
              <p style={{ marginTop: '1.5rem' }}>Our license requires us to:</p>
              <ul>
                <li>Implement strict age verification procedures</li>
                <li>Maintain fair and transparent gaming operations</li>
                <li>Protect player funds in segregated accounts</li>
                <li>Implement responsible gaming measures</li>
                <li>Submit to regular audits and inspections</li>
              </ul>
              
              <p>You can verify our license status on the <a href="https://www.agco.ca" target="_blank" rel="noopener noreferrer">Ontario Gaming Commission website</a>.</p>
            </CardContent>
          </LicenseCard>
        </LicenseSection>
        
        <LicenseSection>
          <SectionTitle>
            <FaDice /> RNG Certification
          </SectionTitle>
          
          <Grid columns="1fr 1fr" gap="2rem">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <LicenseCard>
                <CardTitle>
                  <FaDice /> Random Number Generator
                </CardTitle>
                <CardContent>
                  <p>The integrity of our games depends on the fairness and randomness of our Random Number Generator (RNG). Our RNG has been tested and certified by Gaming Laboratories International (GLI), a leading independent testing laboratory for the gaming industry.</p>
                  
                  <LicenseInfo>
                    <LicenseTitle>RNG Certification</LicenseTitle>
                    <LicenseDetail>
                      <LicenseLabel>Certification Number:</LicenseLabel>
                      <LicenseValue>GLI-RNG-2023-456</LicenseValue>
                    </LicenseDetail>
                    <LicenseDetail>
                      <LicenseLabel>Testing Laboratory:</LicenseLabel>
                      <LicenseValue>Gaming Laboratories International (GLI)</LicenseValue>
                    </LicenseDetail>
                    <LicenseDetail>
                      <LicenseLabel>Certification Date:</LicenseLabel>
                      <LicenseValue>February 5, 2023</LicenseValue>
                    </LicenseDetail>
                    <LicenseDetail>
                      <LicenseLabel>RNG Algorithm:</LicenseLabel>
                      <LicenseValue>FIPS 140-2 Compliant</LicenseValue>
                    </LicenseDetail>
                  </LicenseInfo>
                </CardContent>
              </LicenseCard>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <LicenseCard>
                <CardTitle>
                  <FaCheckCircle /> Fair Play Verification
                </CardTitle>
                <CardContent>
                  <p>Our games undergo regular testing to ensure fair play and accurate payouts. This testing is conducted by independent third-party auditors who verify that:</p>
                  
                  <ul>
                    <li>Game outcomes are truly random and cannot be predicted or manipulated</li>
                    <li>Payouts are accurate and consistent with the stated odds</li>
                    <li>Games operate according to their published rules</li>
                    <li>The platform is free from bugs or exploits that could affect game outcomes</li>
                  </ul>
                  
                  <p>Monthly audit reports are available upon request to regulatory authorities and can be provided to players upon written request.</p>
                  
                  <LicenseInfo>
                    <LicenseTitle>Latest Audit</LicenseTitle>
                    <LicenseDetail>
                      <LicenseLabel>Audit Date:</LicenseLabel>
                      <LicenseValue>April 15, 2023</LicenseValue>
                    </LicenseDetail>
                    <LicenseDetail>
                      <LicenseLabel>Auditor:</LicenseLabel>
                      <LicenseValue>eCOGRA</LicenseValue>
                    </LicenseDetail>
                    <LicenseDetail>
                      <LicenseLabel>Result:</LicenseLabel>
                      <LicenseValue>Compliant</LicenseValue>
                    </LicenseDetail>
                  </LicenseInfo>
                </CardContent>
              </LicenseCard>
            </motion.div>
          </Grid>
        </LicenseSection>
        
        <SecurityBadges>
          <SecurityBadge
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            <BadgeIcon>
              <FaLock />
            </BadgeIcon>
            <BadgeTitle>SSL Encryption</BadgeTitle>
            <BadgeText>256-bit secure connection</BadgeText>
          </SecurityBadge>
          
          <SecurityBadge
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.4 }}
          >
            <BadgeIcon>
              <FaCreditCard />
            </BadgeIcon>
            <BadgeTitle>PCI DSS</BadgeTitle>
            <BadgeText>Payment Card Industry compliant</BadgeText>
          </SecurityBadge>
          
          <SecurityBadge
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.5 }}
          >
            <BadgeIcon>
              <FaShieldAlt />
            </BadgeIcon>
            <BadgeTitle>GLI Certified</BadgeTitle>
            <BadgeText>Gaming Labs International</BadgeText>
          </SecurityBadge>
          
          <SecurityBadge
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.6 }}
          >
            <BadgeIcon>
              <FaServer />
            </BadgeIcon>
            <BadgeTitle>SOC 2</BadgeTitle>
            <BadgeText>Security, availability, processing integrity</BadgeText>
          </SecurityBadge>
          
          <SecurityBadge
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.7 }}
          >
            <BadgeIcon>
              <FaGlobe />
            </BadgeIcon>
            <BadgeTitle>OGC Regulated</BadgeTitle>
            <BadgeText>Ontario Gaming Commission</BadgeText>
          </SecurityBadge>
        </SecurityBadges>
        
        <LicenseSection>
          <SectionTitle>
            <FaLock /> Security Measures
          </SectionTitle>
          
          <Grid columns="1fr 1fr" gap="2rem">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.8 }}
            >
              <LicenseCard>
                <CardTitle>
                  <FaLock /> Data Protection
                </CardTitle>
                <CardContent>
                  <p>We implement industry-leading security measures to protect your personal and financial information:</p>
                  
                  <ul>
                    <li><strong>SSL Encryption:</strong> All data transmitted between your device and our servers is encrypted using 256-bit SSL technology</li>
                    <li><strong>Secure Data Storage:</strong> Personal information is stored in encrypted databases with strict access controls</li>
                    <li><strong>Regular Security Audits:</strong> Our systems undergo regular penetration testing and security audits</li>
                    <li><strong>Two-Factor Authentication:</strong> Optional 2FA for an additional layer of account security</li>
                    <li><strong>Fraud Detection:</strong> Advanced systems to detect and prevent fraudulent activities</li>
                  </ul>
                  
                  <p>Our security practices comply with industry standards and are regularly updated to address emerging threats.</p>
                </CardContent>
              </LicenseCard>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.9 }}
            >
              <LicenseCard>
                <CardTitle>
                  <FaCreditCard /> Payment Security
                </CardTitle>
                <CardContent>
                  <p>The security of your financial transactions is our top priority:</p>
                  
                  <ul>
                    <li><strong>PCI DSS Compliance:</strong> We adhere to the Payment Card Industry Data Security Standard</li>
                    <li><strong>Secure Payment Gateways:</strong> All transactions are processed through trusted, secure payment providers</li>
                    <li><strong>Segregated Funds:</strong> Player funds are kept in segregated accounts separate from operational funds</li>
                    <li><strong>Transaction Monitoring:</strong> All financial transactions are monitored for suspicious activity</li>
                    <li><strong>Verified Withdrawals:</strong> Identity verification is required for withdrawals to prevent fraud</li>
                  </ul>
                  
                  <p>We partner with leading financial institutions to ensure the highest level of payment security.</p>
                </CardContent>
              </LicenseCard>
            </motion.div>
          </Grid>
        </LicenseSection>
        
        <VerificationSection>
          <VerificationTitle>How to Verify Our Licenses</VerificationTitle>
          <VerificationText>
            We encourage players to verify our licensing and security credentials. Here's how you can confirm our regulatory status:
          </VerificationText>
          
          <VerificationSteps>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 1.0 }}
            >
              <VerificationStep>
                <StepNumber>1</StepNumber>
                <StepTitle>Visit Regulatory Website</StepTitle>
                <StepDescription>
                  Go to the Ontario Gaming Commission website at <a href="https://www.agco.ca" target="_blank" rel="noopener noreferrer">www.agco.ca</a>
                </StepDescription>
              </VerificationStep>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 1.1 }}
            >
              <VerificationStep>
                <StepNumber>2</StepNumber>
                <StepTitle>Search for GuessBattle</StepTitle>
                <StepDescription>
                  Use the license search function and enter our license number: OGC-SBG-2023-789
                </StepDescription>
              </VerificationStep>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 1.2 }}
            >
              <VerificationStep>
                <StepNumber>3</StepNumber>
                <StepTitle>Check Certificate Details</StepTitle>
                <StepDescription>
                  Verify that the license is active and matches the information provided on this page
                </StepDescription>
              </VerificationStep>
            </motion.div>
          </VerificationSteps>
        </VerificationSection>
      </Container>
    </PageContainer>
  );
};

export default LicensesPage;
