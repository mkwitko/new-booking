import React from 'react';
import {
  TextField,
  BaseTextFieldProps,
  FormControl,
  Checkbox,
  FormControlLabel,
  Link,
  Radio,
  RadioGroup,
} from '@mui/material';

import IntlCurrencyInput from 'react-intl-currency-input';
import InputMask from 'react-input-mask';
import { Controller } from 'react-hook-form';
import { intlCurrencyConfig } from './formatNumber';
import './style.css';

interface IRadioValue {
  label: string;
  value: string;
}
interface InputType extends BaseTextFieldProps {
  type?: 'text' | 'email' | 'password' | 'number' | 'money' | 'select' | 'checkbox' | 'radio';
  control?: any;
  name?: string;
  mask?: string;
  label?: any;
  children?: any;
  required?: boolean;
  link?: boolean;
  onLinkPress?: () => void;
  radioValues?: IRadioValue[];
  radioGroupDisplayRow?: boolean;
}

export function Input({
  link,
  onLinkPress,
  type = 'text',
  mask,
  name,
  label,
  control,
  required = false,
  focused = false,
  radioValues,
  children,
  radioGroupDisplayRow = true,
  ...rest
}: InputType) {
  // validate control
  if (!control) {
    throw new Error('Control is required');
  }

  return (
    <Controller
      name={name || 'name'}
      control={control}
      rules={{ required }}
      render={({ field: { onChange, value }, fieldState: { error } }) => {
        if (mask) {
          return (
            // @ts-ignore
            <InputMask
              mask={mask}
              onChange={onChange}
              value={value}
              onFocus={rest.onFocus ? rest.onFocus : {}}
              name={name}
              disabled={rest.disabled}
              className="uppercase"
            >
              {(inputProps: any) => (
                <TextField
                  className="uppercase"
                  {...inputProps}
                  {...rest}
                  helperText={error ? error.message : null}
                  InputProps={{
                    disableUnderline: true,
                  }}
                  size="small"
                  error={!!error}
                  fullWidth
                  label={label}
                />
              )}
            </InputMask>
          );
        }

        if (type === 'money') {
          return (
            <div className="mui-textfield mui-textfield--float-label">
              <IntlCurrencyInput
                currency="BRL"
                config={intlCurrencyConfig() as any}
                onChange={onChange}
                value={rest.value as number}
                defaultValue={rest.value as number}
                max={10 ** 10}
              />
              <label>{label}</label>
            </div>
          );
        }

        if (type === 'checkbox') {
          return (
            <>
              {link ? (
                <FormControlLabel
                  name={name}
                  control={
                    <Checkbox onChange={onChange} checked={value} value={value} sx={error ? { color: '#d33' } : {}} />
                  }
                  label={
                    <Link
                      sx={error ? { color: '#d33' } : {}}
                      onClick={(e) => {
                        e.preventDefault();
                        if (onLinkPress) {
                          onLinkPress();
                        }
                      }}
                    >
                      {label}
                    </Link>
                  }
                />
              ) : (
                <FormControlLabel
                  name={name}
                  sx={error ? { color: '#d33' } : {}}
                  control={
                    <Checkbox onChange={onChange} checked={value} value={value} sx={error ? { color: '#d33' } : {}} />
                  }
                  label={label}
                />
              )}
            </>
          );
        }

        if (type === 'radio') {
          return (
            <FormControl>
              {radioGroupDisplayRow ? (
                <RadioGroup
                  aria-labelledby="demo-controlled-radio-buttons-group"
                  name="controlled-radio-buttons-group"
                  value={value}
                  onChange={(e) => {
                    const newE = { ...e, target: { ...e.target, value: e.target.value.toLocaleUpperCase() } };
                    onChange(newE);
                  }}
                  row
                >
                  {radioValues?.map((prop) => {
                    return (
                      <FormControlLabel
                        key={prop.value}
                        value={prop.value}
                        control={<Radio sx={error ? { color: '#d33' } : {}} />}
                        label={prop.label}
                      />
                    );
                  })}
                </RadioGroup>
              ) : (
                <RadioGroup
                  aria-labelledby="demo-controlled-radio-buttons-group"
                  name="controlled-radio-buttons-group"
                  value={value}
                  onChange={onChange}
                >
                  {radioValues?.map((prop) => {
                    return (
                      <FormControlLabel
                        key={prop.value}
                        value={prop.value}
                        control={<Radio sx={error ? { color: '#d33' } : {}} />}
                        label={prop.label}
                      />
                    );
                  })}
                </RadioGroup>
              )}
            </FormControl>
          );
        }

        if (type === 'select') {
          return (
            <FormControl fullWidth>
              <TextField
                select
                helperText={error ? error.message : null}
                size="small"
                error={!!error}
                onChange={onChange}
                value={value}
                fullWidth
                label={label}
                variant="standard"
                // InputProps={{ disableUnderline: true }}
                {...rest}
                className="uppercase"
              >
                {children}
              </TextField>
            </FormControl>
          );
        }

        if (type === 'number') {
          return (
            <TextField
              helperText={error ? error.message : null}
              size="small"
              error={!!error}
              type="number"
              onChange={onChange}
              value={value}
              fullWidth
              label={label}
              name={name}
              inputMode="numeric"
              onKeyDown={(event) => {
                const regex = /^[0-9]+$/;
                const { key } = event;
                if (!regex.test(key)) {
                  event.preventDefault();
                }
              }}
              {...rest}
              className="uppercase"
            />
          );
        }

        return (
          <TextField
            helperText={error ? error.message : null}
            size="small"
            error={!!error}
            type={type}
            onChange={(e) => {
              const newE = { ...e, target: { ...e.target, value: e.target.value.toLocaleUpperCase() } };
              onChange(newE);
            }}
            value={value}
            fullWidth
            label={label}
            name={name}
            {...rest}
            className="uppercase"
            focused={focused}
          />
        );
      }}
    />
  );
}
