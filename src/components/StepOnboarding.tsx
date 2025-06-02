import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface StepOnboardingProps {
  onClose: () => void;
}

const steps = [
  {
    title: 'Welcome to HomeChef 🍽️',
    description: 'Discover authentic Cameroonian meals right from your kitchen.',
  },
  {
    title: 'Learn Your Way 🎓',
    description: 'Choose between written or video recipes tailored to your learning style.',
  },
  {
    title: 'Get Smart Suggestions 💡',
    description: 'Use the cooking assistant to estimate cost and time based on your needs.',
  },
  {
    title: 'Ready to Cook? 👨‍🍳',
    description: 'Let’s begin your culinary journey. Click "Get Started" to continue.',
  },
];

const StepOnboarding: React.FC<StepOnboardingProps> = ({ onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onClose();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50"
    >
      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.8 }}
        className="bg-white rounded-2xl p-8 shadow-xl max-w-md w-full text-center"
      >
        <h2 className="text-2xl font-bold mb-2">{steps[currentStep].title}</h2>
        <p className="text-gray-700 mb-6">{steps[currentStep].description}</p>

        <button
          onClick={nextStep}
          className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
        >
          {currentStep === steps.length - 1 ? 'Get Started' : 'Next'}
        </button>
      </motion.div>
    </motion.div>
  );
};

export default StepOnboarding;
