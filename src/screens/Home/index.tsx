import { Box } from "@components/Box";
import { Container } from "@components/Container";
import { InputText } from "@components/InputText";
import { useEffect, useState } from "react";
import { Typography } from "@components/Typography";
import { PlayerBottom } from "@components/PlayerBottom";
import { FeaturedPlaylists } from "./FeaturedPlaylists";
import { FeaturedTracks } from "./FeaturedTracks";
import { Search } from "./Search";
import { FeaturedArtists } from "./FeaturedArtists";
import { ActivityIndicator, ScrollView, TouchableOpacity } from "react-native";
import AnimatedLottieView from "lottie-react-native";
import { theme } from "@themes/default";
import Icon from "react-native-vector-icons/AntDesign";
import { useSelector } from "react-redux";
import { selectPlayerBottom } from "@redux/playerBottomSlice";
import { FeaturedFavorites } from "./FeaturedFavorites";
import { storage, helpers, deezer, soundController } from "@services/index";

export const Home = () => {
  const { sound } = useSelector(selectPlayerBottom);
  const [dataFeatured, setDataFeatured] = useState({});
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
          <Search dataSearch={dataSearch as never} textSearch={textSearch} />
        )}

        {!loading && !dataSearch && textSearch === "" && (
          <Box>
            <Box
              mb={"nano"}
              flexDirection={"row"}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Typography variant="bold" fontSize={25}>
                {helpers.getWelcome()}
              </Typography>

              <TouchableOpacity>
                <Icon
                  name="menufold"
                  size={20}
                  color={theme.colors.textColor1}
                />
              </TouchableOpacity>
            </Box>

            <FeaturedFavorites />
            <FeaturedTracks data={dataFeatured} />
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

      <PlayerBottom autoControlTrack={true} />
    </Container>
  );
};
