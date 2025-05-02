import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { FaGoogle, FaEnvelope, FaLock, FaUser, FaShieldAlt } from "react-icons/fa";
import Container from "../components/Container";
import Card from "../components/Card";
import Button from "../components/Button";
import Input, { FormGroup, Label, ErrorMessage } from "../components/Input";
import Flex from "../components/Flex";
import TwoFactorAuth from "../components/TwoFactorAuth";

type AuthMode = "login" | "signup" | "forgot";

const AuthContainer = styled.div`
   padding: 5rem 0;
   min-height: calc(100vh - 200px);
   background: linear-gradient(135deg, rgba(10, 10, 10, 0.9) 0%, rgba(18, 18, 18, 0.9) 100%),
      url("/auth-background.jpg") no-repeat center center;
   background-size: cover;
`;

const AuthCard = styled(Card)`
   max-width: 500px;
   margin: 0 auto;
   padding: 2.5rem;
`;

const AuthTitle = styled.h2`
   font-size: 2rem;
   text-align: center;
   margin-bottom: 2rem;
`;

const OrDivider = styled.div`
   display: flex;
   align-items: center;
   margin: 1.5rem 0;

   &::before,
   &::after {
      content: "";
      flex: 1;
      height: 1px;
      background: rgba(255, 255, 255, 0.1);
   }

   span {
      padding: 0 1rem;
      color: ${({ theme }) => theme.colors.textDim};
   }
`;

const SocialButton = styled(Button)`
   margin-bottom: 1rem;
`;

const AuthLink = styled.button`
   background: none;
   border: none;
   color: ${({ theme }) => theme.colors.primary};
   cursor: pointer;
   font-size: 0.875rem;
   text-decoration: underline;
   transition: color 0.3s ease;

   &:hover {
      color: ${({ theme }) => theme.colors.secondary};
   }
`;

const AuthFooter = styled.div`
   text-align: center;
   margin-top: 1.5rem;
   color: ${({ theme }) => theme.colors.textDim};
   font-size: 0.875rem;
`;

const AnimatedBackground = styled.div`
   position: absolute;
   top: 0;
   left: 0;
   right: 0;
   bottom: 0;
   overflow: hidden;
   z-index: -1;
`;

const FloatingNumber = styled(motion.div)`
   position: absolute;
   font-family: ${({ theme }) => theme.fonts.heading};
   font-weight: 700;
   color: ${({ theme }) => theme.colors.primary};
   opacity: 0.1;
   font-size: ${() => `${Math.random() * 3 + 1}rem`};
`;

const PokerChip = styled(motion.div)<{ chipColor: string }>`
   position: absolute;
   width: ${() => `${Math.random() * 40 + 40}px`};
   height: ${() => `${Math.random() * 40 + 40}px`};
   border-radius: 50%;
   background: ${({ theme, chipColor }) =>
      chipColor === "red"
         ? "linear-gradient(135deg, #ff4d4d 0%, #f9cb28 100%)"
         : chipColor === "blue"
         ? "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)"
         : "linear-gradient(135deg, #4caf50 0%, #8bc34a 100%)"};
   border: 2px solid white;
   opacity: 0.2;

   &::before {
      content: "";
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 70%;
      height: 70%;
      border-radius: 50%;
      border: 2px dashed rgba(255, 255, 255, 0.5);
   }
`;

const AuthPage: React.FC = () => {
   const [mode, setMode] = useState<AuthMode>("login");
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [name, setName] = useState("");
   const [errors, setErrors] = useState<Record<string, string>>({});
   const [showTwoFactor, setShowTwoFactor] = useState(false);

   // Define all event handlers
   const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setName(e.target.value);
   };

   const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setEmail(e.target.value);
   };

   const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setPassword(e.target.value);
   };

   // Validation function
   const validateForm = () => {
      const newErrors: Record<string, string> = {};

      if (!email) {
         newErrors.email = "Email is required";
      } else if (!/\S+@\S+\.\S+/.test(email)) {
         newErrors.email = "Email is invalid";
      }

      if (mode !== "forgot") {
         if (!password) {
            newErrors.password = "Password is required";
         } else if (password.length < 6) {
            newErrors.password = "Password must be at least 6 characters";
         }
      }

      if (mode === "signup" && !name) {
         newErrors.name = "Name is required";
      }

      return newErrors;
   };

   // Only validate on submit, not on every keystroke
   const handleValidateOnSubmit = () => {
      const newErrors = validateForm();
      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
   };

   const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();

      if (handleValidateOnSubmit()) {
         // For login and signup, show 2FA
         if (mode === "login" || mode === "signup") {
            setShowTwoFactor(true);
         } else {
            // Handle password reset
            console.log("Password reset requested for:", email);
            // Show success message or redirect
         }
      }
   };

   const handleTwoFactorComplete = (code: string) => {
      console.log("Two-factor code verified:", code);
      // In a real app, this would verify the code with the server
      // and then complete the login/signup process

      // For demo purposes, just hide the 2FA component
      setShowTwoFactor(false);
   };

   const handleTwoFactorCancel = () => {
      setShowTwoFactor(false);
   };

   // Create floating elements for the background
   const renderFloatingElements = () => {
      // Significantly reduce the number of animated elements
      const elements = [];
      const colors = ["red", "blue", "green"];

      // Only render 5 numbers instead of 20
      for (let i = 0; i < 5; i++) {
         const x = Math.random() * 100;
         const y = Math.random() * 100;
         const number = Math.floor(Math.random() * 100);

         elements.push(
            <FloatingNumber
               key={`num-${i}`}
               initial={{ x: `${x}%`, y: `${y}%`, opacity: 0 }}
               animate={{
                  y: [`${y}%`, `${y - 10}%`, `${y}%`],
                  opacity: [0, 0.1, 0],
               }}
               transition={{
                  repeat: Infinity,
                  duration: 10, // Fixed duration instead of random
                  delay: i * 2, // Staggered delay
               }}>
               {number.toString().padStart(2, "0")}
            </FloatingNumber>,
         );
      }

      // Only render 5 chips instead of 15
      for (let i = 0; i < 5; i++) {
         const x = Math.random() * 100;
         const y = Math.random() * 100;
         const color = colors[i % colors.length]; // Deterministic color

         elements.push(
            <PokerChip
               key={`chip-${i}`}
               chipColor={color}
               initial={{
                  x: `${x}%`,
                  y: `${y}%`,
                  rotate: 0,
                  opacity: 0,
               }}
               animate={{
                  rotate: 360,
                  opacity: 0.2,
               }}
               transition={{
                  rotate: {
                     repeat: Infinity,
                     duration: 15, // Fixed longer duration
                     ease: "linear",
                  },
                  opacity: {
                     duration: 1,
                  },
               }}
            />,
         );
      }
      return elements;
   };

   return (
      <AuthContainer>
         <AnimatedBackground>{renderFloatingElements()}</AnimatedBackground>

         <Container>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
               <AuthCard variant='elevated'>
                  <AuthTitle>
                     {mode === "login" && "Welcome Back"}
                     {mode === "signup" && "Create Account"}
                     {mode === "forgot" && "Reset Password"}
                  </AuthTitle>

                  <AnimatePresence mode='wait'>
                     {showTwoFactor ? (
                        <TwoFactorAuth key='two-factor' onComplete={handleTwoFactorComplete} onCancel={handleTwoFactorCancel} />
                     ) : (
                        <motion.div key='auth-form' initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                           <form onSubmit={handleSubmit}>
                              {mode === "signup" && (
                                 <FormGroup>
                                    <Label htmlFor='name'>Full Name</Label>
                                    <Input
                                       id='name'
                                       type='text'
                                       placeholder='Enter your full name'
                                       value={name}
                                       onChange={handleNameChange}
                                       fullWidth
                                       error={!!errors.name}
                                       autoComplete='name'
                                    />
                                    {errors.name && <ErrorMessage>{errors.name}</ErrorMessage>}
                                 </FormGroup>
                              )}

                              <FormGroup>
                                 <Label htmlFor='email'>Email Address</Label>
                                 <Input
                                    id='email'
                                    type='email'
                                    placeholder='Enter your email'
                                    value={email}
                                    onChange={handleEmailChange}
                                    fullWidth
                                    error={!!errors.email}
                                    autoComplete='email'
                                 />
                                 {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
                              </FormGroup>

                              {mode !== "forgot" && (
                                 <FormGroup>
                                    <Label htmlFor='password'>Password</Label>
                                    <Input
                                       id='password'
                                       type='password'
                                       placeholder='Enter your password'
                                       value={password}
                                       onChange={handlePasswordChange}
                                       fullWidth
                                       error={!!errors.password}
                                       autoComplete={mode === "login" ? "current-password" : "new-password"}
                                    />
                                    {errors.password && <ErrorMessage>{errors.password}</ErrorMessage>}
                                 </FormGroup>
                              )}

                              {mode === "login" && (
                                 <Flex justify='flex-end'>
                                    <AuthLink type='button' onClick={() => setMode("forgot")}>
                                       Forgot Password?
                                    </AuthLink>
                                 </Flex>
                              )}

                              <Button type='submit' fullWidth style={{ marginTop: "1.5rem" }}>
                                 {mode === "login" && (
                                    <Flex align='center' justify='center'>
                                       <FaShieldAlt style={{ marginRight: "0.5rem" }} />
                                       Sign In Securely
                                    </Flex>
                                 )}
                                 {mode === "signup" && (
                                    <Flex align='center' justify='center'>
                                       <FaUser style={{ marginRight: "0.5rem" }} />
                                       Create Account
                                    </Flex>
                                 )}
                                 {mode === "forgot" && (
                                    <Flex align='center' justify='center'>
                                       <FaEnvelope style={{ marginRight: "0.5rem" }} />
                                       Reset Password
                                    </Flex>
                                 )}
                              </Button>
                           </form>

                           {mode !== "forgot" && (
                              <>
                                 <OrDivider>
                                    <span>OR</span>
                                 </OrDivider>

                                 <SocialButton variant='outline' fullWidth>
                                    <FaGoogle style={{ marginRight: "0.5rem" }} /> Continue with Google
                                 </SocialButton>
                              </>
                           )}

                           <AuthFooter>
                              {mode === "login" && (
                                 <>
                                    Don't have an account?{" "}
                                    <AuthLink type='button' onClick={() => setMode("signup")}>
                                       Sign Up
                                    </AuthLink>
                                 </>
                              )}

                              {mode === "signup" && (
                                 <>
                                    Already have an account?{" "}
                                    <AuthLink type='button' onClick={() => setMode("login")}>
                                       Sign In
                                    </AuthLink>
                                 </>
                              )}

                              {mode === "forgot" && (
                                 <AuthLink type='button' onClick={() => setMode("login")}>
                                    Back to Sign In
                                 </AuthLink>
                              )}
                           </AuthFooter>
                        </motion.div>
                     )}
                  </AnimatePresence>
               </AuthCard>
            </motion.div>
         </Container>
      </AuthContainer>
   );
};

export default AuthPage;
