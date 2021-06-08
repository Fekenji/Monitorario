import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

function toggleRa(modules) {
    return {
        type: 'LOGIN',
        modules
    }
}

const Logoff = ({ modules, dispatch }) => {
    (() => dispatch(toggleRa({raUsuario: ''})))()

    return <Redirect to="/"></Redirect>
};

export default connect(state => ({ modules: state.modules }))(Logoff);