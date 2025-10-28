import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../actions";
import moment from "moment";

class Dashboard extends Component {
  componentDidMount() {
    this.props.fetchSurveys();
  }

  renderSurveys() {
    const { surveys } = this.props;

    if (!surveys || surveys.length === 0) {
      return (
        <div
          className="center-align"
          style={{
            marginTop: "50px",
            backgroundColor: "#121212", // dark background
            padding: "40px",
            borderRadius: "8px",
            color: "#eee", // light text
          }}
        >
          <h5 style={{ marginBottom: "10px" }}>No surveys yet 😅</h5>
          <p>Create one using the red + button below.</p>
        </div>
      );
    }

    return surveys
      .slice()
      .reverse() // Show latest first
      .map((survey) => (
        <div key={survey._id} style={{ marginBottom: "20px" }}>
          <div className="card darken-1 black white-text hoverable z-depth-3">
            <div className="card-content">
              <span className="card-title" style={{ fontWeight: "bold" }}>
                {survey.title}
              </span>
              <p style={{ marginBottom: "10px", color: "#ccc" }}>
                {survey.subject}
              </p>
              <p>{survey.body}</p>
              <div
                style={{
                  marginTop: "15px",
                  display: "flex",
                  gap: "10px",
                }}
              >
                <div
                  className="chip green lighten-2 black-text"
                  style={{ fontWeight: "500" }}
                >
                  👍 Yes: {survey.yes}
                </div>
                <div
                  className="chip red lighten-2 black-text"
                  style={{ fontWeight: "500" }}
                >
                  👎 No: {survey.no}
                </div>
              </div>
            </div>
            <div
              className="card-action"
              style={{
                fontSize: "13px",
                color: "#aaa",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <div>
                Sent: {moment(survey.dateSent).format("MMM Do YYYY, h:mm a")}
              </div>
              {survey.lastResponded && (
                <div>
                  Last Responded:{" "}
                  {moment(survey.lastResponded).format("MMM Do YYYY, h:mm a")}
                </div>
              )}
            </div>
          </div>
        </div>
      ));
  }

  render() {
    return (
      <div className="container" style={{ paddingBottom: "80px" }}>
        <h4 className="center-align white-text" style={{ marginTop: "30px" }}>
          Your Surveys
        </h4>
        <div>{this.renderSurveys()}</div>

        <div className="fixed-action-btn">
          <Link to="/survey/new" className="btn-floating btn-large red">
            <i className="large material-icons">+</i>
          </Link>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ surveys }) {
  return { surveys };
}

export default connect(mapStateToProps, actions)(Dashboard);
