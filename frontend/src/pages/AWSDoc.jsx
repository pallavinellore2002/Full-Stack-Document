import { useState } from "react";
export default function AWSDoc() {
  const [darkMode, setDarkMode] = useState(true);
  const t = { bg: darkMode ? "#0f172a" : "#f8fafc", text: darkMode ? "#e2e8f0" : "#1e293b", card: darkMode ? "#1e293b" : "#fff", muted: darkMode ? "#94a3b8" : "#64748b", accent: "#ff9900" };
  const Section = ({ title, children }) => (<div style={{ background: t.card, borderRadius: 12, padding: 25, marginBottom: 25, borderLeft: `4px solid ${t.accent}` }}><h2 style={{ color: t.accent, marginBottom: 15 }}>{title}</h2>{children}</div>);
  const Code = ({ children }) => (<pre style={{ background: "#0f172a", color: "#d4d4d4", padding: 15, borderRadius: 8, overflow: "auto", whiteSpace: "pre-wrap" }}>{children}</pre>);
  return (
    <div style={{ minHeight: "100vh", background: t.bg, color: t.text }}>
      <button onClick={() => setDarkMode(!darkMode)} style={{ position: "fixed", top: 20, right: 20, zIndex: 1000, background: t.card, border: "1px solid #334155", borderRadius: "50%", width: 50, height: 50, cursor: "pointer", fontSize: "1.5rem" }}>{darkMode ? "☀️" : "🌙"}</button>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "40px 20px" }}>
        <a href="/" style={{ color: t.accent, textDecoration: "none", display: "inline-block", marginBottom: 20 }}>← Back to Hub</a>
        <h1 style={{ textAlign: "center", fontSize: "2.5rem", marginBottom: 10, color: t.accent }}>AWS Complete Documentation</h1>
        <p style={{ textAlign: "center", color: t.muted, marginBottom: 40 }}>From Account Setup to Advanced Deployment</p>
        <Section title="1. Account Setup"><p style={{ color: t.muted }}>Go to aws.amazon.com and create an account. Enable MFA for security.</p><Code>{`# Install AWS CLI\nwinget install Amazon.AWSCLI  # Windows\nbrew install awscli  # macOS\n\n# Configure\naws configure\n# Enter: Access Key, Secret Key, Region, Output format`}</Code></Section>
        <Section title="2. EC2 (Virtual Servers)"><Code>{`# Launch instance\naws ec2 run-instances \\\n    --image-id ami-0c55b159cbfafe1f0 \\\n    --instance-type t2.micro \\\n    --key-name my-key\n\n# SSH into EC2\nssh -i my-key.pem ec2-user@your-instance-ip`}</Code></Section>
        <Section title="3. S3 (Storage)"><Code>{`# Create bucket\naws s3 mb s3://my-bucket\n\n# Upload file\naws s3 cp myfile.txt s3://my-bucket/\n\n# Sync folder\naws s3 sync ./build s3://my-bucket/`}</Code></Section>
        <Section title="4. Static Website on S3"><Code>{`# Enable static hosting\naws s3 website s3://my-bucket/ \\\n    --index-document index.html \\\n    --error-document error.html\n\n# Make public (bucket policy)\naws s3api put-bucket-policy \\\n    --bucket my-bucket \\\n    --policy '{...}'`}</Code></Section>
        <Section title="5. Lambda (Serverless)"><Code>{`# Create function\naws lambda create-function \\\n    --function-name my-function \\\n    --runtime python3.9 \\\n    --role arn:aws:iam::123:role/lambda-role \\\n    --handler lambda_function.handler\n\n# Invoke\naws lambda invoke --function-name my-function output.json`}</Code></Section>
      </div>
    </div>
  );
}
