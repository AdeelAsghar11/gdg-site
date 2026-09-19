import re

with open('app/(public)/layout.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace the anchor tag with one that uses a class instead of inline events
new_anchor = """
        <style>{`
          .hackdata-btn {
            background-color: #111;
            color: #fffc4d;
            padding: 6px 16px;
            border-radius: 999px;
            text-decoration: none;
            font-size: 12px;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            transition: opacity 0.2s;
          }
          .hackdata-btn:hover {
            opacity: 0.8;
          }
        `}</style>
        <a href="/hackdatav2/index.html" className="hackdata-btn">
          Register Now ➔
        </a>
"""

# Regex to replace the whole <a> tag I injected earlier
content = re.sub(r'<a[^>]*href="/hackdatav2/index\.html"[^>]*>.*?</a>', new_anchor, content, flags=re.DOTALL)

with open('app/(public)/layout.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
