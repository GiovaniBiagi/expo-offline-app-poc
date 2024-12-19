import axios, { InternalAxiosRequestConfig } from "axios";
import { getNetworkStateAsync } from "expo-network";

import { offlineStorages } from "@/lib/zustand/offline-storages";

export const successRequestInterceptor = async (
  config: InternalAxiosRequestConfig
): Promise<InternalAxiosRequestConfig> => {
  const isConnected = (await getNetworkStateAsync()).isConnected;

  if ((config.method === "post" || config.method === "put") && isConnected) {
    const storageName = config.url?.split("/").pop() as string;

    offlineStorages[storageName as keyof typeof offlineStorages](config.data);

    throw new axios.Cancel("No internet connection");
  }

  return config;
};
