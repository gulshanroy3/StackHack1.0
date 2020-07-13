import React from 'react';
import Styled from 'styled-components';
const MainDiv = Styled.div`
	height:70px;
	width:70px;
	border: 1px solid #efefef;
	border-radius: 9px;
	${props => props.imagePreviewWrapper}
	`;
const Image = Styled.img`
	height:90%;
	width:88%;
	margin:4px;
	${props => props.imagePreviewStyle}

	`;
function ImagePreview(props) {
	return <MainDiv imagePreviewWrapper={props.imagePreviewWrapper}>{props.children}</MainDiv>;
}

ImagePreview.Image = Image;
export default ImagePreview;
