import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

interface TwoFactorAuthProps {
   onComplete: (code: string) => void;
   onCancel: () => void;
}

const TwoFactorContainer = styled(motion.div)`
   margin-top: 2rem;
`;

const Title = styled.h3`
   font-size: 1.25rem;
   margin-bottom: 1rem;
   text-align: center;
`;

const Description = styled.p`
   color: ${({ theme }) => theme.colors.textDim};
   margin-bottom: 1.5rem;
   text-align: center;
   font-size: 0.875rem;
`;

const CodeInputContainer = styled.div`
   display: flex;
   justify-content: center;
   gap: 0.5rem;
   margin-bottom: 1.5rem;
`;

const CodeInput = styled.input`
   width: 3rem;
   height: 3.5rem;
   text-align: center;
   font-size: 1.5rem;
   font-weight: 700;
   background: rgba(255, 255, 255, 0.05);
   border: 1px solid rgba(255, 255, 255, 0.1);
   border-radius: ${({ theme }) => theme.borderRadius};
   color: ${({ theme }) => theme.colors.textLight};

   &:focus {
      outline: none;
      border-color: ${({ theme }) => theme.colors.primary};
      box-shadow: 0 0 0 2px rgba(106, 17, 203, 0.2);
   }
`;

const ButtonContainer = styled.div`
   display: flex;
   justify-content: space-between;
   gap: 1rem;
`;

const ResendText = styled.p`
   text-align: center;
   margin-top: 1rem;
   font-size: 0.875rem;
   color: ${({ theme }) => theme.colors.textDim};
`;

const ResendLink = styled.button`
   background: none;
   border: none;
   color: ${({ theme }) => theme.colors.primary};
   cursor: pointer;
   font-size: 0.875rem;
   text-decoration: underline;

   &:hover {
      color: ${({ theme }) => theme.colors.secondary};
   }
`;

const TwoFactorAuth: React.FC<TwoFactorAuthProps> = ({ onComplete, onCancel }) => {
   const [code, setCode] = useState(["", "", "", "", "", ""]);
   const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
   const [countdown, setCountdown] = useState(30);

   useEffect(() => {
      // Focus the first input on mount
      if (inputRefs.current[0]) {
         inputRefs.current[0].focus();
      }

      // Start countdown for resend
      const timer = setInterval(() => {
         setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);

      return () => clearInterval(timer);
   }, []);

   // Input handlers
   const handleInputChange = (index: number, value: string) => {
      // Only allow numbers
      if (value && !/^\d+$/.test(value)) return;

      // Update the code array
      setCode((prevCode) => {
         const newCode = [...prevCode];
         newCode[index] = value;

         // Move to next input if value is entered
         if (value && index < 5 && inputRefs.current[index + 1]) {
            inputRefs.current[index + 1].focus();
         }

         return newCode;
      });
   };

   const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
      // Move to previous input on backspace if current input is empty
      if (e.key === "Backspace" && !code[index] && index > 0 && inputRefs.current[index - 1]) {
         inputRefs.current[index - 1].focus();
      }
   };

   const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
      e.preventDefault();
      const pastedData = e.clipboardData.getData("text");

      // Only process if it looks like a verification code
      if (/^\d+$/.test(pastedData) && pastedData.length >= 6) {
         const newCode = Array(6).fill("");

         // Fill in the code inputs
         for (let i = 0; i < Math.min(6, pastedData.length); i++) {
            newCode[i] = pastedData[i];
         }

         setCode(newCode);

         // Focus the last filled input
         const lastIndex = Math.min(5, pastedData.length - 1);
         if (inputRefs.current[lastIndex]) {
            inputRefs.current[lastIndex].focus();
         }
      }
   };

   const handleSubmit = () => {
      const fullCode = code.join("");
      if (fullCode.length === 6) {
         onComplete(fullCode);
      }
   };

   const handleResend = () => {
      // Reset the code
      setCode(["", "", "", "", "", ""]);

      // Reset countdown
      setCountdown(30);

      // Focus the first input
      if (inputRefs.current[0]) {
         inputRefs.current[0].focus();
      }

      // In a real app, this would trigger a new code to be sent
      console.log("Resending verification code...");
   };

   return (
      <TwoFactorContainer
         initial={{ opacity: 0, y: 20 }}
         animate={{ opacity: 1, y: 0 }}
         exit={{ opacity: 0, y: -20 }}
         transition={{ duration: 0.3 }}>
         <Title>Two-Factor Authentication</Title>
         <Description>We've sent a 6-digit verification code to your email. Enter the code below to verify your identity.</Description>

         <CodeInputContainer>
            {code.map((digit, index) => (
               <CodeInput
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type='text'
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleInputChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={index === 0 ? handlePaste : undefined}
                  autoComplete='off'
               />
            ))}
         </CodeInputContainer>

         <ButtonContainer>
            <motion.button
               whileHover={{ scale: 1.05 }}
               whileTap={{ scale: 0.95 }}
               style={{
                  flex: 1,
                  padding: "0.75rem",
                  background: "transparent",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  borderRadius: "8px",
                  color: "white",
                  cursor: "pointer",
               }}
               onClick={onCancel}>
               Cancel
            </motion.button>

            <motion.button
               whileHover={{ scale: 1.05 }}
               whileTap={{ scale: 0.95 }}
               style={{
                  flex: 1,
                  padding: "0.75rem",
                  background: "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)",
                  border: "none",
                  borderRadius: "8px",
                  color: "white",
                  cursor: "pointer",
                  fontWeight: 600,
               }}
               onClick={handleSubmit}
               disabled={code.some((digit) => !digit)}>
               Verify
            </motion.button>
         </ButtonContainer>

         <ResendText>
            Didn't receive the code?{" "}
            {countdown > 0 ? `Resend in ${countdown}s` : <ResendLink onClick={handleResend}>Resend Code</ResendLink>}
         </ResendText>
      </TwoFactorContainer>
   );
};

export default TwoFactorAuth;
