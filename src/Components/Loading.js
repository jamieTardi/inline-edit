import React from 'react';
import loadingImg from '../Images/loading.svg';

const Loading = () => {
	return (
		<div>
			<img src={loadingImg} alt='load spinner' />
		</div>
	);
};

export default Loading;
