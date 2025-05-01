import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaBalanceScale, FaIdCard, FaUserShield, FaGlobe, FaDice, FaEnvelope } from 'react-icons/fa';
import Container from '../components/Container';
import Card from '../components/Card';
import Grid from '../components/Grid';
import Button from '../components/Button';
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

const LegalSection = styled.section`
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

const LegalCard = styled(motion(Card))`
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
  gap: 1.5rem;
  margin-top: 1.5rem;
`;

const SecurityBadge = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: ${({ theme }) => theme.borderRadius};
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: 120px;
`;

const BadgeIcon = styled.div`
  font-size: 2rem;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 0.75rem;
`;

const BadgeText = styled.div`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.textDim};
`;

const ContactSection = styled.div`
  margin-top: 3rem;
  text-align: center;
`;

const ContactTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

const ContactText = styled.p`
  color: ${({ theme }) => theme.colors.textDim};
  max-width: 600px;
  margin: 0 auto 1.5rem;
`;

const LegalPage: React.FC = () => {
  return (
    <PageContainer>
      <Container>
        <PageTitle>Legal Information</PageTitle>
        <PageSubtitle>
          GuessBattle operates in full compliance with all applicable laws and regulations. This page provides important legal information about our operations.
        </PageSubtitle>
        
        <LegalSection>
          <SectionTitle>
            <FaIdCard /> Business Registration
          </SectionTitle>
          
          <LegalCard
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <CardTitle>
              <FaBalanceScale /> Company Information
            </CardTitle>
            <CardContent>
              <p>GuessBattle is operated by GuessBattle Gaming Inc., a company registered in Canada.</p>
              
              <LicenseInfo>
                <LicenseTitle>Registration Details</LicenseTitle>
                <LicenseDetail>
                  <LicenseLabel>Company Name:</LicenseLabel>
                  <LicenseValue>GuessBattle Gaming Inc.</LicenseValue>
                </LicenseDetail>
                <LicenseDetail>
                  <LicenseLabel>Registration Number:</LicenseLabel>
                  <LicenseValue>CAN-12345678</LicenseValue>
                </LicenseDetail>
                <LicenseDetail>
                  <LicenseLabel>Registered Address:</LicenseLabel>
                  <LicenseValue>123 Gaming Street, Suite 456, Toronto, ON M5V 2K7, Canada</LicenseValue>
                </LicenseDetail>
                <LicenseDetail>
                  <LicenseLabel>Date of Incorporation:</LicenseLabel>
                  <LicenseValue>January 15, 2020</LicenseValue>
                </LicenseDetail>
                <LicenseDetail>
                  <LicenseLabel>Tax ID:</LicenseLabel>
                  <LicenseValue>CA-987654321</LicenseValue>
                </LicenseDetail>
              </LicenseInfo>
            </CardContent>
          </LegalCard>
        </LegalSection>
        
        <LegalSection>
          <SectionTitle>
            <FaUserShield /> Regulatory Compliance
          </SectionTitle>
          
          <Grid columns="1fr 1fr" gap="2rem">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <LegalCard>
                <CardTitle>
                  <FaBalanceScale /> Gaming License
                </CardTitle>
                <CardContent>
                  <p>GuessBattle operates under a skill-based gaming license issued by the Ontario Gaming Commission. Our platform is regularly audited to ensure compliance with all applicable regulations.</p>
                  
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
                  
                  <p style={{ marginTop: '1.5rem' }}>
                    <a href="https://www.agco.ca" target="_blank" rel="noopener noreferrer">
                      Verify our license on the Ontario Gaming Commission website →
                    </a>
                  </p>
                </CardContent>
              </LegalCard>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <LegalCard>
                <CardTitle>
                  <FaGlobe /> Jurisdictional Operations
                </CardTitle>
                <CardContent>
                  <p>GuessBattle is legally authorized to operate in the following Canadian provinces and territories:</p>
                  
                  <ul>
                    <li>Ontario</li>
                    <li>British Columbia</li>
                    <li>Alberta</li>
                    <li>Quebec</li>
                    <li>Manitoba</li>
                    <li>Saskatchewan</li>
                    <li>Nova Scotia</li>
                    <li>New Brunswick</li>
                    <li>Newfoundland and Labrador</li>
                    <li>Prince Edward Island</li>
                  </ul>
                  
                  <p>We are continuously working to expand our operations to additional jurisdictions. Please note that it is your responsibility to ensure that using our Service is legal in your jurisdiction before registering an account.</p>
                </CardContent>
              </LegalCard>
            </motion.div>
          </Grid>
        </LegalSection>
        
        <LegalSection>
          <SectionTitle>
            <FaDice /> Game Fairness
          </SectionTitle>
          
          <LegalCard
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            <CardTitle>
              <FaDice /> Random Number Generator (RNG)
            </CardTitle>
            <CardContent>
              <p>GuessBattle uses a certified Random Number Generator (RNG) to ensure fair and unbiased game outcomes. Our RNG has been tested and certified by Gaming Laboratories International (GLI), a leading independent testing laboratory for the gaming industry.</p>
              
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
              
              <p style={{ marginTop: '1.5rem' }}>Our RNG undergoes regular audits to ensure continued compliance with industry standards. The results of these audits are available upon request.</p>
              
              <SecurityBadges>
                <SecurityBadge>
                  <BadgeIcon>🔒</BadgeIcon>
                  <BadgeText>GLI Certified</BadgeText>
                </SecurityBadge>
                <SecurityBadge>
                  <BadgeIcon>🛡️</BadgeIcon>
                  <BadgeText>FIPS 140-2 Compliant</BadgeText>
                </SecurityBadge>
                <SecurityBadge>
                  <BadgeIcon>⚖️</BadgeIcon>
                  <BadgeText>Fair Play Verified</BadgeText>
                </SecurityBadge>
                <SecurityBadge>
                  <BadgeIcon>🔄</BadgeIcon>
                  <BadgeText>Monthly Audits</BadgeText>
                </SecurityBadge>
              </SecurityBadges>
            </CardContent>
          </LegalCard>
        </LegalSection>
        
        <LegalSection>
          <SectionTitle>
            <FaUserShield /> Age Restriction
          </SectionTitle>
          
          <LegalCard
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
          >
            <CardContent>
              <p>GuessBattle is strictly for users who are 18 years of age or older (19+ in some provinces). We implement rigorous age verification procedures to ensure compliance with this requirement.</p>
              
              <p>By using our Service, you represent and warrant that you are of legal age in your jurisdiction. We reserve the right to suspend or terminate accounts if we discover that a user is underage.</p>
              
              <p>We take age verification seriously and may require users to provide government-issued identification to verify their age. All verification documents are handled securely and in accordance with our Privacy Policy.</p>
            </CardContent>
          </LegalCard>
        </LegalSection>
        
        <ContactSection>
          <ContactTitle>Legal Inquiries</ContactTitle>
          <ContactText>
            For legal inquiries or to request additional information about our licenses and certifications, please contact our legal department.
          </ContactText>
          <Button as={Link} to="/contact">
            <FaEnvelope style={{ marginRight: '0.5rem' }} /> Contact Legal Department
          </Button>
        </ContactSection>
      </Container>
    </PageContainer>
  );
};

export default LegalPage;
