
'use client';

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

interface StepperProps {
  steps: string[];
  currentTransactions?: Transaction[];
  currentStep: number;
  onStepChange: (step: number) => void;
  finalStep?: string;
}

const Stepper = ({ steps, currentStep, onStepChange } : StepperProps) => {
  const totalSteps = steps.length + 1;

  return (
    <div className="stepper">
      <Tabs value={`step-${currentStep}`} className="w-full">
        <TabsList className="flex justify-between">
          {steps.map((step, index) => (
            <TabsTrigger
              key={index}
              value={`step-${index + 1}`}
              disabled={currentStep < index + 1}
              onClick={() => onStepChange(index + 1)}
            >
              {step}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </div>
  );
};

export default Stepper;