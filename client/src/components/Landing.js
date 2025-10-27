import React from "react";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div style={styles.page}>
      {/* Hero Section */}
      <section style={styles.hero}>
        <h1 style={styles.title}>Welcome to <span style={styles.brand}>Emaily</span></h1>
        <p style={styles.subtitle}>
          The easiest way to collect valuable feedback from your users and improve your campaigns.
        </p>

        <div style={styles.ctaContainer}>
          <Link to="/surveys" style={styles.primaryButton}>
            Get Started
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section style={styles.features}>
        <h2 style={styles.sectionTitle}>Why Choose Emaily?</h2>
        <div style={styles.featureGrid}>
          <div style={styles.featureCard}>
            <h3>📩 Easy Campaigns</h3>
            <p>
              Create and send personalized email surveys in just a few clicks. No technical setup required.
            </p>
          </div>
          <div style={styles.featureCard}>
            <h3>📊 Real-time Analytics</h3>
            <p>
              Track responses and insights instantly with our built-in dashboard.
            </p>
          </div>
          <div style={styles.featureCard}>
            <h3>💬 Meaningful Feedback</h3>
            <p>
              Collect actionable feedback to understand your customers and make data-driven decisions.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={styles.footer}>
        <p>© {new Date().getFullYear()} Emaily — Empowering better feedback.</p>
      </footer>
    </div>
  );
};

const styles = {
  page: {
    fontFamily: "Inter, sans-serif",
    color: "#333",
    lineHeight: 1.6,
  },
  hero: {
    background: "linear-gradient(135deg, #00bfa5 0%, #1de9b6 100%)",
    color: "white",
    textAlign: "center",
    padding: "80px 20px",
  },
  title: {
    fontSize: "3rem",
    fontWeight: "700",
    marginBottom: "10px",
  },
  brand: {
    color: "#fff",
    textShadow: "0 2px 5px rgba(0,0,0,0.2)",
  },
  subtitle: {
    fontSize: "1.2rem",
    maxWidth: "600px",
    margin: "0 auto 30px",
  },
  ctaContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "15px",
  },
  primaryButton: {
    background: "white",
    color: "#00bfa5",
    padding: "10px 25px",
    borderRadius: "25px",
    textDecoration: "none",
    fontWeight: "600",
    transition: "0.3s",
  },
  secondaryButton: {
    border: "2px solid white",
    color: "white",
    padding: "10px 25px",
    borderRadius: "25px",
    textDecoration: "none",
    fontWeight: "600",
    transition: "0.3s",
  },
  features: {
    textAlign: "center",
    padding: "60px 20px",
    backgroundColor: "#f9f9f9",
  },
  sectionTitle: {
    fontSize: "2rem",
    marginBottom: "40px",
  },
  featureGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "30px",
    maxWidth: "1000px",
    margin: "0 auto",
  },
  featureCard: {
    background: "white",
    padding: "25px",
    borderRadius: "10px",
    boxShadow: "0 3px 10px rgba(0,0,0,0.05)",
  },
  footer: {
    textAlign: "center",
    padding: "20px",
    background: "#222",
    color: "white",
    marginTop: "50px",
  },
};

export default Landing;
