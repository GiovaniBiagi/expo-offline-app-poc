import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import Api from "@/lib/http/api";
import { usePostStore } from "@/stores/posts/post.store";
import { useProductStore } from "@/stores/product/product.store";

console.log("UI", usePostStore.getState());

export default function App() {
  const { clearStore: clearPostsStore, posts } = usePostStore();
  const { clearStore: clearProductsStore, products } = useProductStore();

  const handleCreatePost = async () => {
    try {
      const response = await Api.post(
        "https://jsonplaceholder.typicode.com/posts",
        {
          title: Math.random().toString(36).substring(7),
          body: "bar",
          userId: 1,
        }
      );

      console.log("RESPONSE FROM CLIENT:POSTS", response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCreateProduct = async () => {
    try {
      const response = await Api.post("https://fakestoreapi.com/products", {
        title: `product-${Math.random().toString(36).substring(7)}`,
        price: 13.5,
        description: "lorem ipsum set",
        image: "https://i.pravatar.cc",
        category: "electronic",
      });

      console.log("RESPONSE FROM CLIENT:PRODUCTS", response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleClearStore = () => {
    clearPostsStore();
    clearProductsStore();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={handleClearStore}
        style={{
          backgroundColor: "red",
          padding: 20,
          borderRadius: 10,
        }}
      >
        <Text>Clear store</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={handleCreatePost}
        style={{
          backgroundColor: "blue",
          padding: 20,
          borderRadius: 10,
        }}
      >
        <Text>Create Post</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={handleCreateProduct}
        style={{
          backgroundColor: "green",
          padding: 20,
          borderRadius: 10,
        }}
      >
        <Text>Create Post</Text>
      </TouchableOpacity>
      {posts.map((post, index) => (
        <Text key={index}>{post.title}</Text>
      ))}
      <View style={{ height: 1, borderWidth: 1, width: "100%", margin: 10 }} />
      {products.map((product, index) => (
        <Text key={index}>{product.title}</Text>
      ))}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
