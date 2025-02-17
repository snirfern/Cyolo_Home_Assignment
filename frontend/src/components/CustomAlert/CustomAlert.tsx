import { Alert } from '@mui/material';
import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useAppContext } from '../../context';

const AlertStyle = {
  position: 'fixed',
  bottom: 20,
  left: '50%',
  transform: 'translateX(-50%)',
  width: 500,
};
export const CustomAlert = observer(() => {
  const { uiStore } = useAppContext();

  useEffect(() => {
    const timer = setTimeout(() => {
      uiStore.resetAlert();
    }, 3000);

    return () => clearTimeout(timer);
  }, [uiStore]);

  return (
    <Alert
      data-cy="custom_alert"
      sx={AlertStyle}
      severity={uiStore.alert!.severity}
    >
      {uiStore.alert!.message}
    </Alert>
  );
});
