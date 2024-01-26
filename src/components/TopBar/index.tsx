import { Box } from "@components/Box";
import { theme } from "@themes/default";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Typography } from "@components/Typography";
import { Dimensions, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

interface ITopBar {
  title?: string;
  goBack?: () => void;
  optionFn?: () => void;
}

export const TopBar = ({ title, goBack, optionFn }: ITopBar) => {
  const navigation = useNavigation();
  const windowWidth = Dimensions.get("window").width;

  return (
    <Box
      flexDirection={"row"}
      alignItems={"center"}
      justifyContent={"space-between"}
      p={"prim"}
      mt={"xs"}
      pl={"nano"}
      pr={"nano"}
      position={"absolute"}
      top={0}
      left={0}
      width={windowWidth}
    >
      <Box>
        <TouchableOpacity onPress={goBack ? goBack : () => navigation.goBack()}>
          <Ionicons
            name="chevron-back-outline"
            size={35}
            color={theme.colors.textColor1}
          />
        </TouchableOpacity>
      </Box>

      <Box>
        <Typography>{title || ""}</Typography>
      </Box>

      <Box>
        {typeof optionFn == "function" && (
          <TouchableOpacity onPress={optionFn}>
            <Ionicons
              name="ellipsis-vertical-outline"
              size={22}
              color={theme.colors.textColor1}
            />
          </TouchableOpacity>
        )}
      </Box>
    </Box>
  );
};
