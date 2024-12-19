import { Post, usePostStore } from "@/stores/posts/post.store";
import { Product, useProductStore } from "@/stores/product/product.store";

export const offlineStorages = {
  posts: async (data: Post) => {
    const existigPosts = usePostStore.getState().posts;
    return usePostStore.setState({
      posts: [...existigPosts, data],
    });
  },
  products: async (data: Product) => {
    const existingProducts = useProductStore.getState().products;
    return useProductStore.setState({
      products: [...existingProducts, data],
    });
  },
};
