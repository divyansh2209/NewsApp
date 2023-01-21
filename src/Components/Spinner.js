import React, { Component } from 'react'
import Loading from './loading.gif'

const Spinner= () => {
        return (
            <div className="d-flex aligns-items-center justify-content-center">
                <img src={Loading} alt="loading" />
            </div>
        )
}
export default Spinner;
