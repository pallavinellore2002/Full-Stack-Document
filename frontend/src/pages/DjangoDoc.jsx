import { useState } from "react";
export default function DjangoDoc() {
  const [darkMode, setDarkMode] = useState(true);
  const t = { bg: darkMode ? "#0f172a" : "#f8fafc", text: darkMode ? "#e2e8f0" : "#1e293b", card: darkMode ? "#1e293b" : "#fff", muted: darkMode ? "#94a3b8" : "#64748b", accent: "#092e20" };
  const Section = ({ title, children }) => (<div style={{ background: t.card, borderRadius: 12, padding: 25, marginBottom: 25, borderLeft: `4px solid ${t.accent}` }}><h2 style={{ color: t.accent, marginBottom: 15 }}>{title}</h2>{children}</div>);
  const Code = ({ children }) => (<pre style={{ background: "#0f172a", color: "#d4d4d4", padding: 15, borderRadius: 8, overflow: "auto", whiteSpace: "pre-wrap" }}>{children}</pre>);
  return (
    <div style={{ minHeight: "100vh", background: t.bg, color: t.text }}>
      <button onClick={() => setDarkMode(!darkMode)} style={{ position: "fixed", top: 20, right: 20, zIndex: 1000, background: t.card, border: "1px solid #334155", borderRadius: "50%", width: 50, height: 50, cursor: "pointer", fontSize: "1.5rem" }}>{darkMode ? "☀️" : "🌙"}</button>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "40px 20px" }}>
        <a href="/" style={{ color: t.accent, textDecoration: "none", display: "inline-block", marginBottom: 20 }}>← Back to Hub</a>
        <h1 style={{ textAlign: "center", fontSize: "2.5rem", marginBottom: 10, color: t.accent }}>Django Complete Documentation</h1>
        <p style={{ textAlign: "center", color: t.muted, marginBottom: 40 }}>From Setup to Advanced Concepts</p>
        <Section title="1. Setup"><Code>{`pip install django\ndjango-admin startproject myproject\ncd myproject\npython manage.py startapp myapp\npython manage.py migrate\npython manage.py runserver`}</Code></Section>
        <Section title="2. Models"><Code>{`from django.db import models\n\nclass Post(models.Model):\n    title = models.CharField(max_length=200)\n    content = models.TextField()\n    created_at = models.DateTimeField(auto_now_add=True)\n    \n    def __str__(self):\n        return self.title`}</Code></Section>
        <Section title="3. Views"><Code>{`from django.shortcuts import render\nfrom .models import Post\n\ndef post_list(request):\n    posts = Post.objects.all()\n    return render(request, "blog/post_list.html", {"posts": posts})`}</Code></Section>
        <Section title="4. URLs"><Code>{`from django.urls import path\nfrom . import views\n\nurlpatterns = [\n    path("", views.post_list, name="post_list"),\n    path("post/<int:pk>/", views.post_detail, name="post_detail"),\n]`}</Code></Section>
        <Section title="5. Templates"><Code>{`{% for post in posts %}\n    <h2>{{ post.title }}</h2>\n    <p>{{ post.content }}</p>\n{% endfor %}\n\n{% if user.is_authenticated %}\n    <p>Welcome, {{ user.username }}!</p>\n{% endif %}`}</Code></Section>
        <Section title="6. Admin"><Code>{`from django.contrib import admin\nfrom .models import Post\n\n@admin.register(Post)\nclass PostAdmin(admin.ModelAdmin):\n    list_display = ("title", "created_at")\n    search_fields = ("title", "content")`}</Code></Section>
      </div>
    </div>
  );
}
