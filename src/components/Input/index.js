import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const InputWrapper = styled.div`
	position: relative;
	.input-value {
		background-color: #ffffff;
		// border: 1px solid #e0e0e0;
		border-radius: 4px;
		width: 246px;
		height: 32px;
		margin-bottom: 4.6px;
		user-select: none;
	}
	.error {
		border: 1px solid #f5222d !important;
	}
	input {
		width: 100%;
		height: 100%;
		border: none;
		border-radius: 4px;
		padding: 0px 12px;
		color: #212121;
		font-family: Roboto;
		font-size: 14px;
		font-weight: 400;
		line-height: 22px;
		text-align: left;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;	
		&:focus {
			border: 1px solid #009de6 !important;
			outline: none;
			border-radius: 4px;
		}
		&:disabled {
			background: #dddddd;
			opacity: 0.7;
			cursor: not-allowed;
		}
	}
	/* Chrome, Safari, Edge, Opera */
	input::-webkit-outer-spin-button,
	input::-webkit-inner-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}
	/* Firefox */
	input[type='number'] {
		-moz-appearance: textfield;
	}
	.error-message {
		color: #f5222d;
		font-family: Roboto;
		font-size: 12px;
		font-weight: 400;
		line-height: 22px;
		user-select: none;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		max-width: 256px;
		position: absolute;
	}
`;
export default function Input(props) {
	const {
		insertedValue,
		errorMessage,
		error,
		type,
		disable,
		inputData,
		styleInputField,
		className,
		placeholder,
		maxLength,
		theme,
		insertedData = () => console.log(''),
		...rest
	} = props;
	return (
		<InputWrapper>
			<div className={`input-value ${styleInputField}`}>
				<input
					className={`${className} ${error ? 'error' : ''}`}
					disabled={disable}
					placeholder={placeholder}
					type={type}
					style={{ border: `1px solid ${theme}` }}
					onChange={input => insertedData(input)}
					value={insertedValue}

					{...rest}
					maxLength={maxLength}
				/>
			</div>
			{error && (
				<div className='error-message' title={`${errorMessage} ${inputData.label.toLowerCase()}`}>
					{errorMessage}
				</div>
			)}
		</InputWrapper>
	);
}

Input.defaultProps = {
	theme: '#E0E0E0',
	type: 'integer',
	disable: false,
	errorAfterSubmit: '',
	inputData: { label: '', value: '', mandatory: true },
	styleInputField: '',
	className: '',
	error: false,
	loader: null,
	placeholder: 'Enter value',
	title: '',
	maxLength: 75,
	errorJoin: true,
	handleKeyPress: () => console.log('no')
};
Input.propTypes = {
	theme: PropTypes.string,
	type: PropTypes.string,
	disable: PropTypes.bool,
	inputData: PropTypes.object,
	styleInputField: PropTypes.string,
	className: PropTypes.string,
	error: PropTypes.bool,
	placeholder: PropTypes.string,
	title: PropTypes.string,
	maxLength: PropTypes.number
};
