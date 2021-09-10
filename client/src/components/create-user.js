import React from 'react';
import CustomTextField from './custom-textfield';

function CreateUser({ form, handleChange }) {
	return (
		<div>
			<CustomTextField label='Name' name='name' value={form.name} onChange={handleChange} />
			<CustomTextField
				label='Location'
				name='location'
				value={form.location}
				onChange={handleChange}
			/>
			<CustomTextField label='Units' name='units' value={form.units} onChange={handleChange} />
			<CustomTextField
				label='Date'
				type='datetime-local'
				name='date'
				value={form.date}
				onChange={handleChange}
			/>
			<CustomTextField label='Type' name='type' value={form.type} onChange={handleChange} />
			<CustomTextField
				label='Points'
				type='number'
				name='points'
				value={form.points}
				onChange={handleChange}
			/>
		</div>
	);
}

export default CreateUser;
