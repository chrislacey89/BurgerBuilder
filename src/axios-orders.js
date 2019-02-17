import axios from "axios";

const instance = axios.create({
  baseURL: "https://burger-builder-8e6e3.firebaseio.com/"
});

export default instance;
