import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { FaUsers, FaCoins, FaHistory, FaComments, FaSmile } from "react-icons/fa";
import Container from "../components/Container";
import Card from "../components/Card";
import Button from "../components/Button";
import Flex from "../components/Flex";
import Grid from "../components/Grid";
import NumberGrid from "../components/NumberGrid";
import Timer from "../components/Timer";
import PlayerAvatar from "../components/PlayerAvatar";
import BettingOptions from "../components/BettingOptions";
import ResultAnimation from "../components/ResultAnimation";
import ChatEmojis from "../components/ChatEmojis";

// Mock data for players
const mockPlayers = [
   { id: 1, name: "John Doe", avatar: "", selectedNumber: 42 },
   { id: 2, name: "Jane Smith", avatar: "", selectedNumber: 17 },
   { id: 3, name: "Robert Johnson", avatar: "", selectedNumber: 88 },
   { id: 4, name: "Emily Davis", avatar: "", selectedNumber: 23 },
   { id: 5, name: "Michael Wilson", avatar: "", selectedNumber: 55 },
];

const GameContainer = styled.div`
   padding: 2rem 0;
`;

const GameHeader = styled.div`
   display: flex;
   justify-content: space-between;
   align-items: center;
   margin-bottom: 2rem;

   @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
      flex-direction: column;
      align-items: flex-start;
      gap: 1rem;
   }
`;

const GameTitle = styled.h1`
   font-size: 2rem;
   margin: 0;
`;

const GameInfo = styled.div`
   display: flex;
   gap: 1.5rem;

   @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
      flex-wrap: wrap;
      gap: 1rem;
   }
`;

const InfoItem = styled.div`
   display: flex;
   align-items: center;
   gap: 0.5rem;
   color: ${({ theme }) => theme.colors.textDim};

   svg {
      color: ${({ theme }) => theme.colors.primary};
   }
`;

const GameSection = styled(Card)`
   margin-bottom: 2rem;
`;

const SectionTitle = styled.h2`
   font-size: 1.5rem;
   margin-bottom: 1.5rem;
   display: flex;
   align-items: center;

   svg {
      margin-right: 0.75rem;
      color: ${({ theme }) => theme.colors.primary};
   }
`;

const PlayersContainer = styled.div`
   display: flex;
   flex-wrap: wrap;
   justify-content: center;
   gap: 1rem;
   margin-bottom: 2rem;
`;

const ChatContainer = styled.div`
   height: 300px;
   display: flex;
   flex-direction: column;
`;

const ChatMessages = styled.div`
   flex: 1;
   overflow-y: auto;
   background: rgba(0, 0, 0, 0.2);
   border-radius: ${({ theme }) => theme.borderRadius};
   padding: 1rem;
   margin-bottom: 1rem;
`;

const ChatInputContainer = styled.div`
   display: flex;
   gap: 0.5rem;
`;

const Message = styled.div`
   margin-bottom: 1rem;

   &:last-child {
      margin-bottom: 0;
   }
`;

const MessageSender = styled.span`
   font-weight: 600;
   color: ${({ theme }) => theme.colors.primary};
   margin-right: 0.5rem;
`;

const MessageText = styled.span`
   color: ${({ theme }) => theme.colors.textLight};
`;

const MessageTime = styled.span`
   font-size: 0.75rem;
   color: ${({ theme }) => theme.colors.textDim};
   margin-left: 0.5rem;
`;

const EmojiReactions = styled.div`
   display: flex;
   flex-wrap: wrap;
   gap: 0.5rem;
   margin-top: 0.5rem;
`;

const EmojiReaction = styled.div`
   display: inline-flex;
   align-items: center;
   background: rgba(255, 255, 255, 0.1);
   border-radius: 20px;
   padding: 0.25rem 0.5rem;
   font-size: 0.875rem;
   cursor: pointer;
   transition: all 0.2s ease;

   &:hover {
      background: rgba(255, 255, 255, 0.2);
      transform: scale(1.05);
   }
`;

const EmojiCount = styled.span`
   font-size: 0.75rem;
   margin-left: 0.25rem;
   color: ${({ theme }) => theme.colors.textDim};
`;

const BetAmount = styled.div`
   display: flex;
   align-items: center;
   justify-content: center;
   margin: 2rem 0;
`;

const BetInput = styled.input`
   width: 100px;
   text-align: center;
   padding: 0.75rem;
   font-size: 1.25rem;
   font-weight: 700;
   background: rgba(255, 255, 255, 0.05);
   border: 2px solid ${({ theme }) => theme.colors.primary};
   border-radius: ${({ theme }) => theme.borderRadius};
   color: ${({ theme }) => theme.colors.textLight};
   margin: 0 1rem;

   &:focus {
      outline: none;
      box-shadow: ${({ theme }) => theme.shadows.neonGlow};
   }
`;

const BetControls = styled.div`
   display: flex;
   justify-content: center;
   gap: 1rem;
   margin-top: 2rem;
`;

const GamePage: React.FC = () => {
   const [selectedNumber, setSelectedNumber] = useState<number | null>(null);
   const [selectedOption, setSelectedOption] = useState<string | null>(null);
   const [betAmount, setBetAmount] = useState(10);
   const [gamePhase, setGamePhase] = useState<"betting" | "waiting" | "result">("betting");
   const [winningNumber, setWinningNumber] = useState<number | null>(null);
   const [showResult, setShowResult] = useState(false);
   const [activePlayer, setActivePlayer] = useState(1); // Current player's ID
   const [showEmojis, setShowEmojis] = useState(false);

   // Handle number selection
   const handleSelectNumber = (number: number) => {
      if (gamePhase === "betting") {
         setSelectedNumber(number);
      }
   };

   // Handle betting option selection
   const handleSelectOption = (optionId: string) => {
      if (gamePhase === "betting") {
         setSelectedOption(optionId);
      }
   };

   // Handle bet amount change
   const handleBetAmountChange = (amount: number) => {
      if (amount >= 1) {
         setBetAmount(amount);
      }
   };

   // Handle place bet
   const handlePlaceBet = () => {
      if (selectedNumber !== null || selectedOption !== null) {
         setGamePhase("waiting");
         // In a real app, this would send the bet to the server
      }
   };

   // Handle timer complete
   const handleTimerComplete = () => {
      if (gamePhase === "waiting") {
         // Generate a random winning number
         const randomNumber = Math.floor(Math.random() * 100);
         setWinningNumber(randomNumber);
         setShowResult(true);
         setGamePhase("result");
      }
   };

   // Handle result animation complete
   const handleResultAnimationComplete = () => {
      setShowResult(false);
      // In a real app, we would check if the player won and update their balance
   };

   // Handle new round
   const handleNewRound = () => {
      setSelectedNumber(null);
      setSelectedOption(null);
      setWinningNumber(null);
      setGamePhase("betting");
   };

   // Handle emoji selection
   const handleEmojiSelect = (emoji: string) => {
      console.log(`Selected emoji: ${emoji}`);
      // In a real app, this would send the emoji reaction to the server
      // and update the message reactions

      // Hide emoji picker after selection
      setShowEmojis(false);
   };

   return (
      <GameContainer>
         <Container>
            <GameHeader>
               <GameTitle>Table #1234</GameTitle>
               <GameInfo>
                  <InfoItem>
                     <FaUsers /> 5/10 Players
                  </InfoItem>
                  <InfoItem>
                     <FaCoins /> Min Bet: $5
                  </InfoItem>
                  <InfoItem>
                     <FaHistory /> Round: 3/10
                  </InfoItem>
               </GameInfo>
            </GameHeader>

            <Grid columns='1fr 300px' gap='2rem' style={{ marginBottom: "2rem" }}>
               <GameSection>
                  <SectionTitle>
                     <FaUsers /> Players
                  </SectionTitle>
                  <PlayersContainer>
                     {mockPlayers.map((player) => (
                        <PlayerAvatar
                           key={player.id}
                           name={player.name}
                           avatar={player.avatar}
                           isActive={player.id === activePlayer}
                           isWinner={gamePhase === "result" && player.selectedNumber === winningNumber}
                           selectedNumber={gamePhase !== "betting" ? player.selectedNumber : null}
                        />
                     ))}
                  </PlayersContainer>

                  <Timer duration={30} onComplete={handleTimerComplete} isActive={gamePhase === "waiting"} />

                  <NumberGrid
                     onSelectNumber={handleSelectNumber}
                     selectedNumber={selectedNumber}
                     winningNumber={winningNumber}
                     disabled={gamePhase !== "betting"}
                  />

                  {gamePhase === "betting" && (
                     <>
                        <BetAmount>
                           <Button size='small' onClick={() => handleBetAmountChange(betAmount - 5)} disabled={betAmount <= 5}>
                              -
                           </Button>
                           <BetInput
                              type='number'
                              value={betAmount}
                              onChange={(e) => handleBetAmountChange(parseInt(e.target.value) || 0)}
                              min='1'
                           />
                           <Button size='small' onClick={() => handleBetAmountChange(betAmount + 5)}>
                              +
                           </Button>
                        </BetAmount>

                        <BetControls>
                           <Button
                              variant='outline'
                              onClick={() => {
                                 setSelectedNumber(null);
                                 setSelectedOption(null);
                              }}>
                              Clear
                           </Button>
                           <Button onClick={handlePlaceBet} disabled={selectedNumber === null && selectedOption === null}>
                              Place Bet
                           </Button>
                        </BetControls>
                     </>
                  )}

                  {gamePhase === "waiting" && (
                     <div style={{ textAlign: "center", marginTop: "2rem" }}>
                        <h3>Waiting for results...</h3>
                        <p>Your bet: {selectedNumber !== null ? `Number ${selectedNumber.toString().padStart(2, "0")}` : selectedOption}</p>
                     </div>
                  )}

                  {gamePhase === "result" && (
                     <div style={{ textAlign: "center", marginTop: "2rem" }}>
                        <h3>
                           {selectedNumber === winningNumber ||
                           (selectedOption === "above50" && winningNumber! >= 50) ||
                           (selectedOption === "below50" && winningNumber! < 50) ||
                           (selectedOption === "even" && winningNumber! % 2 === 0) ||
                           (selectedOption === "odd" && winningNumber! % 2 !== 0) ||
                           (selectedOption === "close" && Math.abs((selectedNumber || 0) - winningNumber!) <= 5)
                              ? "You Won!"
                              : "Better luck next time!"}
                        </h3>
                        <p>Winning number: {winningNumber?.toString().padStart(2, "0")}</p>
                        <Button onClick={handleNewRound} style={{ marginTop: "1rem" }}>
                           New Round
                        </Button>
                     </div>
                  )}
               </GameSection>

               <div>
                  <GameSection>
                     <SectionTitle>
                        <FaCoins /> Betting Options
                     </SectionTitle>
                     <BettingOptions
                        onSelectOption={handleSelectOption}
                        selectedOption={selectedOption}
                        disabled={gamePhase !== "betting"}
                     />
                  </GameSection>

                  <GameSection>
                     <SectionTitle>
                        <FaComments /> Chat
                     </SectionTitle>
                     <ChatContainer>
                        <ChatMessages>
                           <Message>
                              <MessageSender>John:</MessageSender>
                              <MessageText>Good luck everyone!</MessageText>
                              <MessageTime>2:34 PM</MessageTime>
                              <EmojiReactions>
                                 <EmojiReaction>
                                    👍 <EmojiCount>3</EmojiCount>
                                 </EmojiReaction>
                                 <EmojiReaction>
                                    🍀 <EmojiCount>2</EmojiCount>
                                 </EmojiReaction>
                              </EmojiReactions>
                           </Message>
                           <Message>
                              <MessageSender>Jane:</MessageSender>
                              <MessageText>I'm feeling lucky today!</MessageText>
                              <MessageTime>2:35 PM</MessageTime>
                              <EmojiReactions>
                                 <EmojiReaction>
                                    🎲 <EmojiCount>1</EmojiCount>
                                 </EmojiReaction>
                              </EmojiReactions>
                           </Message>
                           <Message>
                              <MessageSender>Robert:</MessageSender>
                              <MessageText>Let's go for the big win!</MessageText>
                              <MessageTime>2:36 PM</MessageTime>
                              <EmojiReactions>
                                 <EmojiReaction>
                                    🤑 <EmojiCount>4</EmojiCount>
                                 </EmojiReaction>
                                 <EmojiReaction>
                                    💰 <EmojiCount>2</EmojiCount>
                                 </EmojiReaction>
                              </EmojiReactions>
                           </Message>
                        </ChatMessages>

                        <Flex align='center' style={{ marginBottom: "0.5rem" }}>
                           <Button
                              variant='outline'
                              size='small'
                              style={{ marginRight: "0.5rem" }}
                              onClick={() => setShowEmojis(!showEmojis)}>
                              <FaSmile style={{ marginRight: "0.25rem" }} /> Emojis
                           </Button>
                           {showEmojis && (
                              <motion.div
                                 initial={{ opacity: 0, y: 10 }}
                                 animate={{ opacity: 1, y: 0 }}
                                 exit={{ opacity: 0 }}
                                 style={{
                                    position: "absolute",
                                    bottom: "100px",
                                    background: "rgba(0,0,0,0.8)",
                                    padding: "0.5rem",
                                    borderRadius: "8px",
                                    zIndex: 100,
                                 }}>
                                 <ChatEmojis onSelectEmoji={handleEmojiSelect} />
                              </motion.div>
                           )}
                        </Flex>

                        <ChatInputContainer>
                           <Input type='text' placeholder='Type your message...' fullWidth />
                           <Button variant='primary' size='small'>
                              Send
                           </Button>
                        </ChatInputContainer>
                     </ChatContainer>
                  </GameSection>
               </div>
            </Grid>
         </Container>

         <ResultAnimation winningNumber={winningNumber} isVisible={showResult} onAnimationComplete={handleResultAnimationComplete} />
      </GameContainer>
   );
};

// Add missing Input component for the chat
const Input = styled.input`
   background-color: rgba(255, 255, 255, 0.05);
   border: 1px solid rgba(255, 255, 255, 0.1);
   border-radius: ${({ theme }) => theme.borderRadius};
   color: ${({ theme }) => theme.colors.textLight};
   font-size: 1rem;
   padding: 0.75rem 1rem;
   transition: all ${({ theme }) => theme.transitions.default};
   width: ${({ fullWidth }: { fullWidth?: boolean }) => (fullWidth ? "100%" : "auto")};

   &:focus {
      outline: none;
      border-color: ${({ theme }) => theme.colors.primary};
      box-shadow: 0 0 0 2px rgba(106, 17, 203, 0.2);
   }

   &::placeholder {
      color: ${({ theme }) => theme.colors.textDim};
   }
`;

export default GamePage;
