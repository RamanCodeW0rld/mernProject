import React from "react";

const SurveyField = ({ input, label, meta }) => {
  return (
    <div>
      <label style={{ fontSize: 20 }}>{label}</label>
      <input {...input} style={{ marginBottom: 5 }}/>
      {meta.touched && <p className="red-text">{meta.error}</p>}
    </div>
  );
};

export default SurveyField;
