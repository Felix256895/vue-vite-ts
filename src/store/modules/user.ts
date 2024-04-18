import { defineStore } from "pinia";
import { AxiosResponse } from "axios";
import { loginApi } from "@/api/auth";
import { LoginData, LoginResult } from "@/api/auth/types";
import { localStg } from "@/utils/storage";
import { store } from "@/store";

export const useUserStore = defineStore("user", () => {
  function login(loginData: LoginData): Promise<unknown> {
    return new Promise<void>((resolve, reject) => {
      loginApi(loginData)
        .then((res: AxiosResponse<LoginResult, any>) => {
          const { accessToken, tokenType } = res.data;
          localStg.set("accessToken", `${tokenType} ${accessToken}`);
          resolve();
        })
        .catch((error: Error) => {
          reject(error);
        });
    });
  }

  function resetToken() {
    return new Promise<void>((resolve) => {
      localStg.remove("accessToken");
      resolve();
    });
  }

  return {
    login,
    resetToken,
  };
});

export function useUserStoreHook() {
  return useUserStore(store);
}
