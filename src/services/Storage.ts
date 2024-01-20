import AsyncStorage from "@react-native-async-storage/async-storage";

const storage = {
  saveTopMusicsHome: async (value: string) => {
    return AsyncStorage.setItem(`TopMusicsHome`, JSON.stringify(value));
  },
  getTopMusicsHome: async () => {
    const item: any = await AsyncStorage.getItem(`TopMusicsHome`);
    return JSON.parse(item);
  },
};

export { storage };
