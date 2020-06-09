import * as React from "react";
import { Action, Dispatch } from "redux";
import { ThunkAction } from '@reduxjs/toolkit';
import { useDispatch, connect } from "react-redux";
import { RootState } from "../store";

import { TestState } from "../store/test/types";
import { getData } from "../store/test/actions";

const dispatch = useDispatch();

class Test extends React.Component {
    render() {
        return (
            <div>This is a test.</div>
        );
    }
}

const mapStateToProps = (state: RootState) => ({
    test: state.test
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    componentDidMount: () => dispatch(getData)
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Test);