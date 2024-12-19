import axios from "axios";
import { successRequestInterceptor } from "./requestInterceptor/success";

const instance = axios.create();

instance.interceptors.request.use(successRequestInterceptor);

export default instance;
