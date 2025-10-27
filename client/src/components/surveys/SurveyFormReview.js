import React from "react";
import { connect } from "react-redux";
import * as actions from "../../actions";
import { withRouter } from "react-router-dom";
const SurveyFormReview = ({ onCancel, formValues, submitSurvey , history}) => {
  const backendData = { ...formValues, recipients: formValues.emails };
  return (
    <div>
      <div>
        <h5>Please confirm your enteries</h5>
      </div>
      <div>
        <label style={{ fontSize: 20 }}>Survey Title</label>
        <div>{formValues.title}</div>
      </div>
      <div>
        <label style={{ fontSize: 20 }}>Subject Line</label>
        <div>{formValues.subject}</div>
      </div>
      <div>
        <label style={{ fontSize: 20 }}>Email Body</label>
        <div>{formValues.body}</div>
      </div>
      <div>
        <label style={{ fontSize: 20 }}>Recipient List</label>
        <div>{formValues.emails}</div>
      </div>
      <button className="yellow left darken-3 btn-flat" onClick={onCancel}>
        Back
      </button>
      <button
        className="green right btn-flat white-text"
        onClick={() => submitSurvey(backendData,history)}
      >
        Send Survey
      </button>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    formValues: state.form.surveyForm.values,
  };
}

export default connect(mapStateToProps, actions)(withRouter(SurveyFormReview));
