export type StorageType = "local" | "session";

export interface LocalKey {
  accessToken: string;
}

export function createStorage<T extends object>(type: StorageType) {
  const stg = type === "session" ? window.sessionStorage : window.localStorage;

  const storage = {
    /**
     * Set session
     *
     * @param key Session key
     * @param value Session value
     */
    set<K extends keyof T>(key: K, value: T[K]) {
      const json = JSON.stringify(value);

      stg.setItem(key as string, json);
    },
    /**
     * Get session
     *
     * @param key Session key
     */
    get<K extends keyof T>(key: K): T[K] | null {
      const json = stg.getItem(key as string);
      if (json) {
        let storageData: T[K] | null = null;

        try {
          storageData = JSON.parse(json);
        } catch (error) {
          console.log(error);
        }

        if (storageData) {
          return storageData as T[K];
        }
      }

      stg.removeItem(key as string);

      return null;
    },
    remove(key: keyof T) {
      stg.removeItem(key as string);
    },
    clear() {
      stg.clear();
    },
  };
  return storage;
}

export const localStg = createStorage<LocalKey>("local");

export const sessionStg = createStorage<any>("session");
