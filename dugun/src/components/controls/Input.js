import React from 'react'
import { TextField } from '@material-ui/core';

export default function Input(props) {
    const { name, label, value,isRequired, error=null, onChange, ...other } = props;
    return (
        <TextField
            variant="outlined"
            label={label}
            name={name}
            value={value}
            onChange={onChange}
            required={isRequired}
            {...other}
            {...(error && {error:true,helperText:error})}
        />
    )
}
