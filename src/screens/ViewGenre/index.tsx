import { Box } from "@components/Box";
import { Container } from "@components/Container";
import { useEffect, useState } from "react";
import { PlayerBottom } from "@components/PlayerBottom";
import { ActivityIndicator, Image, ScrollView } from "react-native";
import { theme } from "@themes/default";
import { deezer } from "@services/index";
import { FeaturedArtists } from "../Home/FeaturedArtists";
import { FeaturedPlaylists } from "../Home/FeaturedPlaylists";
import { FeaturedTracks } from "../Home/FeaturedTracks";
import { Typography } from "@components/Typography";
import { FeaturedAlbums } from "../Home/FeaturedAlbums";
import { StatusBar } from "expo-status-bar";

export const ViewGenre = ({
  route: {
    params: { genre },
  },
}) => {
  const [dataFeatured, setDataFeatured] = useState({});
  const [loading, setLoading] = useState(false);

  const getContentHome = async () => {
    setLoading(true);
    const data = await deezer.getEditorialChart(genre.id);
    setDataFeatured(data);
    setLoading(false);
  };

  useEffect(() => {
    getContentHome();
  }, []);

  return (
    <Container>
      <StatusBar style="inverted" />

      <ScrollView>
        <Box alignItems={"center"} flexDirection={"row"}>
          <Box mr={"prim"}>
            <Image
              source={{ uri: genre.picture_medium }}
              style={{ width: 30, height: 30, borderRadius: 5 }}
            />
          </Box>
          <Typography variant="bold" fontSize={25}>
            {genre.name}
          </Typography>
        </Box>
        {!loading && (
          <Box>
            <FeaturedArtists data={dataFeatured} />
            <FeaturedPlaylists data={dataFeatured} />
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
    </Container>
  );
};
