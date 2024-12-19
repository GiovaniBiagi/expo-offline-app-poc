import { UsePostStoreType } from "@/stores/posts/post.store";

type StoreTypes = UsePostStoreType;

export const configDynamicName = async (store: StoreTypes, name: string) => {
  // set new storage name
  const currentName = store.persist.getOptions().name;
  if (currentName !== name) {
    return;
  }

  store.persist.setOptions({ name });
};
