export function renderAdminHtml(): string {
  return `<!DOCTYPE html>
<html lang="am">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>ፍኖተ ትጉሃን ሰንበት ት/ቤት - Backend API & Admin</title>
  <style>
    body { font-family: system-ui, sans-serif; background: #081716; color: #e2f1ee; padding: 2rem; text-align: center; }
    h1 { color: #f59e0b; }
    .card { background: #0d2e2b; border: 1px solid #10b981; border-radius: 1rem; padding: 1.5rem; max-width: 600px; margin: 2rem auto; }
    a { color: #34d399; text-decoration: none; font-weight: bold; }
  </style>
</head>
<body>
  <div class="card">
    <h1>ፍኖተ ትጉሃን ሰንበት ት/ቤት ኤፒአይ</h1>
    <p>የላፍቶ ደብረ ትጉሃን ቅዱስ ሚካኤል ቤተክርስቲያን</p>
    <p><a href="/api/health">API Health Check (/api/health)</a></p>
  </div>
</body>
</html>`;
}
