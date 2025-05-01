import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { 
  FaSearch, 
  FaUserCircle, 
  FaCreditCard, 
  FaDice, 
  FaLaptopCode, 
  FaEnvelope, 
  FaComments,
  FaArrowRight
} from 'react-icons/fa';
import Container from '../components/Container';
import Card from '../components/Card';
import Button from '../components/Button';
import Input from '../components/Input';
import Grid from '../components/Grid';
import Flex from '../components/Flex';

// Mock data for support articles
const supportCategories = [
  {
    id: 'account',
    title: 'Account Issues',
    icon: <FaUserCircle />,
    articles: [
      { id: 1, title: 'How to reset your password', views: 1245 },
      { id: 2, title: 'Updating your profile information', views: 987 },
      { id: 3, title: 'Account verification process', views: 1532 },
      { id: 4, title: 'Two-factor authentication setup', views: 876 },
    ]
  },
  {
    id: 'payments',
    title: 'Payments',
    icon: <FaCreditCard />,
    articles: [
      { id: 5, title: 'Available payment methods', views: 2134 },
      { id: 6, title: 'Withdrawal process and timeframes', views: 1876 },
      { id: 7, title: 'Deposit limits and minimums', views: 1432 },
      { id: 8, title: 'Payment security measures', views: 1098 },
    ]
  },
  {
    id: 'gameplay',
    title: 'Gameplay',
    icon: <FaDice />,
    articles: [
      { id: 9, title: 'Rules of GuessBattle', views: 3245 },
      { id: 10, title: 'Betting options explained', views: 2876 },
      { id: 11, title: 'Creating private tables', views: 1765 },
      { id: 12, title: 'Understanding win rates and odds', views: 2143 },
    ]
  },
  {
    id: 'technical',
    title: 'Technical',
    icon: <FaLaptopCode />,
    articles: [
      { id: 13, title: 'Browser compatibility', views: 876 },
      { id: 14, title: 'Mobile app installation guide', views: 1432 },
      { id: 15, title: 'Connection issues troubleshooting', views: 1987 },
      { id: 16, title: 'System requirements', views: 765 },
    ]
  }
];

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

const SearchContainer = styled.div`
  max-width: 700px;
  margin: 0 auto 4rem;
  position: relative;
`;

const SearchIcon = styled.div`
  position: absolute;
  left: 1.5rem;
  top: 50%;
  transform: translateY(-50%);
  color: ${({ theme }) => theme.colors.textDim};
  font-size: 1.25rem;
`;

const SearchInput = styled(Input)`
  padding: 1.25rem 1.25rem 1.25rem 3.5rem;
  font-size: 1.125rem;
  border-radius: 50px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  
  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 3px rgba(106, 17, 203, 0.2);
  }
`;

const CategorySection = styled.section`
  margin-bottom: 4rem;
`;

const CategoryCard = styled(motion(Card))`
  padding: 2rem;
  height: 100%;
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.05);
  
  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: ${({ theme }) => theme.shadows.neonGlow};
    transform: translateY(-5px);
  }
`;

const CategoryIcon = styled.div`
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  color: ${({ theme }) => theme.colors.primary};
`;

const CategoryTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
`;

const ArticleList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const ArticleItem = styled.li`
  margin-bottom: 1rem;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const ArticleLink = styled.a`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${({ theme }) => theme.colors.textLight};
  text-decoration: none;
  padding: 0.75rem 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  transition: all 0.2s ease;
  
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
  
  span {
    font-size: 0.875rem;
    color: ${({ theme }) => theme.colors.textDim};
  }
`;

const ViewAllLink = styled.a`
  display: inline-flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.primary};
  margin-top: 1.5rem;
  font-weight: 500;
  text-decoration: none;
  
  svg {
    margin-left: 0.5rem;
    transition: transform 0.2s ease;
  }
  
  &:hover svg {
    transform: translateX(3px);
  }
`;

const ContactSection = styled.section`
  margin-top: 4rem;
`;

const ContactTitle = styled.h2`
  font-size: 2rem;
  text-align: center;
  margin-bottom: 2rem;
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

const LiveChatButton = styled(Button)`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: ${({ theme }) => theme.shadows.neonGlow};
  z-index: 100;
  
  svg {
    font-size: 1.5rem;
  }
`;

const UrgentHelpCard = styled(Card)`
  padding: 2rem;
  margin-top: 3rem;
  text-align: center;
  background: linear-gradient(135deg, rgba(106, 17, 203, 0.2) 0%, rgba(37, 117, 252, 0.2) 100%);
  border: 1px solid rgba(106, 17, 203, 0.3);
`;

const UrgentHelpTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

const UrgentHelpText = styled.p`
  color: ${({ theme }) => theme.colors.textDim};
  margin-bottom: 1.5rem;
`;

const SupportPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  return (
    <PageContainer>
      <Container>
        <PageTitle>Support Center</PageTitle>
        <PageSubtitle>
          Find answers to your questions or contact our support team for personalized assistance.
        </PageSubtitle>
        
        <SearchContainer>
          <SearchIcon>
            <FaSearch />
          </SearchIcon>
          <SearchInput 
            placeholder="How can we help?" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            fullWidth
          />
        </SearchContainer>
        
        <CategorySection>
          <Grid columns="repeat(auto-fit, minmax(280px, 1fr))" gap="2rem">
            {supportCategories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <CategoryCard>
                  <CategoryIcon>{category.icon}</CategoryIcon>
                  <CategoryTitle>{category.title}</CategoryTitle>
                  <ArticleList>
                    {category.articles.slice(0, 3).map(article => (
                      <ArticleItem key={article.id}>
                        <ArticleLink href={`#article-${article.id}`}>
                          {article.title}
                          <span>{article.views} views</span>
                        </ArticleLink>
                      </ArticleItem>
                    ))}
                  </ArticleList>
                  <ViewAllLink href={`#category-${category.id}`}>
                    View all articles <FaArrowRight />
                  </ViewAllLink>
                </CategoryCard>
              </motion.div>
            ))}
          </Grid>
        </CategorySection>
        
        <ContactSection>
          <ContactTitle>Contact Us</ContactTitle>
          <ContactCard>
            <Grid columns="1fr 1fr" gap="3rem">
              <div>
                <FormGroup>
                  <Label htmlFor="name">Your Name</Label>
                  <Input id="name" type="text" placeholder="Enter your name" fullWidth />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" placeholder="Enter your email" fullWidth />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="issue">Issue Type</Label>
                  <Select id="issue">
                    <option value="">Select an issue type</option>
                    <option value="account">Account Issues</option>
                    <option value="payment">Payment Problems</option>
                    <option value="gameplay">Gameplay Questions</option>
                    <option value="technical">Technical Support</option>
                    <option value="other">Other</option>
                  </Select>
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="message">Message</Label>
                  <Textarea 
                    id="message" 
                    placeholder="Please describe your issue in detail..."
                  />
                </FormGroup>
                <Button type="submit" fullWidth>
                  <FaEnvelope style={{ marginRight: '0.5rem' }} /> Submit Ticket
                </Button>
              </div>
              
              <div>
                <Flex direction="column" gap="1.5rem">
                  <div>
                    <h3>Support Hours</h3>
                    <p>Our support team is available 24/7 to assist you with any questions or issues.</p>
                  </div>
                  
                  <div>
                    <h3>Email Support</h3>
                    <p>For non-urgent inquiries: <a href="mailto:support@guessbattle.com">support@guessbattle.com</a></p>
                  </div>
                  
                  <div>
                    <h3>Phone Support</h3>
                    <p>For urgent matters: <a href="tel:+18001234567">+1 (800) 123-4567</a></p>
                    <p>Available Monday-Friday, 9 AM - 8 PM EST</p>
                  </div>
                  
                  <UrgentHelpCard>
                    <UrgentHelpTitle>Need Urgent Help?</UrgentHelpTitle>
                    <UrgentHelpText>
                      Our live chat support is available 24/7 for immediate assistance with urgent issues.
                    </UrgentHelpText>
                    <Button>
                      <FaComments style={{ marginRight: '0.5rem' }} /> Start Live Chat
                    </Button>
                  </UrgentHelpCard>
                </Flex>
              </div>
            </Grid>
          </ContactCard>
        </ContactSection>
      </Container>
      
      <LiveChatButton
        as={motion.button}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <FaComments />
      </LiveChatButton>
    </PageContainer>
  );
};

export default SupportPage;
