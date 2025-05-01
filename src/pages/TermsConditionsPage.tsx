import React, { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import Container from "../components/Container";
import Card from "../components/Card";

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
   margin-bottom: ${({ isOpen }) => (isOpen ? "1.5rem" : "0")};
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

   ul,
   ol {
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

const TermsConditionsPage: React.FC = () => {
   const [openSections, setOpenSections] = useState<string[]>(["definitions"]);

   const toggleSection = (sectionId: string) => {
      setOpenSections((prev) => (prev.includes(sectionId) ? prev.filter((id) => id !== sectionId) : [...prev, sectionId]));
   };

   const isSectionOpen = (sectionId: string) => openSections.includes(sectionId);

   const sections = [
      {
         id: "definitions",
         title: "1. Definitions",
         content: (
            <>
               <p>
                  In these Terms & Conditions, unless the context otherwise requires, the following expressions shall have the following
                  meanings:
               </p>

               <ul>
                  <li>
                     <strong>"Account"</strong> means the personal account opened by a User on the Platform.
                  </li>
                  <li>
                     <strong>"Content"</strong> means any information, text, graphics, photos, or other materials uploaded, downloaded, or
                     appearing on the Platform.
                  </li>
                  <li>
                     <strong>"GuessBattle"</strong> (also referred to as "we," "us," or "our") means GuessBattle Gaming Inc., a company
                     registered in Canada.
                  </li>
                  <li>
                     <strong>"Game"</strong> means any number guessing game or other game of skill offered on the Platform.
                  </li>
                  <li>
                     <strong>"Platform"</strong> means the GuessBattle website, mobile application, and any other related services.
                  </li>
                  <li>
                     <strong>"Terms"</strong> means these Terms & Conditions, as may be amended from time to time.
                  </li>
                  <li>
                     <strong>"User"</strong> (also referred to as "you" or "your") means any person who accesses or uses the Platform.
                  </li>
                  <li>
                     <strong>"Winnings"</strong> means any prizes or rewards earned by a User through participation in Games.
                  </li>
               </ul>
            </>
         ),
      },
      {
         id: "user-agreement",
         title: "2. User Agreement",
         content: (
            <>
               <h3>2.1 Acceptance of Terms</h3>
               <p>
                  By accessing or using the Platform, you agree to be bound by these Terms and our Privacy Policy. If you do not agree to
                  these Terms, you may not access or use the Platform.
               </p>

               <h3>2.2 Eligibility</h3>
               <p>
                  To use the Platform, you must be at least 18 years old (or 19 years old in provinces where that is the legal age) and a
                  resident of a jurisdiction where online skill-based gaming is legal. By using the Platform, you represent and warrant that
                  you meet these eligibility requirements.
               </p>

               <h3>2.3 Account Registration</h3>
               <p>
                  To participate in Games, you must create an Account. You agree to provide accurate, current, and complete information
                  during the registration process and to update such information to keep it accurate, current, and complete. You are
                  responsible for safeguarding your password and for all activities that occur under your Account.
               </p>

               <h3>2.4 One Account Per Person</h3>
               <p>
                  You may maintain only one Account. Multiple Accounts held by the same individual are subject to immediate termination and
                  forfeiture of any Winnings.
               </p>

               <h3>2.5 Account Verification</h3>
               <p>
                  We may, at any time, require you to verify your identity to continue using the Platform. This may include providing
                  government-issued identification and proof of address. Failure to comply with verification requests may result in
                  suspension or termination of your Account.
               </p>
            </>
         ),
      },
      {
         id: "game-mechanics",
         title: "3. Game Mechanics",
         content: (
            <>
               <h3>3.1 Game Rules</h3>
               <p>
                  Each Game on the Platform has specific rules that are provided before participation. You agree to abide by these rules
                  when participating in any Game.
               </p>

               <h3>3.2 Skill-Based Gaming</h3>
               <p>
                  GuessBattle offers skill-based games where the outcome is determined primarily by the skill and judgment of the player
                  rather than by chance. By participating in Games, you acknowledge that your success depends on your skill and strategy.
               </p>

               <h3>3.3 Random Number Generator</h3>
               <p>
                  Where applicable, Games may utilize a certified Random Number Generator (RNG) to ensure fair play. The RNG has been tested
                  and certified by independent third-party auditors.
               </p>

               <h3>3.4 Game Modifications</h3>
               <p>
                  We reserve the right to modify, suspend, or discontinue any Game or feature of the Platform at any time, with or without
                  notice. We will not be liable to you or any third party for any modification, suspension, or discontinuation of any Game
                  or feature.
               </p>

               <h3>3.5 Technical Issues</h3>
               <p>
                  In the event of a technical issue or malfunction that affects a Game, we reserve the right to cancel the Game and refund
                  all bets placed. We will not be liable for any potential winnings that might have resulted from the completion of the
                  Game.
               </p>
            </>
         ),
      },
      {
         id: "withdrawal-refund",
         title: "4. Withdrawal/Refund Policy",
         content: (
            <>
               <h3>4.1 Deposits</h3>
               <p>
                  All deposits made to your Account are final and non-refundable, except as required by law or as otherwise provided in
                  these Terms.
               </p>

               <h3>4.2 Withdrawals</h3>
               <p>
                  You may withdraw available funds from your Account at any time, subject to our verification procedures. Withdrawals will
                  be processed using the same payment method used for deposits when possible. We may require additional verification before
                  processing withdrawals.
               </p>

               <h3>4.3 Processing Time</h3>
               <p>
                  Withdrawal requests are typically processed within 1-3 business days. However, depending on your payment method, it may
                  take additional time for the funds to appear in your account.
               </p>

               <h3>4.4 Minimum and Maximum Withdrawals</h3>
               <p>
                  We may impose minimum and maximum withdrawal amounts. These limits will be clearly displayed in the withdrawal section of
                  your Account.
               </p>

               <h3>4.5 Withdrawal Fees</h3>
               <p>
                  We do not charge fees for withdrawals, but your payment provider may impose fees. You are responsible for any fees charged
                  by your payment provider.
               </p>

               <h3>4.6 Right to Refuse</h3>
               <p>
                  We reserve the right to refuse a withdrawal request if we suspect fraudulent activity, if you have violated these Terms,
                  or if there are outstanding verification requirements.
               </p>
            </>
         ),
      },
      {
         id: "anti-fraud",
         title: "5. Anti-Fraud Measures",
         content: (
            <>
               <h3>5.1 Prohibited Activities</h3>
               <p>The following activities are strictly prohibited:</p>
               <ul>
                  <li>Cheating, exploiting bugs, or using unauthorized third-party software</li>
                  <li>Colluding with other players to gain an unfair advantage</li>
                  <li>Using automated systems, bots, scripts, or other software to play games</li>
                  <li>Deliberately losing games or manipulating outcomes</li>
                  <li>Creating multiple Accounts</li>
                  <li>Providing false or misleading information</li>
                  <li>Engaging in any form of money laundering or other financial crime</li>
                  <li>Any other activity that violates these Terms or applicable laws</li>
               </ul>

               <h3>5.2 Monitoring and Detection</h3>
               <p>
                  We employ advanced monitoring systems to detect fraudulent activity. This includes, but is not limited to, analyzing
                  gameplay patterns, transaction history, and account information.
               </p>

               <h3>5.3 Consequences of Fraud</h3>
               <p>If we determine, in our sole discretion, that you have engaged in fraudulent activity, we may:</p>
               <ul>
                  <li>Suspend or terminate your Account</li>
                  <li>Forfeit your balance and Winnings</li>
                  <li>Block you from creating new Accounts</li>
                  <li>Report you to relevant authorities</li>
                  <li>Take legal action against you</li>
               </ul>

               <h3>5.4 Cooperation with Authorities</h3>
               <p>
                  We cooperate fully with law enforcement and regulatory authorities in the investigation of suspected illegal activities.
                  This may include sharing your personal information with such authorities.
               </p>
            </>
         ),
      },
      {
         id: "dispute-resolution",
         title: "6. Dispute Resolution",
         content: (
            <>
               <h3>6.1 Informal Resolution</h3>
               <p>
                  If you have a dispute with GuessBattle, you agree to first contact us directly and attempt to resolve the dispute
                  informally by sending a written notice to support@guessbattle.com. We will make reasonable efforts to resolve any dispute
                  through informal means.
               </p>

               <h3>6.2 Binding Arbitration</h3>
               <p>
                  If we cannot resolve a dispute informally, you and GuessBattle agree to resolve any dispute through binding arbitration
                  rather than in courts of general jurisdiction. The arbitration shall be conducted by the Canadian Arbitration Association
                  under its Commercial Arbitration Rules.
               </p>

               <h3>6.3 Arbitration Procedure</h3>
               <p>
                  The arbitration will be conducted in Toronto, Ontario, unless you and GuessBattle agree otherwise. The arbitration will be
                  conducted in English. The arbitrator's award shall be final and binding and may be entered as a judgment in any court of
                  competent jurisdiction.
               </p>

               <h3>6.4 Class Action Waiver</h3>
               <p>
                  You and GuessBattle agree that each may bring claims against the other only in your or its individual capacity, and not as
                  a plaintiff or class member in any purported class or representative proceeding.
               </p>

               <h3>6.5 Exceptions</h3>
               <p>
                  Notwithstanding the foregoing, either party may seek injunctive or other equitable relief in any court of competent
                  jurisdiction to protect its intellectual property rights pending the completion of arbitration.
               </p>

               <h3>6.6 Governing Law</h3>
               <p>
                  These Terms and any dispute arising out of or related to these Terms or the Platform shall be governed by and construed in
                  accordance with the laws of the Province of Ontario and the federal laws of Canada applicable therein, without giving
                  effect to any choice or conflict of law provision or rule.
               </p>
            </>
         ),
      },
   ];

   return (
      <PageContainer>
         <Container>
            <PageTitle>Terms & Conditions</PageTitle>
            <PageSubtitle>
               Please read these Terms & Conditions carefully before using GuessBattle. By using our service, you agree to be bound by these
               terms.
            </PageSubtitle>
            <LastUpdated>Last Updated: May 1, 2023</LastUpdated>

            <TermsCard>
               <TableOfContents>
                  <TOCTitle>Table of Contents</TOCTitle>
                  <TOCList>
                     {sections.map((section) => (
                        <li key={section.id}>
                           <a
                              href={`#${section.id}`}
                              onClick={(e) => {
                                 e.preventDefault();
                                 toggleSection(section.id);
                                 document.getElementById(section.id)?.scrollIntoView({ behavior: "smooth" });
                              }}>
                              {section.title}
                           </a>
                        </li>
                     ))}
                  </TOCList>
               </TableOfContents>

               {sections.map((section) => (
                  <TermsSection key={section.id} id={section.id}>
                     <SectionHeader isOpen={isSectionOpen(section.id)} onClick={() => toggleSection(section.id)}>
                        <SectionTitle>{section.title}</SectionTitle>
                        <ToggleIcon>{isSectionOpen(section.id) ? <FaChevronUp /> : <FaChevronDown />}</ToggleIcon>
                     </SectionHeader>

                     {isSectionOpen(section.id) && (
                        <SectionContent
                           initial={{ opacity: 0, height: 0 }}
                           animate={{ opacity: 1, height: "auto" }}
                           exit={{ opacity: 0, height: 0 }}
                           transition={{ duration: 0.3 }}>
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

export default TermsConditionsPage;
