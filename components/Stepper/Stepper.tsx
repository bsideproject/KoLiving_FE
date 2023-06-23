import React from 'react';

interface StepperProps {
  step: number;
  totalStep: number;
}

export default function Stepper({ step, totalStep }: StepperProps) {
  return (
    <p className="text-g6 text-[14px]">
      STEP <b>{step}</b> OF <b>{totalStep}</b>
    </p>
  );
}
