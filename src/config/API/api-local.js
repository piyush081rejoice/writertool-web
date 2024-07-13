const protocol = "https";
const host = "da93-49-36-82-208.ngrok-free.app/api/v1";
// const host = "ded1-49-36-81-201.ngrok-free.app/api/v1";
// const host = "192.168.0.109:8000/api";

// const host = "dev-api.barbera.io/api";
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

