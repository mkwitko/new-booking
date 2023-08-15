import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';

// Translation
import { useTranslation } from 'react-i18next';
import { Autocomplete, TextField } from '@mui/material';
import Label from '../text/Label';

export default function AutoCompleteB2B({
  options,
  onChange,
  label,
  value,
  loading = false,
  disabled = false,
  valueTag = '',
}: {
  options: any;
  onChange: any;
  label: any;
  value: any;
  loading?: boolean;
  disabled?: boolean;
  valueTag?: string;
}) {
  // Translation
  const { t } = useTranslation();

  return (
    <>
      <Label title={label} />
      <Autocomplete
        className="uppercase"
        disabled={disabled || loading}
        loading={loading}
        loadingText={t('loading')}
        noOptionsText={t('noOptions')}
        options={options}
        value={value}
        onChange={(event, newValue) => {
          onChange(valueTag ? newValue[valueTag] : newValue);
        }}
        renderInput={(params) => (
          <TextField
            className="uppercase"
            {...params}
            InputProps={{
              ...params.InputProps,
              disableUnderline: true,
              endAdornment: (
                <>
                  {loading ? (
                    <CircularProgress
                      color="inherit"
                      size={20}
                    />
                  ) : null}
                  {params.InputProps.endAdornment}
                </>
              ),
            }}
          />
        )}
      />
    </>
  );
}
