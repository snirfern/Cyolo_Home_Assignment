import CircularProgress from '@mui/material/CircularProgress';
import React from 'react';

interface SpinnerProps {
  color?:
    | 'inherit'
    | 'primary'
    | 'secondary'
    | 'error'
    | 'info'
    | 'success'
    | 'warning';
  size?: number | string;
  location?: 'middle_screen';
}

const styles: Record<string, React.CSSProperties> = {
  middle_screen: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
};

const CustomSpinner = ({
  color = 'primary',
  size = '3rem',
  location,
}: SpinnerProps) => {
  return (
    <div
      data-testid="custom_spinner"
      style={
        location ? styles[location] : { display: 'flex', alignItems: 'center' }
      }
    >
      <CircularProgress color={color} size={size} />
    </div>
  );
};

export default CustomSpinner;
