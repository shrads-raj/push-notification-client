import { decode } from "url-safe-base64";

function urlBase64ToUint8Array(base64String) {
  const decodedArray = decode(base64String);
  return new Uint8Array(decodedArray);
}

export { urlBase64ToUint8Array };
