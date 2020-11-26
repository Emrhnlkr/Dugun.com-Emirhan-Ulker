import React, { useState } from 'react'
import { FormControl, InputLabel, Select as MuiSelect, MenuItem, FormHelperText } from '@material-ui/core';

export default function Select(props) {
    const { name, label, isRequired, error = null, options } = props;
    const [value, setValue] = useState(0);
    function onChange(e){
        console.log(e);
        setValue(e.target.value);
    }
    return (
        <FormControl variant="outlined"
            {...(error && { error: true })}>
            <InputLabel>{label}</InputLabel>
            <MuiSelect
                label={label}
                name={name}
                value={value}
                required={isRequired}
                onChange={onChange}>
                {
                    options.map(
                        item => (<MenuItem key={item.id} value={item.optionValue}>{item.optionText}</MenuItem>)
                    )
                }
            </MuiSelect>
            {error && <FormHelperText>{error}</FormHelperText>}
        </FormControl>
    )
}
