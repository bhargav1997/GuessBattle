import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaUserPlus, FaCoins, FaUsers, FaDice, FaTrophy } from "react-icons/fa";
import Container from "../components/Container";
import Button from "../components/Button";
import Card from "../components/Card";
import Grid from "../components/Grid";
import NumberSpinner from "../components/NumberSpinner";

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

const StepCard = styled(motion(Card))`
   padding: 2rem;
   height: 100%;
   position: relative;
   overflow: hidden;
`;

const StepNumber = styled.div`
   position: absolute;
   top: -15px;
   left: -15px;
   width: 50px;
   height: 50px;
   border-radius: 50%;
   background: ${({ theme }) => theme.colors.gradients.primary};
   display: flex;
   align-items: center;
   justify-content: center;
   font-weight: 700;
   font-size: 1.5rem;
   box-shadow: ${({ theme }) => theme.shadows.neonGlow};
`;

const StepIcon = styled.div`
   font-size: 3rem;
   margin-bottom: 1.5rem;
   color: ${({ theme }) => theme.colors.primary};
   text-align: center;
`;

const StepTitle = styled.h3`
   font-size: 1.5rem;
   margin-bottom: 1rem;
   text-align: center;
`;

const StepDescription = styled.p`
   color: ${({ theme }) => theme.colors.textDim};
   text-align: center;
`;

const ExampleSection = styled.section`
   margin: 4rem 0;
`;

const ExampleTitle = styled.h2`
   font-size: 2rem;
   text-align: center;
   margin-bottom: 2rem;
`;

const ExampleCard = styled(Card)`
   padding: 2rem;
`;

const ExampleGrid = styled.div`
   display: grid;
   grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
   gap: 2rem;

   @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
      grid-template-columns: 1fr;
   }
`;

const ExampleStep = styled.div`
   margin-bottom: 1.5rem;

   &:last-child {
      margin-bottom: 0;
   }
`;

const ExampleStepTitle = styled.h4`
   font-size: 1.25rem;
   margin-bottom: 0.5rem;
   display: flex;
   align-items: center;

   span {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 30px;
      height: 30px;
      border-radius: 50%;
      background: ${({ theme }) => theme.colors.primary};
      color: white;
      font-size: 0.875rem;
      margin-right: 0.75rem;
   }
`;

const ExampleStepDescription = styled.p`
   color: ${({ theme }) => theme.colors.textDim};
   margin-left: 2.5rem;
`;

const ExampleImage = styled.div`
   background: rgba(255, 255, 255, 0.05);
   border-radius: ${({ theme }) => theme.borderRadius};
   height: 400px;
   display: flex;
   align-items: center;
   justify-content: center;
   color: ${({ theme }) => theme.colors.textDim};
   font-style: italic;
`;

const CTASection = styled.section`
   text-align: center;
   margin: 4rem 0 2rem;
`;

const CTATitle = styled.h2`
   font-size: 2rem;
   margin-bottom: 1.5rem;
`;

const CTADescription = styled.p`
   color: ${({ theme }) => theme.colors.textDim};
   max-width: 600px;
   margin: 0 auto 2rem;
`;

const HowToPlayPage: React.FC = () => {
   return (
      <PageContainer>
         <Container>
            <PageTitle>How to Play GuessBattle</PageTitle>
            <PageSubtitle>
               Learn the rules and strategies of GuessBattle, the exciting number guessing game where your prediction skills can earn you
               real money!
            </PageSubtitle>

            <Grid columns='repeat(auto-fit, minmax(250px, 1fr))' gap='2rem'>
               <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}>
                  <StepCard>
                     <StepNumber>1</StepNumber>
                     <StepIcon>
                        <FaUserPlus />
                     </StepIcon>
                     <StepTitle>Sign Up and Buy Chips</StepTitle>
                     <StepDescription>
                        Create your account and purchase chips to start playing. Various packages are available to suit your budget.
                     </StepDescription>
                  </StepCard>
               </motion.div>

               <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  viewport={{ once: true }}>
                  <StepCard>
                     <StepNumber>2</StepNumber>
                     <StepIcon>
                        <FaUsers />
                     </StepIcon>
                     <StepTitle>Join a Table</StepTitle>
                     <StepDescription>
                        Join an existing game table or create your own. Each table requires at least 2 players to start a game.
                     </StepDescription>
                  </StepCard>
               </motion.div>

               <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ once: true }}>
                  <StepCard>
                     <StepNumber>3</StepNumber>
                     <StepIcon>
                        <FaCoins />
                     </StepIcon>
                     <StepTitle>Place Your Bet</StepTitle>
                     <StepDescription>
                        Bet by guessing a specific number (00-99) or choose conditions like even/odd, above/below 50, or close range.
                     </StepDescription>
                  </StepCard>
               </motion.div>

               <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  viewport={{ once: true }}>
                  <StepCard>
                     <StepNumber>4</StepNumber>
                     <StepIcon>
                        <FaDice />
                     </StepIcon>
                     <StepTitle>Wait for Result</StepTitle>
                     <StepDescription>
                        Each round lasts 30 seconds. After all players place their bets, the winning number is revealed.
                     </StepDescription>
                  </StepCard>
               </motion.div>

               <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  viewport={{ once: true }}>
                  <StepCard>
                     <StepNumber>5</StepNumber>
                     <StepIcon>
                        <FaTrophy />
                     </StepIcon>
                     <StepTitle>Win Based on Precision</StepTitle>
                     <StepDescription>
                        Highest reward for guessing the exact number, smaller rewards for other conditions like even/odd or range bets.
                     </StepDescription>
                  </StepCard>
               </motion.div>
            </Grid>

            <ExampleSection>
               <ExampleTitle>Example Round</ExampleTitle>
               <ExampleCard>
                  <ExampleGrid>
                     <div>
                        <ExampleStep>
                           <ExampleStepTitle>
                              <span>1</span> Players Join Table
                           </ExampleStepTitle>
                           <ExampleStepDescription>
                              John, Sarah, and Mike join the "High Rollers" table with a minimum bet of $10.
                           </ExampleStepDescription>
                        </ExampleStep>

                        <ExampleStep>
                           <ExampleStepTitle>
                              <span>2</span> Place Bets
                           </ExampleStepTitle>
                           <ExampleStepDescription>
                              John bets $20 on number 42, Sarah bets $15 on "Above 50", and Mike bets $25 on "Even Numbers".
                           </ExampleStepDescription>
                        </ExampleStep>

                        <ExampleStep>
                           <ExampleStepTitle>
                              <span>3</span> Timer Counts Down
                           </ExampleStepTitle>
                           <ExampleStepDescription>
                              The 30-second timer starts. Players can see each other's avatars but not their specific bets.
                           </ExampleStepDescription>
                        </ExampleStep>

                        <ExampleStep>
                           <ExampleStepTitle>
                              <span>4</span> Number Revealed
                           </ExampleStepTitle>
                           <ExampleStepDescription>
                              The winning number is 76. Sarah wins with her "Above 50" bet, and Mike wins with his "Even Numbers" bet.
                           </ExampleStepDescription>
                        </ExampleStep>

                        <ExampleStep>
                           <ExampleStepTitle>
                              <span>5</span> Winnings Distributed
                           </ExampleStepTitle>
                           <ExampleStepDescription>
                              Sarah receives $30 (2x her bet), and Mike receives $50 (2x his bet). John doesn't win this round.
                           </ExampleStepDescription>
                        </ExampleStep>
                     </div>

                     <ExampleImage>
                        <NumberSpinner autoPlay={false} />
                     </ExampleImage>
                  </ExampleGrid>
               </ExampleCard>
            </ExampleSection>

            <CTASection>
               <CTATitle>Ready to Test Your Prediction Skills?</CTATitle>
               <CTADescription>
                  Join thousands of players already winning real money on GuessBattle. Sign up now and get a welcome bonus of 100 free
                  chips!
               </CTADescription>
               <Button as={Link} to='/signup' size='large'>
                  Start Playing Now
               </Button>
            </CTASection>
         </Container>
      </PageContainer>
   );
};

export default HowToPlayPage;
