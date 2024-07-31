const protocol = "https";
// const host = "192.168.0.125:8000/api";
// const host = "192.168.0.109:8000/api";

// const host = "api.barbera.io/api";
const host = "jktcn0cj-80.inc1.devtunnels.ms/api/v1";
const port = "";
const trailUrl = "";

const hostUrl = `${protocol}://${host}${port ? ":" + port : ""}/`;
const endpoint = `${protocol}://${host}${port ? ":" + port : ""}${trailUrl}`;

export default {
  protocol: protocol,
  host: host,
  port: port,
  apiUrl: trailUrl,
  endpoint: endpoint,
  hostUrl: hostUrl,
};
