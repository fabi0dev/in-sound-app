import { Box } from "@components/Box";
import { theme } from "@themes/default";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Typography } from "@components/Typography";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Content } from "./styles";

interface ITopBar {
  title?: string;
  goBack?: () => void;
  optionFn?: () => void;
}

export const TopBar = ({ title, goBack, optionFn }: ITopBar) => {
  const navigation = useNavigation();

  return (
    <Content>
      <TouchableOpacity onPress={goBack ? goBack : () => navigation.goBack()}>
        <Box p={"prim"}>
          <Ionicons
            name="chevron-back-outline"
            size={35}
            color={theme.colors.textColor1}
          />
        </Box>
      </TouchableOpacity>

      <Typography>{title || ""}</Typography>

      <Box>
        {typeof optionFn == "function" && (
          <Box mr={"nano"}>
            <TouchableOpacity onPress={optionFn}>
              <Ionicons
                name="ellipsis-horizontal"
                size={22}
                color={theme.colors.textColor1}
              />
            </TouchableOpacity>
          </Box>
        )}
      </Box>
    </Content>
  );
};
