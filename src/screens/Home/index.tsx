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
import { FeaturedFavorites } from "./FeaturedFavorites";
import { storage, helpers, deezer } from "@services/index";
import { ModalBottom } from "@components/ModalBottom";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import { FeaturedGenres } from "./FeaturedGenres";
import { FeaturedAlbums } from "./FeaturedAlbums";

export const Home = () => {
  const navigation = useNavigation();
  const [dataFeatured, setDataFeatured] = useState({});
  const [dataSearch, setDataSearch] = useState("");
  const [textSearch, setTextSearch] = useState("");
  const [viewModalOptions, setViewModalOptions] = useState(false);
  const [loading, setLoading] = useState(false);
  let timeSearch = setTimeout(() => {});

  const getContentHome = async (reload: boolean = false) => {
    let dataTopMusic = await storage.getTopMusicsHome();

    if (dataTopMusic == null || reload === true) {
      dataTopMusic = await deezer.getEditorialChart();
      setLoading(true);
      await storage.saveTopMusicsHome(dataTopMusic);
      setLoading(false);
    }

    setDataFeatured(dataTopMusic);
  };

  useEffect(() => {
    if (textSearch !== "") {
      setLoading(true);

      timeSearch = setTimeout(async () => {
        clearTimeout(timeSearch);

        try {
          const data = await deezer.search(textSearch);
          setDataSearch(data);
        } catch (e) {}

        setLoading(false);
      }, 800);
    } else {
      setLoading(false);
      setDataSearch("");
    }

    return () => clearTimeout(timeSearch);
  }, [textSearch]);

  useEffect(() => {
    getContentHome();
  }, []);

  return (
    <Container>
      <ScrollView>
        <Box mb={"nano"}>
          <InputText
            rightIcon={
              textSearch != "" ? (
                <TouchableOpacity onPress={() => setTextSearch("")}>
                  <Icon
                    size={25}
                    name="close"
                    color={theme.colors.textColor1}
                  />
                </TouchableOpacity>
              ) : (
                <Box />
              )
            }
            leftIcon={
              textSearch == "" ? (
                <AnimatedLottieView
                  style={{
                    width: 40,
                    height: 40,
                  }}
                  source={require("@assets/animations/search.json")}
                  autoPlay
                  loop={false}
                />
              ) : (
                <Box />
              )
            }
            placeholder="Música ou artista..."
            value={textSearch}
            onChangeText={(value) => {
              setTextSearch(value !== "" ? value : "");
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

              <TouchableOpacity onPress={() => setViewModalOptions(true)}>
                <Icon
                  name="menufold"
                  size={20}
                  color={theme.colors.textColor1}
                />
              </TouchableOpacity>
            </Box>

            <FeaturedArtists data={dataFeatured} />
            <FeaturedPlaylists data={dataFeatured} />
            <FeaturedFavorites />
            <FeaturedGenres />
            <FeaturedTracks data={dataFeatured} />
            <FeaturedAlbums data={dataFeatured} />

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

      <ModalBottom
        title="Menu principal"
        visible={viewModalOptions}
        onClose={() => setViewModalOptions(false)}
      >
        <Box alignItems={"center"}>
          <Box
            width={200}
            flexDirection={"row"}
            flexWrap={"wrap"}
            justifyContent={"space-between"}
          >
            <TouchableOpacity
              onPress={() => {
                getContentHome(true);
                setViewModalOptions(false);
              }}
            >
              <Box alignItems={"center"}>
                <Ionicons
                  name="reload"
                  size={28}
                  color={theme.colors.textColor1}
                />
                <Typography variant="title2">Atualizar</Typography>
              </Box>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate("Playlist")}>
              <Box alignItems={"center"}>
                <MaterialCommunityIcons
                  name="playlist-music"
                  size={30}
                  color={theme.colors.textColor1}
                />
                <Typography variant="title2">Minha Playlist</Typography>
              </Box>
            </TouchableOpacity>
          </Box>
        </Box>
      </ModalBottom>
    </Container>
  );
};
