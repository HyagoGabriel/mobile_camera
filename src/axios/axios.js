import axios from "axios";

const api = axios.create({
  baseURL: "https://io.adafruit.com/api/v2/Hyago/feeds/",
  headers: {
    accept: "application/json",
    "Content-Type": "application/json",
    "X-AIO-Key": "aio_rYgO747Cr7u9wFxWojDhYlaAK6kb",
  },
});

    const sheets = {
        toggleLED: (stateLED) => api.post("botaoled/data", stateLED),
    };


    export default sheets;
