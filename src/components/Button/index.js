import React from 'react';
import './index.scss'
import PropTypes from 'prop-types';


export default function Button(props) {
    return (
        <div
            className={!props.isDisable ? (`button ${props.class}`) : (`button disabled ${props.class}`)}
            onClick={() => { !props.isDisable && props.onClick && props.onClick() }}
            onMouseOver={() => { props.onHover && props.onHover() }}
            style={{ color: props.textColor, backgroundColor: props.backgroundColor, cursor: props.cursor }}
        >
            {props.children}
        </div>
    )
}

Button.defaultProps = {
    class: 'predefined',
    onClick: null,
    onHover: null,
    textColor: "#000",
    backgroundColor: "#fff",
    refs: null,
    cursor: "pointer",
    isDisable: false
};

Button.propTypes = {
    class: PropTypes.string,
    onClick: PropTypes.func,
    onHover: PropTypes.func,
    refs: PropTypes.func,
    textColor: PropTypes.string,
    backgroundColor: PropTypes.string,
    cursor: PropTypes.string,
    isDisable: PropTypes.bool
}


