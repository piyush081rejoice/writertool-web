import API_LOCAL from "./api-local";
// import API_LOCAL from "./api-local";
import API_PROD from "./api-prod";
import API_STAGE from "./api-stage";
import API_DEV from "./api-dev";
let hostname
if (typeof window !== 'undefined') {
  hostname = window.location.hostname;
}


export const API =
  hostname == "localhost"
    ? API_LOCAL
    : hostname === "writertools.ai"
    ? API_DEV 
    : hostname === "writertools.ai"
    ? API_PROD
    : hostname === "writertools.ai"
    ? API_STAGE
    : API_DEV;