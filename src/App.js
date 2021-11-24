import React, { useState } from 'react';
import Textfield from './Components/Textfield';
import checkTick from './Images/checkTick.svg';
import cross from './Images/cross.svg';
import './App.css';

function App() {
	const [textValue, setTextValue] = useState({
		initialVal: 'Hello World',
		newVal: 'Hello World',
	});
	const [response, setResponse] = useState({
		loading: false,
		isError: false,
		createdImg: null,
		errorMsg: 'Oops! Something has gone terribly wrong!',
	});

	const mockPromise = (success, timeout) => {
		setResponse({ ...response, isLoading: true });

		return new Promise((resolve, reject) => {
			setTimeout(() => {
				if (success) {
					resolve();
					setResponse({
						...response,
						loading: false,
						createdImg: checkTick,
						errorMsg: '',
					});
					setTextValue({ ...textValue, initialVal: textValue.newVal });
				} else {
					reject({ message: 'Oops! Something has gone terribly wrong!' });
					setResponse({
						...response,
						loading: false,
						createdImg: cross,
						isError: true,
					});
					setTextValue({ ...textValue, newVal: textValue.initialVal });
				}
			}, timeout);
		});
	};

	const handleCall = async () => {
		try {
			await mockPromise(true, 2000);
			setTimeout(() => {
				setResponse({ ...response, createdImg: '' });
			}, 2000);
		} catch (err) {
			setTimeout(() => {
				setResponse({ ...response, createdImg: '', errorMsg: err.message });
			}, 2000);
		}
	};

	const handleUpdateText = (event) => {
		const html = event.target.innerHTML;
		setTextValue({ ...textValue, newVal: html });
	};
	return (
		<div className='App'>
			<Textfield
				handleUpdateText={handleUpdateText}
				textValue={textValue}
				handleCall={handleCall}
				response={response}
				setResponse={setResponse}
			/>
		</div>
	);
}

export default App;
