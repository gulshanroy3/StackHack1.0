import React from 'react';
import PropTypes from 'prop-types';
import Styled from 'styled-components';

const ModalWrapper = Styled.div`
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	display: flex;
	z-index: 30;
	width: 100%;
	height: 100%;
	align-items: center;
	justify-content: center;
	background-color: #00000073;
	.db-modal-wrapper {
		overflow: auto;
		position: relative;
		// margin-top: 10%;
		background-color: #ffffff;
		border-radius: 8px;
		box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.08);
		width: 50%;
		height: 44%;
		.modal-main-block {
			width: 100%;
			height: 100%;
		}
		.modal-close-block {
			display: flex;
			justify-content: center;
			margin-top: 15px;
			margin-right: 15px;
			.close-icon {
				width: 17px;
				height: 17px;
				cursor: pointer;
			}
		}
	}
`;
function Modal(props) {
	const {
		modalContainerClass,
		modalWrapperClass,
		modalMainClass,
		children,
		onClose,
	} = props;
	return (
		<ModalWrapper className={`db-modal-container ${modalContainerClass}`}>
			<div className={`db-modal-wrapper ${modalWrapperClass}`}>
				<div className={`modal-main-block ${modalMainClass}`}>{children}</div>

			</div>
			<div onClick={onClose} className={`modal-back ${props.class}`} />
		</ModalWrapper>
	);
}

Modal.defaultProps = {
	modalWrapperClass: 'predefined-wrapper',
	modalMainClass: 'predefined-main',
	closeIconblock: 'predefined-close-block',
	closeIcon: 'predefined-close-icon',
	modalContainerClass: '',
	hasCloseIcon: true,
};

Modal.propTypes = {
	modalWrapperClass: PropTypes.string,
	hasCloseIcon: PropTypes.bool,
	imagePath: PropTypes.string,
	onClose: PropTypes.func,
};

export default (Modal);
