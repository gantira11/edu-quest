import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { Label } from '../ui/label';
import { Input } from '../ui/input';

interface IInputForm extends React.InputHTMLAttributes<HTMLInputElement> {
  name?: string;
  label?: string;
  required?: boolean;
  suffixIcon?: React.ReactNode;
}

const InputForm: React.FC<IInputForm> = ({
  name = '',
  label = '',
  required = false,
  suffixIcon,
  ...rest
}) => {
  const methods = useFormContext();

  return (
    <Controller
      control={methods.control}
      name={name}
      defaultValue=''
      render={({ field, fieldState }) => (
        <div className='flex flex-col gap-2'>
          <div className='flex items-start gap-1'>
            <Label>{label}</Label>
            {required && <Label className='text-sm text-red-600'>*</Label>}
          </div>
          <div>
            <div className='relative'>
              <Input {...field} {...rest} />
              {suffixIcon}
            </div>
            {fieldState.invalid && (
              <small className='text-xs text-red-600'>
                {fieldState.error?.message}
              </small>
            )}
          </div>
        </div>
      )}
    />
  );
};

export default InputForm;
