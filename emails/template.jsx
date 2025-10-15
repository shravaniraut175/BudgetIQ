import * as React from "react";
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";

// Helper to format amounts in Rupees with commas
const formatRupees = (amount) => `₹${amount?.toLocaleString("en-IN") || 0}`;

export default function EmailTemplate({
  userName = "",
  type = "monthly-report",
  data = {},
}) {
  if (type === "monthly-report") {
    return (
      <Html>
        <Head />
        <Preview>Your Monthly Financial Report</Preview>
        <Body style={styles.body}>
          <Container style={styles.container}>
            <Heading style={styles.title}>Monthly Financial Report</Heading>

            <Text style={styles.text}>Hello {userName},</Text>
            <Text style={styles.text}>
              Here’s your financial summary for {data?.month}:
            </Text>

            {/* Main Stats */}
            <Section style={styles.statsContainer}>
              <div style={styles.stat}>
                <Text style={styles.statLabel}>Total Income</Text>
                <Text style={styles.statValue}>{formatRupees(data?.stats.totalIncome)}</Text>
              </div>
              <div style={styles.stat}>
                <Text style={styles.statLabel}>Total Expenses</Text>
                <Text style={styles.statValue}>{formatRupees(data?.stats.totalExpenses)}</Text>
              </div>
              <div style={styles.stat}>
                <Text style={styles.statLabel}>Net</Text>
                <Text style={styles.statValue}>
                  {formatRupees(data?.stats.totalIncome - data?.stats.totalExpenses)}
                </Text>
              </div>
            </Section>

            {/* Category Breakdown */}
            {data?.stats?.byCategory && (
              <Section style={styles.section}>
                <Heading style={styles.sectionHeading}>Expenses by Category</Heading>
                {Object.entries(data?.stats.byCategory).map(([category, amount], i) => (
                  <div
                    key={category}
                    style={{
                      ...styles.row,
                      backgroundColor: i % 2 === 0 ? "#f9fafb" : "#ffffff",
                    }}
                  >
                    <Text style={styles.rowLabel}>{category}</Text>
                    <Text style={styles.rowValue}>{formatRupees(amount)}</Text>
                  </div>
                ))}
              </Section>
            )}

            {/* AI Insights */}
            {data?.insights && (
              <Section style={styles.section}>
                <Heading style={styles.sectionHeading}>BudgetIQ Insights</Heading>
                {data.insights.map((insight, index) => (
                  <Text key={index} style={styles.text}>
                    • {insight}
                  </Text>
                ))}
              </Section>
            )}

            <Text style={styles.footer}>
              Thank you for using BudgetIQ. Keep tracking your finances for better financial health!
            </Text>
          </Container>
        </Body>
      </Html>
    );
  }

  if (type === "budget-alert") {
    return (
      <Html>
        <Head />
        <Preview>Budget Alert</Preview>
        <Body style={styles.body}>
          <Container style={styles.container}>
            <Heading style={styles.title}>Budget Alert</Heading>
            <Text style={styles.text}>Hello {userName},</Text>
            <Text style={styles.text}>
              You’ve used {data?.percentageUsed.toFixed(1)}% of your monthly budget.
            </Text>
            <Section style={styles.statsContainer}>
              <div style={styles.stat}>
                <Text style={styles.statLabel}>Budget Amount</Text>
                <Text style={styles.statValue}>{formatRupees(data?.budgetAmount)}</Text>
              </div>
              <div style={styles.stat}>
                <Text style={styles.statLabel}>Spent So Far</Text>
                <Text style={styles.statValue}>{formatRupees(data?.totalExpenses)}</Text>
              </div>
              <div style={styles.stat}>
                <Text style={styles.statLabel}>Remaining</Text>
                <Text style={styles.statValue}>
                  {formatRupees(data?.budgetAmount - data?.totalExpenses)}
                </Text>
              </div>
            </Section>
          </Container>
        </Body>
      </Html>
    );
  }
}

const styles = {
  body: {
    backgroundColor: "#f6f9fc",
    fontFamily: "-apple-system, sans-serif",
  },
  container: {
    backgroundColor: "#ffffff",
    margin: "0 auto",
    padding: "24px",
    borderRadius: "8px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
  },
  title: {
    color: "#1e3a8a",
    fontSize: "28px",
    fontWeight: "700",
    textAlign: "center",
    marginBottom: "24px",
  },
  statsContainer: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    gap: "16px",
    marginBottom: "32px",
  },
  stat: {
    padding: "16px",
    backgroundColor: "#f9fafb",
    borderRadius: "6px",
    textAlign: "center",
    boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
  },
  statLabel: {
    fontSize: "14px",
    color: "#6b7280",
    marginBottom: "8px",
  },
  statValue: {
    fontSize: "20px",
    fontWeight: "600",
    color: "#1f2937",
  },
  section: {
    marginTop: "32px",
    padding: "20px",
    backgroundColor: "#f9fafb",
    borderRadius: "6px",
    border: "1px solid #e5e7eb",
  },
  sectionHeading: {
    color: "#1e3a8a",
    fontSize: "18px",
    fontWeight: "600",
    marginBottom: "16px",
  },
  row: {
    display: "flex",
    justifyContent: "space-between",
    padding: "12px",
  },
  rowLabel: {
    color: "#4b5563",
    fontSize: "16px",
    textTransform: "capitalize",
  },
  rowValue: {
    color: "#1f2937",
    fontSize: "16px",
    fontWeight: "600",
  },
  text: {
    color: "#4b5563",
    fontSize: "16px",
    marginBottom: "12px",
  },
  footer: {
    color: "#6b7280",
    fontSize: "14px",
    textAlign: "center",
    marginTop: "32px",
    paddingTop: "16px",
    borderTop: "1px solid #e5e7eb",
  },
};