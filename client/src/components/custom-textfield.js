import React from 'react';
import TextField from '@material-ui/core/TextField';

function CustomTextField({ error, label, name, value, onChange, type = 'text' }) {
	return (
		<>
			<TextField
				fullWidth
				margin='normal'
				type={type}
				error={!!error}
				label={label}
				helperText={error}
				variant='filled'
				name={name}
				value={value}
				onChange={onChange}
				InputLabelProps={type === 'datetime-local' ? { shrink: true } : {}}
			/>
		</>
	);
}

export default CustomTextField;
