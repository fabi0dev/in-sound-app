import { Box } from "@components/Box";
import { Container } from "@components/Container";
import { InputText } from "@components/InputText";
import { theme } from "@themes/default";
import { useEffect, useState } from "react";
import Icon from "react-native-vector-icons/Fontisto";
import { deezer } from "../../services/DeezerAPI";
import { soundController } from "../../services/SoundController";
import { Typography } from "@components/Typography";
import { FeaturedSongs } from "./FeaturedSongs";
import { PlayerBottom } from "@components/PlayerBottom";
import { useFocusEffect } from "@react-navigation/native";

export const Home = () => {
  const [dataFeatured, setDataFeatured] = useState({});
  const [soundCurrent, setSoundCurrent] = useState({});

  const getTopMusics = async () => {
    const data = await deezer.getTops(20);
    setDataFeatured(data);
  };

  const search = async () => {};

  const checkStatus = async () => {
    const dataSound = await soundController.getSoundCurrent();
  };

  useEffect(() => {
    getTopMusics();
  }, []);

  useFocusEffect(() => {
    checkStatus();
  });

  return (
    <Container>
      <Box>
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
          <Typography fontSize={17} variant="bold">
            Tops do momento
          </Typography>
        </Box>

        <FeaturedSongs
          soundCurrent={soundCurrent}
          setSoundCurrent={setSoundCurrent}
          data={dataFeatured}
        />
      </Box>
      <PlayerBottom
        soundCurrent={soundCurrent}
        setSoundCurrent={setSoundCurrent}
      />
    </Container>
  );
};
