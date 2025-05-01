import React, { useState } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { FaQuestionCircle, FaShieldAlt, FaTrophy, FaDice, FaUsers, FaSearch, FaChevronDown, FaChevronUp } from "react-icons/fa";
import Container from "../components/Container";
import Card from "../components/Card";
import Input from "../components/Input";
import Grid from "../components/Grid";

// FAQ data
const faqCategories = [
   {
      id: "gameplay",
      title: "Gameplay",
      icon: <FaDice />,
      questions: [
         {
            id: 1,
            question: "How do I play the game?",
            answer:
               "GuessBattle is simple! Join a table, place your bet, and pick a number between 00-99. If your number matches the winning number, you win! You can also bet on special options like Above/Below 50, Even/Odd, or Close (±5). Each round lasts 30 seconds, and the winning number is revealed at the end of the countdown.",
         },
         {
            id: 2,
            question: "How is the winner decided?",
            answer:
               "The winner is determined based on the betting option chosen. If you bet on a specific number and it matches the winning number, you win the highest payout (typically 10x your bet). If you bet on conditions like Even/Odd or Above/Below 50 and the winning number meets that condition, you win a smaller payout (typically 2x your bet). For Close Range bets, you win if your number is within ±5 of the winning number.",
         },
         {
            id: 3,
            question: "What happens if no one guesses correctly?",
            answer:
               "If no player guesses the exact winning number, players who bet on conditions (Even/Odd, Above/Below 50, Close Range) that match the winning number will still win their respective payouts. If no player wins in a round, the chips from that round may be added to a progressive jackpot for future rounds, depending on the table settings.",
         },
         {
            id: 4,
            question: "What is the close range win?",
            answer:
               "The Close Range bet is a special betting option where you win if your chosen number is within 5 numbers (higher or lower) of the winning number. For example, if you bet on 42 and the winning number is anywhere from 37 to 47, you win. This bet typically pays out 2x your bet amount.",
         },
      ],
   },
   {
      id: "security",
      title: "Security & Payments",
      icon: <FaShieldAlt />,
      questions: [
         {
            id: 5,
            question: "Is my money safe?",
            answer:
               "Yes, your money is completely safe on GuessBattle. We use bank-level encryption to protect all transactions and personal data. Our platform is regularly audited by independent security firms, and we comply with all relevant financial regulations. Player funds are kept in segregated accounts separate from our operating funds.",
         },
         {
            id: 6,
            question: "How do deposits and withdrawals work?",
            answer:
               "GuessBattle supports multiple payment methods including credit/debit cards, e-wallets (PayPal, Skrill), and cryptocurrency. Deposits are instant, while withdrawals are processed within 24-48 hours depending on your payment method. There is a minimum deposit of $10 and a minimum withdrawal of $20. All transactions are secured with SSL encryption.",
         },
         {
            id: 7,
            question: "Is GuessBattle fair and regulated?",
            answer:
               "Absolutely! GuessBattle uses a certified Random Number Generator (RNG) that is regularly tested for fairness by independent auditors. Our platform is licensed and regulated by the appropriate gaming authorities, ensuring that we operate with transparency and integrity. All game results are provably fair and cannot be manipulated.",
         },
         {
            id: 8,
            question: "How do you protect my personal information?",
            answer:
               "We take data protection very seriously. Your personal information is encrypted and stored securely in compliance with data protection regulations. We never share your data with unauthorized third parties. Our privacy policy details exactly how your information is used and protected.",
         },
      ],
   },
   {
      id: "social",
      title: "Social & Community",
      icon: <FaUsers />,
      questions: [
         {
            id: 9,
            question: "Can I play with friends only?",
            answer:
               'Yes! GuessBattle allows you to create private tables that only your friends can join. When creating a table, simply select the "Private" option and you\'ll receive a unique code that you can share with friends. Only players with this code will be able to join your table.',
         },
         {
            id: 10,
            question: "Is there a chat function during games?",
            answer:
               "Yes, each game table has a built-in chat function where players can communicate with each other. You can also use emoji reactions to quickly respond to game events. Our chat is moderated to ensure a friendly and respectful environment for all players.",
         },
         {
            id: 11,
            question: "How do I invite friends to play?",
            answer:
               'You can invite friends to play GuessBattle in several ways. You can share your referral link (found in your profile), send them a direct invitation via email through our "Invite Friends" feature, or share a private table code. When friends sign up using your referral link, both you and your friend receive bonus chips!',
         },
         {
            id: 12,
            question: "Are there tournaments or special events?",
            answer:
               'Yes! GuessBattle regularly hosts tournaments and special events with larger prize pools and unique game formats. These events are announced on our homepage and via email notifications. Some tournaments have entry fees while others are free to join. Check the "Tournaments" section for upcoming events.',
         },
      ],
   },
   {
      id: "rewards",
      title: "Rewards & Bonuses",
      icon: <FaTrophy />,
      questions: [
         {
            id: 13,
            question: "How does the leaderboard work?",
            answer:
               "The GuessBattle leaderboard ranks players based on their performance over different time periods (weekly, monthly, all-time). Rankings are determined by total chips won, with additional factors like win rate and games played used as tiebreakers. Top-ranked players receive special rewards and recognition in the GuessBattle community.",
         },
         {
            id: 14,
            question: "Are there any bonuses for new players?",
            answer:
               "Yes! New players receive a welcome bonus of 100 free chips upon signing up. Additionally, your first deposit is matched 100% up to $100 in chips. We also offer a no-deposit bonus where you can earn free chips by completing your profile and verifying your email and phone number.",
         },
         {
            id: 15,
            question: "Is there a loyalty program?",
            answer:
               "Yes, GuessBattle has a comprehensive loyalty program where you earn points for every game you play, regardless of whether you win or lose. These points help you progress through different loyalty levels, each offering better perks such as cashback, higher deposit bonuses, faster withdrawals, and exclusive tournament access.",
         },
         {
            id: 16,
            question: "How do referral bonuses work?",
            answer:
               "When you refer friends to GuessBattle using your unique referral link, both you and your friend receive bonus chips when they sign up. Additionally, you earn a percentage of your referrals' first deposits as bonus chips. The more friends you refer, the more bonuses you can earn!",
         },
      ],
   },
];

const PageContainer = styled.div`
   padding: 4rem 0;
`;

const PageTitle = styled.h1`
   font-size: 3rem;
   text-align: center;
   margin-bottom: 1rem;

   @media (max-width: ${({ theme }) => theme?.breakpoints.tablet}) {
      font-size: 2.5rem;
   }
`;

const PageSubtitle = styled.p`
   font-size: 1.25rem;
   text-align: center;
   color: ${({ theme }) => theme?.colors.textDim};
   max-width: 800px;
   margin: 0 auto 3rem;

   @media (max-width: ${({ theme }) => theme?.breakpoints.tablet}) {
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
   color: ${({ theme }) => theme?.colors.textDim};
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
   margin-bottom: 3rem;
`;

const CategoryTitle = styled.h2`
   font-size: 2rem;
   margin-bottom: 1.5rem;
   display: flex;
   align-items: center;

   svg {
      margin-right: 1rem;
      color: ${({ theme }) => theme.colors.primary};
   }
`;

const FAQCard = styled(Card)`
   margin-bottom: 1rem;
   overflow: hidden;
   border: 1px solid rgba(255, 255, 255, 0.05);
   transition: all 0.3s ease;

   &:hover {
      border-color: rgba(255, 255, 255, 0.1);
   }
`;

const QuestionHeader = styled.div<{ isOpen: boolean }>`
   padding: 1.5rem;
   cursor: pointer;
   display: flex;
   justify-content: space-between;
   align-items: center;
   background: ${({ isOpen, theme }) => (isOpen ? "rgba(106, 17, 203, 0.1)" : "transparent")};
   transition: background-color 0.3s ease;

   &:hover {
      background: rgba(255, 255, 255, 0.05);
   }
`;

const Question = styled.h3`
   font-size: 1.25rem;
   margin: 0;
   padding-right: 2rem;
`;

const ToggleIcon = styled.div`
   color: ${({ theme }) => theme.colors.primary};
   font-size: 1.25rem;
   transition: transform 0.3s ease;
`;

const Answer = styled(motion.div)`
   padding: 0 1.5rem 1.5rem;
   color: ${({ theme }) => theme.colors.textDim};
   line-height: 1.6;

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
`;

const NotFoundMessage = styled.div`
   text-align: center;
   padding: 3rem 0;
   color: ${({ theme }) => theme.colors.textDim};

   h3 {
      font-size: 1.5rem;
      margin-bottom: 1rem;
   }

   p {
      max-width: 500px;
      margin: 0 auto;
   }
`;

const FAQPage: React.FC = () => {
   const [openQuestions, setOpenQuestions] = useState<number[]>([]);
   const [searchQuery, setSearchQuery] = useState("");

   const toggleQuestion = (questionId: number) => {
      setOpenQuestions((prev) => (prev.includes(questionId) ? prev.filter((id) => id !== questionId) : [...prev, questionId]));
   };

   const filterFAQs = () => {
      if (!searchQuery.trim()) return faqCategories;

      return faqCategories
         .map((category) => ({
            ...category,
            questions: category.questions.filter(
               (q) =>
                  q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  q.answer.toLowerCase().includes(searchQuery.toLowerCase()),
            ),
         }))
         .filter((category) => category.questions.length > 0);
   };

   const filteredCategories = filterFAQs();
   const hasResults = filteredCategories.some((category) => category.questions.length > 0);

   return (
      <PageContainer>
         <Container>
            <PageTitle>Frequently Asked Questions</PageTitle>
            <PageSubtitle>
               Find answers to the most common questions about GuessBattle. Can't find what you're looking for? Contact our support team.
            </PageSubtitle>

            <SearchContainer>
               <SearchIcon>
                  <FaSearch />
               </SearchIcon>
               <SearchInput
                  placeholder='Search for answers...'
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  fullWidth
               />
            </SearchContainer>

            {hasResults ? (
               filteredCategories.map(
                  (category) =>
                     category.questions.length > 0 && (
                        <CategorySection key={category.id}>
                           <CategoryTitle>
                              {category.icon} {category.title}
                           </CategoryTitle>

                           {category.questions.map((faq) => (
                              <motion.div
                                 key={faq.id}
                                 initial={{ opacity: 0, y: 20 }}
                                 animate={{ opacity: 1, y: 0 }}
                                 transition={{ duration: 0.3 }}>
                                 <FAQCard>
                                    <QuestionHeader isOpen={openQuestions.includes(faq.id)} onClick={() => toggleQuestion(faq.id)}>
                                       <Question>{faq.question}</Question>
                                       <ToggleIcon>{openQuestions.includes(faq.id) ? <FaChevronUp /> : <FaChevronDown />}</ToggleIcon>
                                    </QuestionHeader>

                                    <AnimatePresence>
                                       {openQuestions.includes(faq.id) && (
                                          <Answer
                                             initial={{ height: 0, opacity: 0 }}
                                             animate={{ height: "auto", opacity: 1 }}
                                             exit={{ height: 0, opacity: 0 }}
                                             transition={{ duration: 0.3 }}>
                                             <p>{faq.answer}</p>
                                          </Answer>
                                       )}
                                    </AnimatePresence>
                                 </FAQCard>
                              </motion.div>
                           ))}
                        </CategorySection>
                     ),
               )
            ) : (
               <NotFoundMessage>
                  <FaQuestionCircle style={{ fontSize: "3rem", color: "rgba(255, 255, 255, 0.1)", marginBottom: "1rem" }} />
                  <h3>No results found</h3>
                  <p>We couldn't find any FAQs matching your search. Try different keywords or contact our support team for assistance.</p>
               </NotFoundMessage>
            )}
         </Container>
      </PageContainer>
   );
};

export default FAQPage;
