import { Box } from "@components/Box";
import { Container } from "@components/Container";
import { InputText } from "@components/InputText";
import { theme } from "@themes/default";
import { useEffect, useState } from "react";
import Icon from "react-native-vector-icons/Fontisto";
import { deezer, storage } from "../../services";
import { Typography } from "@components/Typography";
import { FeaturedSongs } from "./FeaturedSongs";
import { PlayerBottom } from "@components/PlayerBottom";
import { useNavigation } from "@react-navigation/native";
import { FeaturedPlaylists } from "./FeaturedPlaylists";
import { FeaturedTracks } from "./FeaturedTracks";
import { ScrollView, View } from "react-native";
import { FeaturedArtists } from "./FeaturedArtists";

export const Home = () => {
  const navigation = useNavigation();
  const [dataFeatured, setDataFeatured] = useState({});
  const [soundCurrent, setSoundCurrent] = useState({});

  const getTopMusics = async (reload: boolean = false) => {
    let dataTopMusic = await storage.getTopMusicsHome();

    if (dataTopMusic == null || reload === true) {
      dataTopMusic = await deezer.getEditorialChart();
      await storage.saveTopMusicsHome(dataTopMusic);
    }

    setDataFeatured(dataTopMusic);
  };

  /*  const checkStatus = async () => {
    const dataSound = await soundController.getSoundCurrent();
  }; */

  useEffect(() => {
    getTopMusics();
  }, []);

  return (
    <Container pb={"xs"}>
      <ScrollView>
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
            <Typography variant="bold" fontSize={25}>
              Olá, boa noite!
            </Typography>
          </Box>

          {/* <FeaturedSongs
            soundCurrent={soundCurrent}
            setSoundCurrent={setSoundCurrent}
            data={dataFeatured}
          /> */}

          <FeaturedTracks
            soundCurrent={soundCurrent}
            setSoundCurrent={setSoundCurrent}
            data={dataFeatured}
          />

          <FeaturedPlaylists data={dataFeatured} />
          <FeaturedArtists data={dataFeatured} />

          <Box height={100}></Box>
        </Box>
      </ScrollView>
      <PlayerBottom soundCurrent={soundCurrent} />
    </Container>
  );
};
