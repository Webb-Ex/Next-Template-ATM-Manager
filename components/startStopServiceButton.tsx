import React, { useState } from 'react';
import { Button } from './ui/button';
import { CircleStop, Play } from 'lucide-react';

type StartStopServiceButtonProps = {
  serviceType: 'atmService' | 'transactionService'; // Define the service types
};

const StartStopServiceButton: React.FC<StartStopServiceButtonProps> = ({ serviceType }) => {
  const [started, setStarted] = useState(false);

  const handleStartService = async () => {
    try {
      const response = await fetch(`/api/${serviceType}`, {
        method: 'POST',
      });

      if (!response.ok) {
        throw new Error('Failed to start the service.');
      }

      console.log('Service started.');
      setStarted(true); // Update state only on success
    } catch (error) {
      console.error((error as Error).message);
    }
  };

  const handleStopService = async () => {
    try {
      const response = await fetch(`/api/${serviceType}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to stop the service.');
      }

      console.log('Service stopped.');
      setStarted(false); // Update state only on success
    } catch (error) {
      console.error((error as Error).message);
    }
  };

  const handleOnClick = () => {
    if (started) {
      handleStopService();
    } else {
      handleStartService();
    }
  };

  return (
    <Button variant="outline" onClick={handleOnClick}>
      {started ? (
        <>
          <CircleStop className="h-4 w-4 text-red-700" /> <span className='text-slate-800 font-bold'>Stop Service</span>
        </>
      ) : (
        <>
          <Play className="h-4 w-4 text-green-700" /> <span className='text-slate-800 font-bold'>Start Service</span>
        </>
      )}
    </Button>
  );
};

export default StartStopServiceButton;
