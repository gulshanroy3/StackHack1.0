import React, { Component } from 'react';
import Styled from 'styled-components';
import UploadButton from './UploadButton';
import ImagePreview from './ImagePreview';

const AvatarUploadWrapper = Styled.div`
  display:flex;
  flex-direction: row
  ${props => props.style}
  `;
const IconButonWrapper = Styled.div`
	display: flex;
	flex-direction: column;
	${props => props.iconButonWrapperStyle}
`
const Image = Styled.img`
	height:40px;
	width:30px;
	margin:4px;
	cursor:pointer;
	${props => props.imageIconStyle}
`;
function addDefaultSrc(ev) {
	ev.target.src = 'https://d34jbachbupkhk.cloudfront.net/static/media/embibe-fulllogo-beta.1af65f69.svg';
}
export default class AvatarUpload extends Component {
	constructor(props) {
		super(props);
		this.state = {
			// buttonValue: props.imgSrc.length !== 0 ? 'Change' : 'Upload',
			imgSrc: props.imgSrc
		};
	}
	uploadImage = (file) => {
		//e.target.value = '';
		if (file) {
			var reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onloadend = function (e) {
				this.setState({
					imgSrc: [reader.result]
				});
				this.props.handleImageUpload && this.props.handleImageUpload(reader.result);
			}.bind(this);
			this.setState({ preview: true, buttonValue: 'Change' });

		}

	}
	render() {
		const { imgSrc } = this.state;
		const { showOptions, buttonStyle, imagePreviewStyle, imagePreviewWrapper, buttonWrapperStyle, iconButonWrapperStyle, avatarUploadWrapperStyle } = this.props;
		const buttonValue = imgSrc.length === 0 ? 'Upload' : 'Change';
		return (
			<AvatarUploadWrapper style={avatarUploadWrapperStyle}>
				<ImagePreview imagePreviewWrapper={imagePreviewWrapper} >{imgSrc.length === 0 ? null : <ImagePreview.Image imagePreviewStyle={imagePreviewStyle} src={imgSrc} onError={addDefaultSrc} alt='This is logo' />}</ImagePreview>
				<IconButonWrapper iconButonWrapperStyle={iconButonWrapperStyle}>

					<UploadButton buttonWrapperStyle={buttonWrapperStyle} buttonStyle={buttonStyle} uploadfunction={this.uploadImage} value={buttonValue} />
				</IconButonWrapper>
			</AvatarUploadWrapper>
		);
	}
}
AvatarUpload.defaultProps = {
	imgSrc: '',
	showOptions: false,
	avatarUploadWrapperStyle: {},
	buttonStyle: {},//for styling in button
	buttonWrapperStyle: {},//for styling in button wrapper
	imagePreviewWrapper: {},
	imagePreviewStyle: {},
	imageIconStyle: {},
	iconButonWrapperStyle: {},
	handleImageUpload: () => console.log('no')
};
