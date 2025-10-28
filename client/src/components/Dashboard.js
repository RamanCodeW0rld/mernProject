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
        <div className="center-align" style={{ marginTop: "50px" }}>
          <h5>No surveys yet 😅</h5>
          <p>Create one using the red + button below.</p>
        </div>
      );
    }

    return surveys
      .slice()
      .reverse() // Show latest first
      .map((survey) => (
        <div className="col s12 m6 l4" key={survey._id}>
          <div className="card hoverable z-depth-2">
            <div className="card-content">
              <span className="card-title" style={{ fontWeight: "bold" }}>
                {survey.title}
              </span>
              <p style={{ color: "#555" }}>{survey.subject}</p>
              <p style={{ marginTop: "10px" }}>{survey.body}</p>
              <div
                className="row"
                style={{
                  marginTop: "20px",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <div
                  className="chip green lighten-4"
                  style={{ fontWeight: "500" }}
                >
                  👍 Yes: {survey.yes}
                </div>
                <div
                  className="chip red lighten-4"
                  style={{ fontWeight: "500" }}
                >
                  👎 No: {survey.no}
                </div>
              </div>
            </div>
            <div
              className="card-action grey lighten-4"
              style={{ fontSize: "13px", color: "#666" }}
            >
              <div>Sent: {moment(survey.dateSent).format("MMM Do YYYY, h:mm a")}</div>
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
      <div className="container">
        <h4 className="center-align teal-text" style={{ marginTop: "30px" }}>
          Your Surveys
        </h4>
        <div className="row">{this.renderSurveys()}</div>

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
