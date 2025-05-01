import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { 
  FaEnvelope, 
  FaPhone, 
  FaMapMarkerAlt, 
  FaTwitter, 
  FaFacebook, 
  FaInstagram, 
  FaDiscord,
  FaPaperPlane,
  FaCheck
} from 'react-icons/fa';
import Container from '../components/Container';
import Card from '../components/Card';
import Button from '../components/Button';
import Input from '../components/Input';
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

const ContactSection = styled.section`
  margin-bottom: 4rem;
`;

const ContactCard = styled(Card)`
  padding: 2.5rem;
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
`;

const Select = styled.select`
  width: 100%;
  padding: 0.75rem 1rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: ${({ theme }) => theme.borderRadius};
  color: ${({ theme }) => theme.colors.textLight};
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 2px rgba(106, 17, 203, 0.2);
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 0.75rem 1rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: ${({ theme }) => theme.borderRadius};
  color: ${({ theme }) => theme.colors.textLight};
  font-size: 1rem;
  min-height: 150px;
  resize: vertical;
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 2px rgba(106, 17, 203, 0.2);
  }
  
  &::placeholder {
    color: ${({ theme }) => theme.colors.textDim};
  }
`;

const ContactInfoCard = styled(Card)`
  padding: 2rem;
  height: 100%;
  background: linear-gradient(135deg, rgba(106, 17, 203, 0.1) 0%, rgba(37, 117, 252, 0.1) 100%);
  border: 1px solid rgba(106, 17, 203, 0.2);
`;

const ContactInfoTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  
  svg {
    margin-right: 0.75rem;
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const ContactInfoItem = styled.div`
  margin-bottom: 1.5rem;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const ContactInfoLabel = styled.h4`
  font-size: 1.125rem;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  
  svg {
    margin-right: 0.75rem;
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const ContactInfoText = styled.p`
  color: ${({ theme }) => theme.colors.textDim};
  margin-left: 2rem;
  
  a {
    color: ${({ theme }) => theme.colors.primary};
    text-decoration: none;
    transition: color 0.2s ease;
    
    &:hover {
      color: ${({ theme }) => theme.colors.secondary};
      text-decoration: underline;
    }
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
  margin-left: 2rem;
`;

const SocialLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  color: ${({ theme }) => theme.colors.textLight};
  font-size: 1.25rem;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${({ theme }) => theme.colors.primary};
    transform: translateY(-3px);
  }
`;

const MapContainer = styled.div`
  margin-top: 4rem;
  border-radius: ${({ theme }) => theme.borderRadius};
  overflow: hidden;
  height: 400px;
  position: relative;
`;

const MapPlaceholder = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.05);
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.textDim};
  font-style: italic;
`;

const SuccessMessage = styled(motion.div)`
  text-align: center;
  padding: 2rem;
`;

const SuccessIcon = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.success};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.5rem;
  color: white;
  margin: 0 auto 1.5rem;
`;

const SuccessTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

const SuccessText = styled.p`
  color: ${({ theme }) => theme.colors.textDim};
  max-width: 500px;
  margin: 0 auto;
`;

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send the form data to a server
    console.log('Form submitted:', formData);
    
    // Show success message
    setIsSubmitted(true);
    
    // Reset form after 5 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    }, 5000);
  };
  
  return (
    <PageContainer>
      <Container>
        <PageTitle>Contact Us</PageTitle>
        <PageSubtitle>
          Have questions or need assistance? We're here to help! Reach out to our friendly support team.
        </PageSubtitle>
        
        <ContactSection>
          <Grid columns="1fr 1fr" gap="2rem">
            <div>
              <ContactCard>
                {isSubmitted ? (
                  <SuccessMessage
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4 }}
                  >
                    <SuccessIcon>
                      <FaCheck />
                    </SuccessIcon>
                    <SuccessTitle>Message Sent Successfully!</SuccessTitle>
                    <SuccessText>
                      Thank you for reaching out. Our support team will get back to you within 24 hours.
                    </SuccessText>
                  </SuccessMessage>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <FormGroup>
                      <Label htmlFor="name">Your Name</Label>
                      <Input 
                        id="name" 
                        name="name"
                        type="text" 
                        placeholder="Enter your name" 
                        value={formData.name}
                        onChange={handleChange}
                        required
                        fullWidth 
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label htmlFor="email">Email Address</Label>
                      <Input 
                        id="email" 
                        name="email"
                        type="email" 
                        placeholder="Enter your email" 
                        value={formData.email}
                        onChange={handleChange}
                        required
                        fullWidth 
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label htmlFor="subject">Subject</Label>
                      <Select 
                        id="subject" 
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Select a subject</option>
                        <option value="account">Account Issues</option>
                        <option value="payment">Payment Problems</option>
                        <option value="gameplay">Gameplay Questions</option>
                        <option value="technical">Technical Support</option>
                        <option value="feedback">Feedback</option>
                        <option value="other">Other</option>
                      </Select>
                    </FormGroup>
                    <FormGroup>
                      <Label htmlFor="message">Message</Label>
                      <Textarea 
                        id="message" 
                        name="message"
                        placeholder="Please describe your issue or question in detail..."
                        value={formData.message}
                        onChange={handleChange}
                        required
                      />
                    </FormGroup>
                    <Button type="submit" fullWidth>
                      <FaPaperPlane style={{ marginRight: '0.5rem' }} /> Send Message
                    </Button>
                  </form>
                )}
              </ContactCard>
            </div>
            
            <div>
              <ContactInfoCard>
                <ContactInfoTitle>
                  <FaEnvelope /> Contact Information
                </ContactInfoTitle>
                
                <ContactInfoItem>
                  <ContactInfoLabel>
                    <FaEnvelope /> Email
                  </ContactInfoLabel>
                  <ContactInfoText>
                    <a href="mailto:support@guessbattle.com">support@guessbattle.com</a>
                  </ContactInfoText>
                </ContactInfoItem>
                
                <ContactInfoItem>
                  <ContactInfoLabel>
                    <FaPhone /> Phone
                  </ContactInfoLabel>
                  <ContactInfoText>
                    <a href="tel:+18001234567">+1 (800) 123-4567</a>
                    <br />
                    <small>Available Monday-Friday, 9 AM - 8 PM EST</small>
                  </ContactInfoText>
                </ContactInfoItem>
                
                <ContactInfoItem>
                  <ContactInfoLabel>
                    <FaMapMarkerAlt /> Office Address
                  </ContactInfoLabel>
                  <ContactInfoText>
                    123 Gaming Street, Suite 456<br />
                    Toronto, ON M5V 2K7<br />
                    Canada
                  </ContactInfoText>
                </ContactInfoItem>
                
                <ContactInfoItem>
                  <ContactInfoLabel>
                    <FaTwitter /> Social Media
                  </ContactInfoLabel>
                  <SocialLinks>
                    <SocialLink href="https://twitter.com/guessbattle" target="_blank" rel="noopener noreferrer">
                      <FaTwitter />
                    </SocialLink>
                    <SocialLink href="https://facebook.com/guessbattle" target="_blank" rel="noopener noreferrer">
                      <FaFacebook />
                    </SocialLink>
                    <SocialLink href="https://instagram.com/guessbattle" target="_blank" rel="noopener noreferrer">
                      <FaInstagram />
                    </SocialLink>
                    <SocialLink href="https://discord.gg/guessbattle" target="_blank" rel="noopener noreferrer">
                      <FaDiscord />
                    </SocialLink>
                  </SocialLinks>
                </ContactInfoItem>
              </ContactInfoCard>
            </div>
          </Grid>
        </ContactSection>
        
        <MapContainer>
          <MapPlaceholder>
            [Google Map would be embedded here showing the office location]
          </MapPlaceholder>
        </MapContainer>
      </Container>
    </PageContainer>
  );
};

export default ContactPage;
