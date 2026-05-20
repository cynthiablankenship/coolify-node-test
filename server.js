import express from "express";

const app = express();

const port = process.env.PORT || 3000;
const message = process.env.APP_MESSAGE || "APP_MESSAGE is not set";

app.get("/", (req, res) => {
  res.type("html").send(`
    <!doctype html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>Coolify Node Test</title>
      </head>
      <body>
        <h1>Hello from a dynamic Node app</h1>
        <p><strong>APP_MESSAGE:</strong> ${message}</p>
        <p><strong>PORT:</strong> ${port}</p>
      </body>
    </html>
  `);
});

app.get("/health", (req, res) => {
  res.json({ ok: true });
});

app.listen(port, "0.0.0.0", () => {
  console.log(`Server listening on port ${port}`);
});
