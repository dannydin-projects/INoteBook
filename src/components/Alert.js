import React from 'react'

function Alert(props) {
    function capitalize(word) {
        if(word==="danger"){
            return "Error";
        }
        let low = word.toLowerCase();
        return low.charAt(0).toUpperCase() + low.slice(1);
    }
    return (

        <div style={{height:'50px'}} className="my-2">
            {props.alert && <div className={`alert alert-${props.alert.type} alert-dismissible fade show`} role="alert">
            <strong>{capitalize(props.alert.type)}</strong>: {props.alert.msg}
            {/* <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button> */}
            </div>}
        </div>

    )
}

export default Alert
