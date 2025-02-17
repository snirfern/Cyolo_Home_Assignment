import React, { ReactNode, useEffect, useState } from 'react';
import { InputAdornment, styled, TextField } from '@mui/material';
import CustomButton from '../CustomButton/CustomButton';
import DragAndDrop from '../DragAndDrop/DragAndDrop';

interface Field {
  fieldName: string;
  title: string;
  validate: (input: any) => boolean;
  type: string;
  value?: string | number;
  startAdornment?: ReactNode;
  rows?: number;
  placeholder?: string;
}

interface IFormField {
  fields: Field[];
  handleCancel?: () => void;
  handleSubmit: (item: { [key: string]: string | number }) => void;
  loading?: boolean;
  approveButtonText?: string;
}

const FormContainer = styled('div')({
  width: '100%',
  height: '100%',
  maxHeight: '600px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
});

const FormFieldStyle = styled('div')({
  margin: 25,
  display: 'flex',
  justifyContent: 'center',
});

const FormFooter = styled('div')({
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
});

const Form = ({
  fields,
  approveButtonText,
  handleSubmit,
  loading = false,
}: IFormField) => {
  const [formData, setFormData] = useState<
    { value: any; hasError: boolean; didChange: boolean }[]
  >([]);

  useEffect(() => {
    setFormData(
      fields.map((cF) => ({
        value: cF?.value ?? '',
        hasError: false,
        didChange: false,
      }))
    );
  }, [fields]);

  const handleChange = (newValue: any, index: number) => {
    setFormData((prevState) => {
      const newState = [...prevState];
      newState[index] = {
        value: newValue,
        hasError: !fields[index].validate(newValue),
        didChange: fields[index].value !== newValue,
      };
      return newState;
    });
  };

  const submitHandler = () => {
    const data = formData.reduce<{ [key: string]: number | string }>(
      (acc, item, index) => {
        if (fields[index].value !== item.value) {
          acc[fields[index].fieldName] = item.value;
        }
        return acc;
      },
      {}
    );

    handleSubmit(data);
  };

  const isFormValid =
    formData.every((cField) => !cField.hasError && cField.value !== '') &&
    formData.some((cField) => cField.didChange);

  return (
    <FormContainer>
      {formData.length > 0 &&
        fields.map((field, index) => (
          <FormFieldStyle key={`form_field_${index}`}>
            {field.type !== 'dragAndDrop' && (
              <TextField
                data-cy={`form_field_input_${field.fieldName}`}
                error={formData[index].hasError}
                multiline={!!field.rows}
                rows={field.rows}
                label={field.title}
                name={`${field.fieldName}_${index}`}
                value={formData[index].value}
                InputLabelProps={{
                  shrink: true,
                }}
                type={field.type}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleChange(e.target.value, index)
                }
                variant="outlined"
                placeholder={field?.placeholder ?? ''}
                slotProps={
                  field.startAdornment
                    ? {
                        input: {
                          startAdornment: (
                            <InputAdornment position="start">
                              {field.startAdornment}
                            </InputAdornment>
                          ),
                        },
                      }
                    : {}
                }
                style={{ width: 400 }}
              />
            )}
            {field.type === 'dragAndDrop' && (
              <DragAndDrop
                selectedFile={formData[index].value.name}
                onFileUploadHandler={(file: File) => handleChange(file, index)}
              />
            )}
          </FormFieldStyle>
        ))}

      <FormFooter data-testid="form_footer">
        <CustomButton
          style={{ margin: 20 }}
          loading={loading}
          variant="outlined"
          onClick={submitHandler}
          text={approveButtonText ?? 'Submit'}
          disabled={!isFormValid}
          data-cy="FormSubmitButton"
        />
      </FormFooter>
    </FormContainer>
  );
};

export default Form;
