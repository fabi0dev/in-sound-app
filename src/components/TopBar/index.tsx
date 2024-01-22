import { Box } from "@components/Box";
import { theme } from "@themes/default";
import Icon from "react-native-vector-icons/Ionicons";
import { Typography } from "@components/Typography";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

interface ITopBar {
  title?: string;
  goBack?: () => void;
}

export const TopBar = ({ title, goBack }: ITopBar) => {
  const navigation = useNavigation();

  return (
    <Box
      flexDirection={"row"}
      alignItems={"center"}
      justifyContent={"space-between"}
      p={"prim"}
      mt={"xs"}
      position={"absolute"}
      top={0}
      width={"100%"}
    >
      <Box>
        <TouchableOpacity onPress={goBack ? goBack : () => navigation.goBack()}>
          <Icon
            name="chevron-back-outline"
            size={35}
            color={theme.colors.textColor1}
          />
        </TouchableOpacity>
      </Box>

      <Box>
        <Typography>{title || ""}</Typography>
      </Box>

      <Box></Box>
    </Box>
  );
};
