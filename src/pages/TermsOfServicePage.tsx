import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import Container from '../components/Container';
import Card from '../components/Card';

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

const LastUpdated = styled.p`
  text-align: center;
  color: ${({ theme }) => theme.colors.textDim};
  margin-bottom: 3rem;
  font-size: 0.875rem;
`;

const TermsCard = styled(Card)`
  padding: 2.5rem;
  margin-bottom: 2rem;
`;

const TermsSection = styled.section`
  margin-bottom: 2.5rem;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const SectionHeader = styled.div<{ isOpen: boolean }>`
  cursor: pointer;
  padding-bottom: 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  margin-bottom: ${({ isOpen }) => isOpen ? '1.5rem' : '0'};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SectionTitle = styled.h2`
  font-size: 1.75rem;
  margin: 0;
`;

const ToggleIcon = styled.div`
  color: ${({ theme }) => theme.colors.primary};
  font-size: 1.25rem;
`;

const SectionContent = styled(motion.div)`
  color: ${({ theme }) => theme.colors.textDim};
  line-height: 1.7;
  
  h3 {
    font-size: 1.25rem;
    color: ${({ theme }) => theme.colors.textLight};
    margin: 1.5rem 0 1rem;
  }
  
  p {
    margin-bottom: 1rem;
  }
  
  ul, ol {
    margin-bottom: 1.5rem;
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

const TableOfContents = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: ${({ theme }) => theme.borderRadius};
  padding: 1.5rem;
  margin-bottom: 2.5rem;
`;

const TOCTitle = styled.h3`
  font-size: 1.25rem;
  margin-bottom: 1rem;
`;

const TOCList = styled.ol`
  padding-left: 1.5rem;
  
  li {
    margin-bottom: 0.5rem;
    
    a {
      color: ${({ theme }) => theme.colors.primary};
      text-decoration: none;
      
      &:hover {
        text-decoration: underline;
      }
    }
  }
`;

const TermsOfServicePage: React.FC = () => {
  const [openSections, setOpenSections] = useState<string[]>(['introduction']);
  
  const toggleSection = (sectionId: string) => {
    setOpenSections(prev => 
      prev.includes(sectionId)
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };
  
  const isSectionOpen = (sectionId: string) => openSections.includes(sectionId);
  
  const sections = [
    {
      id: 'introduction',
      title: '1. Introduction',
      content: (
        <>
          <p>Welcome to GuessBattle. These Terms of Service ("Terms") govern your access to and use of the GuessBattle website, mobile application, and services (collectively, the "Service"). Please read these Terms carefully before using the Service.</p>
          <p>By accessing or using the Service, you agree to be bound by these Terms and our Privacy Policy. If you do not agree to these Terms, you may not access or use the Service.</p>
          <p>GuessBattle is operated by GuessBattle Gaming Inc., a company registered in Canada with its principal place of business at 123 Gaming Street, Toronto, ON M5V 2K7.</p>
        </>
      )
    },
    {
      id: 'account',
      title: '2. Account Usage Rules',
      content: (
        <>
          <h3>2.1 Account Registration</h3>
          <p>To use certain features of the Service, you must register for an account. When you register, you must provide accurate and complete information. You are solely responsible for the activity that occurs on your account, and you must keep your account password secure.</p>
          
          <h3>2.2 Age Restrictions</h3>
          <p>You must be at least 18 years old (or the age of legal majority in your jurisdiction, whichever is greater) to create an account and use the Service. By creating an account and using the Service, you represent and warrant that you are of legal age.</p>
          
          <h3>2.3 Account Limitations</h3>
          <p>You may not:</p>
          <ul>
            <li>Create multiple accounts for the same person</li>
            <li>Share your account with any other person</li>
            <li>Transfer your account to another person</li>
            <li>Use another person's account without permission</li>
            <li>Provide false information when registering an account</li>
          </ul>
          
          <h3>2.4 Account Verification</h3>
          <p>We may, at any time, require you to verify your identity to continue using the Service. This may include providing government-issued identification and proof of address. Failure to comply with verification requests may result in suspension or termination of your account.</p>
        </>
      )
    },
    {
      id: 'eligibility',
      title: '3. Game Eligibility',
      content: (
        <>
          <h3>3.1 Jurisdictional Restrictions</h3>
          <p>The Service is intended for use by residents of Canada and other jurisdictions where online skill-based gaming is legal. You are responsible for determining whether your use of the Service is legal in your jurisdiction. We reserve the right to restrict access to the Service based on your location.</p>
          
          <h3>3.2 Prohibited Persons</h3>
          <p>The following persons are prohibited from using the Service:</p>
          <ul>
            <li>Persons under the age of 18 (or the age of legal majority in their jurisdiction)</li>
            <li>Employees, officers, and directors of GuessBattle Gaming Inc. and their immediate family members</li>
            <li>Persons who have self-excluded from gambling activities</li>
            <li>Persons who have been banned from the Service for any reason</li>
            <li>Persons residing in jurisdictions where use of the Service is illegal</li>
          </ul>
          
          <h3>3.3 Skill-Based Gaming</h3>
          <p>GuessBattle is a skill-based gaming platform. The outcome of games is primarily determined by player skill rather than chance. By using the Service, you acknowledge that your success depends on your skill and strategy.</p>
        </>
      )
    },
    {
      id: 'fair-play',
      title: '4. Fair Play Policies',
      content: (
        <>
          <h3>4.1 Prohibited Activities</h3>
          <p>You agree not to engage in any of the following prohibited activities:</p>
          <ul>
            <li>Cheating, exploiting bugs, or using unauthorized third-party software</li>
            <li>Colluding with other players to gain an unfair advantage</li>
            <li>Using automated systems, bots, scripts, or other software to play games</li>
            <li>Deliberately losing games or manipulating outcomes</li>
            <li>Harassing, threatening, or abusing other players</li>
            <li>Engaging in any activity that disrupts the normal operation of the Service</li>
          </ul>
          
          <h3>4.2 Monitoring and Enforcement</h3>
          <p>We monitor gameplay to ensure fair play. We may use automated systems and human review to detect violations of our fair play policies. We reserve the right to investigate suspicious activity and take appropriate action, including suspending or terminating accounts.</p>
          
          <h3>4.3 Reporting Violations</h3>
          <p>If you believe another player is violating our fair play policies, please report them through the in-game reporting system or by contacting our support team. We take all reports seriously and will investigate accordingly.</p>
        </>
      )
    },
    {
      id: 'payments',
      title: '5. Payment Terms',
      content: (
        <>
          <h3>5.1 Deposits</h3>
          <p>You may deposit funds into your account using the payment methods we make available. All deposits must be made using your own payment methods. We reserve the right to verify the source of deposits and refuse or reverse deposits that violate these Terms.</p>
          
          <h3>5.2 Withdrawals</h3>
          <p>You may withdraw available funds from your account at any time, subject to our verification procedures. Withdrawals will be processed using the same payment method used for deposits when possible. We may require additional verification before processing withdrawals.</p>
          
          <h3>5.3 Fees</h3>
          <p>We do not charge fees for deposits or withdrawals, but your payment provider may impose fees. You are responsible for any fees charged by your payment provider.</p>
          
          <h3>5.4 Currency</h3>
          <p>All transactions on the Service are conducted in Canadian Dollars (CAD). If you use a payment method denominated in another currency, your payment provider will convert the amount at their exchange rate.</p>
          
          <h3>5.5 Taxes</h3>
          <p>You are solely responsible for any taxes applicable to your winnings. We may be required to report your winnings to tax authorities. We may withhold taxes from your winnings if required by law.</p>
        </>
      )
    },
    {
      id: 'breach',
      title: '6. Breach Consequences',
      content: (
        <>
          <h3>6.1 Investigation</h3>
          <p>We may investigate suspected violations of these Terms. During an investigation, we may suspend your account and withhold funds until the investigation is complete.</p>
          
          <h3>6.2 Remedies</h3>
          <p>If we determine that you have violated these Terms, we may take any of the following actions:</p>
          <ul>
            <li>Issue a warning</li>
            <li>Temporarily suspend your account</li>
            <li>Permanently terminate your account</li>
            <li>Forfeit funds in your account</li>
            <li>Ban you from future use of the Service</li>
            <li>Take legal action against you</li>
          </ul>
          
          <h3>6.3 Appeals</h3>
          <p>If you believe we have taken action against your account in error, you may appeal by contacting our support team. We will review your appeal and make a final determination.</p>
        </>
      )
    },
    {
      id: 'updates',
      title: '7. Updates & Revisions',
      content: (
        <>
          <h3>7.1 Changes to Terms</h3>
          <p>We may modify these Terms at any time. If we make material changes, we will notify you by email or by posting a notice on the Service. Your continued use of the Service after the changes take effect constitutes your acceptance of the revised Terms.</p>
          
          <h3>7.2 Changes to the Service</h3>
          <p>We reserve the right to modify, suspend, or discontinue the Service or any part thereof at any time, with or without notice. We will not be liable to you or any third party for any modification, suspension, or discontinuation of the Service.</p>
          
          <h3>7.3 Notification of Changes</h3>
          <p>We will make reasonable efforts to notify you of significant changes to these Terms or the Service. However, it is your responsibility to review these Terms periodically to stay informed of any changes.</p>
        </>
      )
    }
  ];
  
  return (
    <PageContainer>
      <Container>
        <PageTitle>Terms of Service</PageTitle>
        <PageSubtitle>
          Please read these Terms of Service carefully before using GuessBattle.
        </PageSubtitle>
        <LastUpdated>Last Updated: May 1, 2023</LastUpdated>
        
        <TermsCard>
          <TableOfContents>
            <TOCTitle>Table of Contents</TOCTitle>
            <TOCList>
              {sections.map(section => (
                <li key={section.id}>
                  <a 
                    href={`#${section.id}`} 
                    onClick={(e) => {
                      e.preventDefault();
                      toggleSection(section.id);
                      document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    {section.title}
                  </a>
                </li>
              ))}
            </TOCList>
          </TableOfContents>
          
          {sections.map(section => (
            <TermsSection key={section.id} id={section.id}>
              <SectionHeader 
                isOpen={isSectionOpen(section.id)}
                onClick={() => toggleSection(section.id)}
              >
                <SectionTitle>{section.title}</SectionTitle>
                <ToggleIcon>
                  {isSectionOpen(section.id) ? <FaChevronUp /> : <FaChevronDown />}
                </ToggleIcon>
              </SectionHeader>
              
              {isSectionOpen(section.id) && (
                <SectionContent
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {section.content}
                </SectionContent>
              )}
            </TermsSection>
          ))}
        </TermsCard>
      </Container>
    </PageContainer>
  );
};

export default TermsOfServicePage;
