import { Box } from "@components/Box";
import { Container } from "@components/Container";
import { InputText } from "@components/InputText";
import { theme } from "@themes/default";
import { useEffect, useState } from "react";
import Icon from "react-native-vector-icons/Fontisto";
import { deezer } from "../../services/DeezerAPI";
import { Typography } from "@components/Typography";
import { FeaturedSongs } from "./FeaturedSongs";
import { ScrollView } from "react-native";

export const Home = () => {
  const [dataFeatured, setDataFeatured] = useState({});
  const getTopMusics = async () => {
    const data = await deezer.getTops();
    setDataFeatured(data);
  };

  const search = async () => {};

  useEffect(() => {
    getTopMusics();
  }, []);

  return (
    <Container>
      <InputText
        leftIcon={
          <Icon name="search" size={20} color={theme.colors.textColor2} />
        }
        label={"teste"}
        placeholder="Buscar música..."
        onChangeText={(value) => {
          console.log(value);
        }}
      />

      <Box mt={"nano"} mb={"nano"}>
        <Typography>Tops do momento</Typography>
      </Box>

      <ScrollView>
        <FeaturedSongs data={dataFeatured} />
      </ScrollView>
    </Container>
  );
};
