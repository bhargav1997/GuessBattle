import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { FaTwitter, FaDiscord, FaTelegram, FaInstagram } from "react-icons/fa";
import Container from "./Container";
import Flex from "./Flex";
import Grid from "./Grid";

const FooterContainer = styled.footer`
   background-color: ${({ theme }) => theme.colors.backgroundDarker};
   padding: 3rem 0 1.5rem;
   border-top: 1px solid rgba(255, 255, 255, 0.05);
`;

const FooterLogo = styled(Link)`
   font-family: ${({ theme }) => theme.fonts.heading};
   font-size: 1.5rem;
   font-weight: 700;
   color: ${({ theme }) => theme.colors.textLight};
   text-decoration: none;
   margin-bottom: 1rem;
   display: inline-block;

   span {
      background: ${({ theme }) => theme.colors.gradients.primary};
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
   }
`;

const FooterDescription = styled.p`
   color: ${({ theme }) => theme.colors.textDim};
   margin-bottom: 1.5rem;
   max-width: 300px;
`;

const FooterHeading = styled.h4`
   color: ${({ theme }) => theme.colors.textLight};
   margin-bottom: 1.5rem;
   font-size: 1.125rem;
`;

const FooterLink = styled(Link)`
   color: ${({ theme }) => theme.colors.textDim};
   text-decoration: none;
   margin-bottom: 0.75rem;
   display: block;
   transition: color 0.3s ease;

   &:hover {
      color: ${({ theme }) => theme.colors.primary};
   }
`;

const SocialLinks = styled.div`
   display: flex;
   gap: 1rem;
   margin-top: 1rem;
`;

const SocialIcon = styled.a`
   color: ${({ theme }) => theme.colors.textDim};
   font-size: 1.25rem;
   transition: color 0.3s ease, transform 0.3s ease;

   &:hover {
      color: ${({ theme }) => theme.colors.primary};
      transform: translateY(-3px);
   }
`;

const Copyright = styled.div`
   text-align: center;
   padding-top: 2rem;
   margin-top: 2rem;
   border-top: 1px solid rgba(255, 255, 255, 0.05);
   color: ${({ theme }) => theme.colors.textDim};
   font-size: 0.875rem;
`;

const Footer: React.FC = () => {
   return (
      <FooterContainer>
         <Container>
            <Grid columns='repeat(auto-fit, minmax(250px, 1fr))' gap='2rem'>
               <div>
                  <FooterLogo to='/'>
                     <span>Guess</span>Battle
                  </FooterLogo>
                  <FooterDescription>
                     Win real money by guessing numbers in our exciting multiplayer game. Join tables, compete with friends, and cash out
                     your winnings!
                  </FooterDescription>
                  <SocialLinks>
                     <SocialIcon href='#' target='_blank' rel='noopener noreferrer'>
                        <FaTwitter />
                     </SocialIcon>
                     <SocialIcon href='#' target='_blank' rel='noopener noreferrer'>
                        <FaDiscord />
                     </SocialIcon>
                     <SocialIcon href='#' target='_blank' rel='noopener noreferrer'>
                        <FaTelegram />
                     </SocialIcon>
                     <SocialIcon href='#' target='_blank' rel='noopener noreferrer'>
                        <FaInstagram />
                     </SocialIcon>
                  </SocialLinks>
               </div>

               <div>
                  <FooterHeading>Quick Links</FooterHeading>
                  <FooterLink to='/'>Home</FooterLink>
                  <FooterLink to='/how-to-play'>How to Play</FooterLink>
                  <FooterLink to='/leaderboard'>Leaderboard</FooterLink>
                  <FooterLink to='/dashboard'>Dashboard</FooterLink>
                  <FooterLink to='/game'>Play Now</FooterLink>
               </div>

               <div>
                  <FooterHeading>Support</FooterHeading>
                  <FooterLink to='/faq'>FAQ</FooterLink>
                  <FooterLink to='/support'>Support Center</FooterLink>
                  <FooterLink to='/contact'>Contact Us</FooterLink>
                  <FooterLink to='/responsible-gaming'>Responsible Gaming</FooterLink>
               </div>

               <div>
                  <FooterHeading>Legal</FooterHeading>
                  <FooterLink to='/terms-of-service'>Terms of Service</FooterLink>
                  <FooterLink to='/terms-and-conditions'>Terms & Conditions</FooterLink>
                  <FooterLink to='/privacy-policy'>Privacy Policy</FooterLink>
                  <FooterLink to='/legal'>Legal Information</FooterLink>
                  <FooterLink to='/licenses'>Licenses</FooterLink>
               </div>
            </Grid>

            <Copyright>
               <p>&copy; {new Date().getFullYear()} GuessBattle. All rights reserved.</p>
               <p>GuessBattle is a game of skill. Please play responsibly.</p>
            </Copyright>
         </Container>
      </FooterContainer>
   );
};

export default Footer;
