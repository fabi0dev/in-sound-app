import { Box } from "@components/Box";
import { Container } from "@components/Container";
import { InputText } from "@components/InputText";
import { useEffect, useState } from "react";
import { deezer, helpers, storage } from "../../services";
import { Typography } from "@components/Typography";
import { PlayerBottom } from "@components/PlayerBottom";
import { useNavigation } from "@react-navigation/native";
import { FeaturedPlaylists } from "./FeaturedPlaylists";
import { FeaturedTracks } from "./FeaturedTracks";
import { Search } from "./Search";
import { FeaturedArtists } from "./FeaturedArtists";
import { ActivityIndicator, ScrollView } from "react-native";
import AnimatedLottieView from "lottie-react-native";
import { theme } from "@themes/default";

export const Home = () => {
  const [dataFeatured, setDataFeatured] = useState({});
  const [soundCurrent, setSoundCurrent] = useState({});
  const [dataSearch, setDataSearch] = useState("");
  const [textSearch, setTextSearch] = useState("");
  const [loading, setLoading] = useState(false);
  let timeSearch = setTimeout(() => {});

  const getTopMusics = async (reload: boolean = false) => {
    let dataTopMusic = await storage.getTopMusicsHome();

    if (dataTopMusic == null || reload === true) {
      dataTopMusic = await deezer.getEditorialChart();
      await storage.saveTopMusicsHome(dataTopMusic);
    }

    setDataFeatured(dataTopMusic);
  };

  const search = async () => {
    clearTimeout(timeSearch);

    if (textSearch == "") {
      setLoading(false);
      setDataSearch("");
      return;
    }

    setLoading(true);

    timeSearch = setTimeout(async () => {
      if (textSearch !== "") {
        try {
          const data = await deezer.search(textSearch);
          setDataSearch(data);
        } catch (e) {}
      } else {
        setDataSearch("");
      }

      setLoading(false);
      return;
    }, 800);
  };

  useEffect(() => {
    return () => clearTimeout(timeSearch);
  }, [timeSearch]);

  useEffect(() => {
    getTopMusics();
  }, []);

  return (
    <Container>
      <ScrollView>
        <Box mb={"nano"}>
          <InputText
            leftIcon={
              <AnimatedLottieView
                style={{
                  width: 40,
                  height: 40,
                }}
                source={require("@assets/animations/search.json")}
                autoPlay
                loop={false}
              />
            }
            onTextInput={() => search()}
            placeholder="Música ou artista..."
            onChangeText={(value) => {
              setTextSearch(value !== "" ? value : "");
            }}
            onBlur={() => {
              if (textSearch == "") {
                setDataSearch("");
                setDataSearch("");
              }
            }}
          />
        </Box>

        {dataSearch && (
          <Search
            setDataSearch={setDataSearch}
            dataSearch={dataSearch as never}
            textSearch={textSearch}
          />
        )}

        {!loading && !dataSearch && textSearch === "" && (
          <Box>
            <Box mb={"nano"}>
              <Typography variant="bold" fontSize={25}>
                {helpers.getWelcome()}
              </Typography>
            </Box>

            <FeaturedTracks
              soundCurrent={soundCurrent}
              setSoundCurrent={setSoundCurrent}
              data={dataFeatured}
            />

            <FeaturedPlaylists data={dataFeatured} />
            <FeaturedArtists data={dataFeatured} />

            <Box height={100}></Box>
          </Box>
        )}

        {loading && (
          <Box>
            <ActivityIndicator color={theme.colors.primary} size={25} />
          </Box>
        )}
      </ScrollView>

      <PlayerBottom soundCurrent={soundCurrent} />
    </Container>
  );
};
