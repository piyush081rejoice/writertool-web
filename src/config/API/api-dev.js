const protocol = "https";
// const host = "192.168.0.125:8000/api";
// const host = "192.168.0.109:8000/api";

// const host = "api.barbera.io/api";
const host = "da93-49-36-82-208.ngrok-free.app/api/v1";
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
