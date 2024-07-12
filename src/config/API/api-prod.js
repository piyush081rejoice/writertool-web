const protocol = "https";
// const host = "13.229.64.137/api/v1";
// const host = "localhost:5000/api/v1";

// const host = "api.barbera.rejoicehub.com/api";
const host = "api.barbera.io/api";
// https://api.barbera.io
// const host = "prod.api.with-network.com/api/v1";
const port = "";
const trailUrl = "";

const hostUrl = `${protocol}://${host}${port ? ":" + port : ""}`;
const endpoint = `${protocol}://${host}${port ? ":" + port : ""}${trailUrl}`;

export default {
  protocol: protocol,
  host: host,
  port: port,
  apiUrl: trailUrl,
  endpoint: endpoint,
  hostUrl: hostUrl,
};
