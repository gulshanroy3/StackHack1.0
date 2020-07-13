import React, { Component } from 'react';
import styled from 'styled-components';
import { getImagePath } from '../../util/common';

const Wrapper = styled.div`
position: relative;
	${(props) =>
        props.disable &&
        `opacity: 0.7;
		cursor: not-allowed;
		pointer-events: none;`}
`;
const DropOptions = styled.div`
	color: rgba(0, 0, 0, 0.75);
	font-family: Roboto;
	font-size: 14px;
	font-weight: 400;
	width: 100%;
	height: 32px;
	line-height: 32px;
	padding: 0% 10%;
	cursor: pointer;
	user-select: none;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	&:hover {
		color: #212121;
		font-weight: 500;
	}
	${(props) => (props.disable ? 'cursor: not-allowed; background-color: white;' : null)}
	${(props) => props.style}
	${(props) => props.selected && 'color:#212121;background-color: rgb(230, 230, 230);'}
`;
const Dropbody = styled.div`
z-index: 9;
position: absolute;
box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.08);
margin-top: 0%;
background-color: #ffffff;
border: 1px solid rgba(0, 0, 0, 0.15);
border-radius: 4px;
// min-width: 126px;
width: 100%;
max-height: 200px;
overflow-x: scroll;
${(props) => props.style}
& ${DropOptions}:not(:last-child) {
	border-bottom: 1px solid #f1f1f1;
}
div:hover {
	background: #e0f3fc;
	cursor: pointer;
}
`;
const SelectedFields = styled.div`
		align-items: center;
		display: flex;
		flex-wrap: wrap;
		position: relative;
		box-sizing: border-box;
		flex: 1 1 0%;
		padding: 2px 8px;
		overflow: hidden;
		border-radius: 4px;
		border: 1px solid rgb(224, 224, 224);
		width:100%;
		${(props) => props.style}
		background-image: url(${getImagePath('/angle-down-solid.svg')});
		background-position:96% center;
		background-repeat:no-repeat;
		background-size: auto 18px;
		${(props) => props.disable && `background: #dddddd;`}
`;
const RectangleBox = styled.div`
	width: 246px;
	height: 32px;
	border-radius: 4px;
	position: relative;
	font-size: 15px;
	padding: 6px;
	text-align: left;
	font-family: roboto;
	cursor: pointer;
	background-position: 96% center;
	background-repeat: no-repeat;
	background-size: auto 18px;
	color: black;
	font-family: Roboto;
	font-size: 14px;
	font-weight: 400;
	line-height: 17px;
	text-align: left;
	${(props) => props.style}
`;
const Placeholder = styled.div`
	top: 20%;
	left: 0;
	bottom: 0;
	right: 0;
	z-index: 1;
	overflow: hidden;
	opacity: 0.3;
`;
class Select extends Component {
    constructor(props) {
        super(props);
        this.dropdownWrapper = React.createRef();
        this.dropdown = React.createRef();
        this.state = {
            options: [],
            isShowing: false,
            selected: [],
        };
    }

    onClick = (e) => {
        this.setState({ isShowing: true });
        if (!this.state.isShowing) {
            document.addEventListener('click', this.handleOutsideClick, false);
        } else {
            document.removeEventListener('click', this.handleOutsideClick, false);
        }
        this.setState({
            isShowing: !this.state.isShowing,
        });
    };
    handleOutsideClick = (e) => {
        this.setState({
            isShowing: false
        })
        document.removeEventListener('click', this.handleOutsideClick, false);
    };
    onChooseOptions = (selectedData) => {
        const { selector } = this.props;
        this.setState(
            {
                searchValue: selectedData[selector],
                selected: selectedData,
            },
            () => {
                this.props.onChange([selectedData]);
            }
        );
    }
    renderOptions = (selector) => {
        const { options } = this.props;
        const {
            dropBodyStyle,
            dropOptionsStyle,
            disable,
            dropBodyWrapperClass,
        } = this.props;
        const showData = JSON.parse(JSON.stringify(options))
        return (
            <Dropbody style={dropBodyStyle}>
                {showData.length > 0 ? (
                    showData.map((dropDownOption, index) => {
                        return (
                            <div
                                key={index}
                                ref={this.dropdownWrapper}
                                className={`wrapper ${dropBodyWrapperClass}`}
                                style={{ display: 'flex', flexDirection: 'row', textAlign: 'left' }}
                            >
                                <DropOptions
                                    ref={this.dropdown}
                                    style={dropOptionsStyle}
                                    onClick={(e) => this.onChooseOptions(dropDownOption)
                                    }
                                    key={'dropdown' + index}
                                    title={dropDownOption[selector]}
                                    disable={disable}
                                >
                                    {dropDownOption[selector]}
                                </DropOptions>
                            </div>
                        );
                    })
                ) : (
                        <DropOptions style={dropOptionsStyle} disable={true}>
                            No Option Available
					</DropOptions>
                    )}
            </Dropbody>
        );
    };
    returnInput() {
        const {
            selector,
            selectedFieldsStyle,
            placeholder,
            disable,
        } = this.props;
        const { selected } = this.state;
        return (
            <SelectedFields disable={disable} style={selectedFieldsStyle}>
                <RectangleBox>
                    {selected.hasOwnProperty(selector) ? null : (
                        <Placeholder> {placeholder}</Placeholder>
                    )}
                    {selected[selector]}
                </RectangleBox>
            </SelectedFields>
        );
    }
    render() {
        const {
            selector,
            wrapperStyleClass,
            disable,
        } = this.props;
        const { isShowing } = this.state;
        // console.log('SelectCOMPONENT', options, { disable });
        return (
            <div className={wrapperStyleClass} style={{ position: 'relative' }}>
                <Wrapper disable={disable} onClick={this.onClick}>
                    {this.returnInput()}
                </Wrapper>
                {isShowing ? this.renderOptions(selector) : null}
            </div>
        );
    }
}

Select.defaultProps = {
    options: [
        { label: 'All Students', value: 'all_students', id: 0 },
    ],
    onChange: () => console.log('no'),
    type: 'single',
    selector: 'label', // which key contains selector
    keyValue: 'id', //which key is unique in options.
    dropBodyStyle: {},
    dropOptionsStyle: {},
    placeholder: 'search',
    wrapperStyleClass: 'wrapper-class',
    defaultValue: {},
    disable: false,
    dropBodyWrapperClass: '',
};
export default Select;
