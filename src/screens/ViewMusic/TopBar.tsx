import { Box } from "@components/Box";
import { theme } from "@themes/default";
import Icon from "react-native-vector-icons/Ionicons";
import { Typography } from "@components/Typography";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

export const TopBar = () => {
  const navigation = useNavigation();

  return (
    <Box
      flexDirection={"row"}
      alignItems={"center"}
      justifyContent={"space-between"}
      p={"prim"}
      mt={"xx"}
    >
      <Box>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon
            name="chevron-back-outline"
            size={35}
            color={theme.colors.textColor1}
          />
        </TouchableOpacity>
      </Box>

      <Box>
        <Typography>Tocando agora</Typography>
      </Box>

      <Box></Box>
    </Box>
  );
};
