import React from 'react';
import { Button, styled } from '@mui/material';

import { ButtonProps as MUIButtonProps } from '@mui/material/Button';
import CustomSpinner from '../CustomSpinner/CustomSpinner';

interface CustomButtonProps extends MUIButtonProps {
  text: string;
  variant: 'text' | 'outlined' | 'contained';
  style?: React.CSSProperties;
  color?:
    | 'inherit'
    | 'primary'
    | 'secondary'
    | 'success'
    | 'error'
    | 'info'
    | 'warning';
  disabled?: boolean;
  loading?: boolean;
}

const StyledButton = styled(Button)({
  minWidth: 100,
  maxWidth: 100,
  minHeight: 40,
  maxHeight: 40,
  alignItems: 'center',
  justifyContent: 'center',
  textTransform: 'none',
});
const CustomButton = ({
  text,
  color,
  variant,
  style,
  disabled = false,
  loading = false,
  ...muiProps
}: CustomButtonProps) => {
  return (
    <StyledButton
      data-cy={`custom_button_${text}`}
      data-testid={`custom_button_${text}`}
      color={color}
      variant={variant}
      style={style ? style : {}}
      disabled={loading || disabled}
      {...muiProps}
    >
      {!loading && text}
      {loading && <CustomSpinner size={'1rem'} />}
    </StyledButton>
  );
};

export default CustomButton;
