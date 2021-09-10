import React from 'react';
import moment from 'moment';

function RenderDate({ date }) {
	return (
		<div className='text-center'>
			<span>{moment(date).format('DD-MM-YYYY')}</span>
			<br />
			<span>{moment(date).format('hh:mm:ss a')}</span>
		</div>
	);
}

export default RenderDate;
