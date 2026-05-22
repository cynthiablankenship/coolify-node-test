import express from "express";
import client from "prom-client";

const app = express();

const port = process.env.PORT || 3000;
const message = process.env.APP_MESSAGE || "APP_MESSAGE is not set";

client.collectDefaultMetrics();

const pageViews = new client.Counter({
  name: "coolify_node_page_views_total",
  help: "Total number of visits to the home page"
});

app.get("/", (req, res) => {
  pageViews.inc();

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
        <p><strong>Metric:</strong> coolify_node_page_views_total increments on each page view.</p>
      </body>
    </html>
  `);
});

app.get("/health", (req, res) => {
  res.json({ ok: true });
});

app.get("/metrics", async (req, res) => {
  res.set("Content-Type", client.register.contentType);
  res.end(await client.register.metrics());
});

app.listen(port, "0.0.0.0", () => {
  console.log(`Server listening on port ${port}`);
});
