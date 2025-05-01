import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaChevronDown, FaChevronUp, FaShieldAlt } from 'react-icons/fa';
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

const PrivacyCard = styled(Card)`
  padding: 2.5rem;
  margin-bottom: 2rem;
`;

const PrivacySection = styled.section`
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

const ContactInfo = styled.div`
  background: linear-gradient(135deg, rgba(106, 17, 203, 0.1) 0%, rgba(37, 117, 252, 0.1) 100%);
  border-radius: ${({ theme }) => theme.borderRadius};
  padding: 1.5rem;
  margin-top: 2.5rem;
  display: flex;
  align-items: center;
`;

const ContactIcon = styled.div`
  font-size: 2.5rem;
  color: ${({ theme }) => theme.colors.primary};
  margin-right: 1.5rem;
`;

const ContactText = styled.div`
  flex: 1;
  
  h3 {
    font-size: 1.25rem;
    margin-bottom: 0.5rem;
  }
  
  p {
    color: ${({ theme }) => theme.colors.textDim};
    margin-bottom: 0.5rem;
    
    &:last-child {
      margin-bottom: 0;
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

const PrivacyPolicyPage: React.FC = () => {
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
          <p>At GuessBattle, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website, mobile application, and services (collectively, the "Service").</p>
          <p>Please read this Privacy Policy carefully. By accessing or using the Service, you acknowledge that you have read, understood, and agree to be bound by this Privacy Policy. This Privacy Policy is incorporated into and forms part of our Terms of Service.</p>
          <p>If you do not agree with the terms of this Privacy Policy, please do not access the Service.</p>
        </>
      )
    },
    {
      id: 'data-collection',
      title: '2. What Data We Collect',
      content: (
        <>
          <h3>2.1 Personal Information</h3>
          <p>We may collect personal information that you voluntarily provide to us when you register for the Service, express interest in obtaining information about us or our products and services, participate in activities on the Service, or otherwise contact us. The personal information we collect may include:</p>
          <ul>
            <li>Name</li>
            <li>Email address</li>
            <li>Mailing address</li>
            <li>Phone number</li>
            <li>Date of birth</li>
            <li>Government-issued identification (for verification purposes)</li>
            <li>Payment information</li>
            <li>Username and password</li>
            <li>Profile picture</li>
          </ul>
          
          <h3>2.2 Automatically Collected Information</h3>
          <p>When you access or use the Service, we may automatically collect certain information, including:</p>
          <ul>
            <li>Device information (e.g., IP address, browser type, operating system)</li>
            <li>Usage data (e.g., pages visited, time spent on pages, click-through data)</li>
            <li>Location data (if you grant permission)</li>
            <li>Cookies and similar tracking technologies</li>
          </ul>
          
          <h3>2.3 Game-Related Information</h3>
          <p>We collect information related to your gameplay, including:</p>
          <ul>
            <li>Game history and statistics</li>
            <li>Betting patterns and preferences</li>
            <li>Deposits and withdrawals</li>
            <li>Chat messages and interactions with other players</li>
            <li>Achievements and rewards</li>
          </ul>
        </>
      )
    },
    {
      id: 'data-usage',
      title: '3. How We Use Your Data',
      content: (
        <>
          <p>We use the information we collect for various purposes, including:</p>
          
          <h3>3.1 Providing and Improving the Service</h3>
          <ul>
            <li>To create and manage your account</li>
            <li>To process transactions and manage your balance</li>
            <li>To provide customer support</li>
            <li>To improve and optimize the Service</li>
            <li>To develop new features and functionality</li>
          </ul>
          
          <h3>3.2 Security and Compliance</h3>
          <ul>
            <li>To verify your identity and prevent fraud</li>
            <li>To ensure fair play and detect cheating</li>
            <li>To comply with legal obligations</li>
            <li>To enforce our Terms of Service</li>
            <li>To protect the security and integrity of the Service</li>
          </ul>
          
          <h3>3.3 Communication and Marketing</h3>
          <ul>
            <li>To communicate with you about your account and the Service</li>
            <li>To send you updates, promotions, and marketing messages</li>
            <li>To respond to your inquiries and requests</li>
            <li>To conduct surveys and collect feedback</li>
          </ul>
          
          <h3>3.4 Analytics and Research</h3>
          <ul>
            <li>To analyze usage patterns and trends</li>
            <li>To measure the effectiveness of our marketing campaigns</li>
            <li>To conduct research and development</li>
            <li>To generate aggregated, non-identifying statistics</li>
          </ul>
        </>
      )
    },
    {
      id: 'data-sharing',
      title: '4. Third-Party Sharing',
      content: (
        <>
          <p>We may share your information with third parties in certain circumstances, including:</p>
          
          <h3>4.1 Service Providers</h3>
          <p>We may share your information with third-party service providers who perform services on our behalf, such as payment processing, data analysis, email delivery, hosting, customer service, and marketing assistance.</p>
          
          <h3>4.2 Business Partners</h3>
          <p>We may share your information with our business partners to offer you certain products, services, or promotions.</p>
          
          <h3>4.3 Legal Requirements</h3>
          <p>We may disclose your information where required by law or if we believe that such action is necessary to:</p>
          <ul>
            <li>Comply with a legal obligation</li>
            <li>Protect and defend our rights or property</li>
            <li>Prevent or investigate possible wrongdoing in connection with the Service</li>
            <li>Protect the personal safety of users of the Service or the public</li>
            <li>Protect against legal liability</li>
          </ul>
          
          <h3>4.4 Business Transfers</h3>
          <p>We may share or transfer your information in connection with, or during negotiations of, any merger, sale of company assets, financing, or acquisition of all or a portion of our business to another company.</p>
          
          <h3>4.5 With Your Consent</h3>
          <p>We may disclose your information for any other purpose with your consent.</p>
        </>
      )
    },
    {
      id: 'cookies',
      title: '5. Cookies & Tracking',
      content: (
        <>
          <h3>5.1 What Are Cookies</h3>
          <p>Cookies are small data files that are placed on your computer or mobile device when you visit a website. Cookies are widely used by website owners to make their websites work, or to work more efficiently, as well as to provide reporting information.</p>
          
          <h3>5.2 How We Use Cookies</h3>
          <p>We use cookies for the following purposes:</p>
          <ul>
            <li>Essential cookies: These cookies are necessary for the Service to function properly.</li>
            <li>Preference cookies: These cookies remember your preferences and settings.</li>
            <li>Analytics cookies: These cookies help us understand how users interact with the Service.</li>
            <li>Marketing cookies: These cookies track your activity to deliver targeted advertising.</li>
            <li>Security cookies: These cookies help identify and prevent security risks.</li>
          </ul>
          
          <h3>5.3 Your Cookie Choices</h3>
          <p>You can control and manage cookies in various ways. Most web browsers allow you to manage your cookie preferences. You can:</p>
          <ul>
            <li>Delete cookies from your device</li>
            <li>Block cookies by activating the setting on your browser that allows you to refuse all or some cookies</li>
            <li>Set your browser to notify you when you receive a cookie</li>
          </ul>
          <p>Please note that if you choose to block or delete cookies, you may not be able to access certain areas or features of the Service, and some functionality may be impaired.</p>
        </>
      )
    },
    {
      id: 'data-retention',
      title: '6. Data Retention',
      content: (
        <>
          <h3>6.1 Retention Period</h3>
          <p>We will retain your personal information only for as long as is necessary for the purposes set out in this Privacy Policy. We will retain and use your information to the extent necessary to comply with our legal obligations, resolve disputes, and enforce our policies.</p>
          
          <h3>6.2 Account Deletion</h3>
          <p>If you choose to delete your account, we will delete your personal information from our active databases. However, some information may be retained in our files to prevent fraud, troubleshoot problems, assist with investigations, enforce our Terms of Service, or comply with legal requirements.</p>
          
          <h3>6.3 Backup Data</h3>
          <p>We maintain backup copies of our databases to ensure the continuity of our Service. Your information may remain in our backup systems even after deletion from our active databases. Backup data is securely stored and only accessible to authorized personnel.</p>
        </>
      )
    },
    {
      id: 'compliance',
      title: '7. GDPR/Canada Compliance',
      content: (
        <>
          <h3>7.1 Legal Basis for Processing</h3>
          <p>Under the General Data Protection Regulation (GDPR) and Canadian privacy laws, we must have a legal basis for processing your personal information. We rely on the following legal bases:</p>
          <ul>
            <li>Consent: You have given us permission to process your personal information for specific purposes.</li>
            <li>Contract: Processing is necessary for the performance of a contract with you.</li>
            <li>Legal obligation: Processing is necessary for compliance with a legal obligation.</li>
            <li>Legitimate interests: Processing is necessary for our legitimate interests or those of a third party.</li>
          </ul>
          
          <h3>7.2 Your Rights</h3>
          <p>Under the GDPR and Canadian privacy laws, you have certain rights regarding your personal information, including:</p>
          <ul>
            <li>Right to access: You have the right to request copies of your personal information.</li>
            <li>Right to rectification: You have the right to request that we correct inaccurate information.</li>
            <li>Right to erasure: You have the right to request that we delete your personal information.</li>
            <li>Right to restrict processing: You have the right to request that we restrict the processing of your personal information.</li>
            <li>Right to data portability: You have the right to request that we transfer your personal information to another organization or to you.</li>
            <li>Right to object: You have the right to object to our processing of your personal information.</li>
          </ul>
          <p>To exercise these rights, please contact us using the information provided in the "Contact for Privacy Concerns" section.</p>
          
          <h3>7.3 International Data Transfers</h3>
          <p>We may transfer your personal information to countries outside of your country of residence, including to countries that may not provide the same level of data protection as your country. When we transfer your personal information internationally, we take appropriate safeguards to ensure that your information is protected in accordance with this Privacy Policy.</p>
        </>
      )
    },
    {
      id: 'contact',
      title: '8. Contact for Privacy Concerns',
      content: (
        <>
          <p>If you have any questions or concerns about this Privacy Policy or our privacy practices, please contact our Data Protection Officer:</p>
          <p>Email: privacy@guessbattle.com</p>
          <p>Mail: GuessBattle Gaming Inc.<br />Attn: Privacy Officer<br />123 Gaming Street, Suite 456<br />Toronto, ON M5V 2K7<br />Canada</p>
          <p>Phone: +1 (800) 123-4567</p>
          <p>We will respond to your inquiry within 30 days.</p>
        </>
      )
    }
  ];
  
  return (
    <PageContainer>
      <Container>
        <PageTitle>Privacy Policy</PageTitle>
        <PageSubtitle>
          This Privacy Policy explains how we collect, use, and protect your personal information.
        </PageSubtitle>
        <LastUpdated>Last Updated: May 1, 2023</LastUpdated>
        
        <PrivacyCard>
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
            <PrivacySection key={section.id} id={section.id}>
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
            </PrivacySection>
          ))}
          
          <ContactInfo>
            <ContactIcon>
              <FaShieldAlt />
            </ContactIcon>
            <ContactText>
              <h3>Have Privacy Concerns?</h3>
              <p>If you have any questions about this Privacy Policy or our privacy practices, please contact our Privacy Officer at <a href="mailto:privacy@guessbattle.com">privacy@guessbattle.com</a>.</p>
              <p>We are committed to resolving any complaints about our collection or use of your personal information.</p>
            </ContactText>
          </ContactInfo>
        </PrivacyCard>
      </Container>
    </PageContainer>
  );
};

export default PrivacyPolicyPage;
