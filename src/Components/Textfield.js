import React, { useEffect, useRef } from 'react';
import Loading from './Loading';

const Textfield = ({ handleUpdateText, textValue, handleCall, response }) => {
	const handleSubmit = (e) => {
		if (e.keyCode === 13) {
			handleCall();
		}
	};

	function useOutsideAlerter(ref) {
		useEffect(() => {
			const handleClickOutside = (event) => {
				if (ref.current && !ref.current.contains(event.target)) {
					handleCall();
				}
			};

			// Bind the event listener
			document.addEventListener('mousedown', handleClickOutside);
			return () => {
				// Unbind the event listener on clean up
				document.removeEventListener('mousedown', handleClickOutside);
			};
		}, [ref]);
	}

	const wrapperRef = useRef(null);
	useOutsideAlerter(wrapperRef);
	return (
		<div className='textfield-wrapper'>
			<div>
				<div
					onChange={handleUpdateText}
					contentEditable
					ref={wrapperRef}
					className='editable-section'
					onKeyDown={(e) => {
						handleSubmit(e);
					}}>
					<p>{!response.isError && textValue.newVal}</p>{' '}
					{response.isLoading ? (
						<Loading />
					) : (
						response.createdImg && (
							<img
								className='response-img'
								src={response.createdImg}
								alt='status'
							/>
						)
					)}
				</div>
				{response.isError && (
					<div>
						<p className='error-msg'>{response.errorMsg}</p>
					</div>
				)}
			</div>
		</div>
	);
};

export default Textfield;
