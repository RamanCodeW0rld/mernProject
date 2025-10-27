import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { Link } from "react-router-dom";
import SurveyField from "./SurveyField";
class SurveyForm extends Component {
  renderFields() {
    return (
      <div>
        <Field
          type="text"
          name="title"
          component={SurveyField}
          label="Survey Title"
        />
        <Field
          type="text"
          name="subject"
          component={SurveyField}
          label="Subject Line"
        />
        <Field
          type="text"
          name="body"
          component={SurveyField}
          label="Email Body"
        />
        <Field
          type="text"
          name="emails"
          component={SurveyField}
          label="Recipient List"
        />
      </div>
    );
  }
  render() {
    return (
      <div>
        <form
          onSubmit={this.props.handleSubmit(this.props.onSurveyNext)}
        >
          {this.renderFields()}
          <Link className="red btn-flat left white-text" to="/surveys">
            Cancel
          </Link>
          <button className="teal btn-flat right white-text" type="submit">
            Next
          </button>
        </form>
      </div>
    );
  }
}

function validate(values) {
  const errors = {};
  if (!values.title) {
    errors.title = "You must provide a title";
  }
  if(!values.subject){
      errors.subject = "You must provide a subject";
  }

   if(!values.body){
      errors.body = "You must provide a Email Body";
  }

   if(!values.emails){
      errors.emails = "You must provide a valid email address";
  }
  
  
  return errors;
}
export default reduxForm({ form: "surveyForm", validate: validate , destroyOnUnmount: false})(
  SurveyForm
);
