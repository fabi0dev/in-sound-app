import { Box } from "@components/Box";
import { Container } from "@components/Container";
import { useEffect, useState } from "react";
import { PlayerBottom } from "@components/PlayerBottom";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { theme } from "@themes/default";
import { storage, helpers, deezer } from "@services/index";
import { useNavigation } from "@react-navigation/native";
import { FeaturedArtists } from "../Home/FeaturedArtists";
import { FeaturedPlaylists } from "../Home/FeaturedPlaylists";
import { FeaturedTracks } from "../Home/FeaturedTracks";
import { Typography } from "@components/Typography";
import { FeaturedAlbums } from "../Home/FeaturedAlbums";
import { StatusBar } from "expo-status-bar";
import Ionicons from "react-native-vector-icons/Ionicons";

export const ViewGenre = ({ route }) => {
  const navigation = useNavigation();
  const [dataFeatured, setDataFeatured] = useState({});
  const [loading, setLoading] = useState(false);
  const { genre } = route.params;

  const getContentHome = async () => {
    const data = await deezer.getEditorialChart(genre.id);
    setDataFeatured(data);
  };

  useEffect(() => {
    getContentHome();
  }, []);

  return (
    <Container>
      <StatusBar style="inverted" />

      <ScrollView>
        <Box flexDirection={"row"}>
          <Box mr={"prim"}>
            <Image
              source={{ uri: genre.picture_medium }}
              style={{ width: 35, height: 35, borderRadius: 5 }}
            />
          </Box>
          <Typography variant="bold" fontSize={30}>
            {genre.name}
          </Typography>
        </Box>
        {!loading && (
          <Box>
            <FeaturedArtists data={dataFeatured} />
            <FeaturedPlaylists data={dataFeatured} />
            <FeaturedAlbums data={dataFeatured} />
            <FeaturedTracks data={dataFeatured} />

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
