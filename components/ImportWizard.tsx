'use client';

import { useState } from "react";
import ImportTable from './ImportTable';
import { Button } from "@/components/ui/button";
import Stepper from './Stepper';

const DEFAULT_STEPS = [
  { name: 'Select Date',  buttonText: 'Confirm date', selectedColumn: -1, suggestedColumns: []},
  { name: 'Select Amounts', buttonText: 'Confirm amounts', selectedColumn: -1, suggestedColumns: []},
  { name: 'Select Descriptions', buttonText: 'Confirm description', selectedColumn: -1, suggestedColumns: []}, 
  { name: 'Confirm', buttonText: 'Confirm', selectedColumn: -1, suggestedColumns: []}
]

function TransactionImportWizard({ transactions = [] }: any) {
  // TODO: This can be removed once transaction data is implemented
  const currentTransactions = transactions.slice(0, 5)
  // End of TODO
  
  const [steps, setSteps] = useState(DEFAULT_STEPS);
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = steps.length;

  const isCompleted = () => {
    if (currentStep >= totalSteps) {
      return true;
    }

    return steps[currentStep - 1].selectedColumn !== -1;
  };

  const handleStepChange = (step: number) => {
    setCurrentStep(step);
    setSteps(prevSteps =>
      prevSteps.map((value, index) =>
        index >= step ? { ...value, selectedColumn: -1 } : { ...value }
      )
    );
  };

  const handleColumnSelected = (column: number) => {
    setSteps(prevSteps =>
      prevSteps.map((value, index) =>
        index === currentStep - 1 ? { ...value, selectedColumn: column } : value
      )
    );
  };

  const confirmStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
    else if (currentStep >= totalSteps) {
      console.log(`${JSON.stringify(steps)}`)
      alert`Import complete!`
    }
  };


  return (
    <div>
      <Stepper 
        steps={steps.map(step => step.name )}
        currentStep={currentStep} 
        onStepChange={handleStepChange}/>
      
      <ImportTable 
        transactions={currentTransactions} 
        suggestedColumn={currentStep-1} 
        onColumnChange={handleColumnSelected} />

      <div className="flex justify-center mt-4">
        <Button onClick={confirmStep} className="bg-bank-gradient sidebar-link" disabled={!isCompleted()}>
          <p className="sidebar-label !text-white">
        {steps[currentStep - 1].buttonText}
          </p>
        </Button>
      </div>
    </div>
  )
}

export default TransactionImportWizard