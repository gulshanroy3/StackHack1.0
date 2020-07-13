import React from 'react';
import Styled from 'styled-components';
const MainDiv = Styled.div`
position: relative;
  overflow: hidden;
  display: inline-block;
  height: 19px;
  //margin-top: 44px;
  ${props => props.buttonWrapperStyle}
  input[type="file"] {
    position: absolute;
    font-size: 100px;
    left: 0;
    top: 0;
    opacity: 0;
    cursor: pointer;
}

`;
const Button = Styled.button`
  color: #399ee6;
  border:none;
  font-weight: bold;
  font-size: 14px;
  ${props => props.buttonStyle}
}

`;
function UploadButton(props) {
  const { value, uploadfunction, buttonStyle, buttonWrapperStyle } = props;
  return (
    <MainDiv buttonWrapperStyle={buttonWrapperStyle}>
      <Button buttonStyle={buttonStyle}>{value}</Button>
      <input type='file' name='myfile' onChange={e => uploadfunction(e.target.files[0])} accept='image/png, image/jpeg,image/svg' />
    </MainDiv>
  );
}
UploadButton.defaultProps = {
  buttonStyle: {}
}
export default UploadButton;
