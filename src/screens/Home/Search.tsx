import { Box } from "@components/Box";
import { Typography } from "@components/Typography";
import { Image, ScrollView, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useCallback, useEffect, useState } from "react";
import { deezer } from "@services/index";
import { PicturePlaylist } from "@components/PicturePlaylist";
import { ItemTrack } from "@components/ItemTrack";
import { selectPlayerBottom } from "@redux/playerBottomSlice";
import { useSelector } from "react-redux";

interface IArtists {
  name: string;
  picture_big: string;
}

interface ITrack {
  id: number;
  title: string;
  preview: string;
  title_short: string;
  artist: {
    name: string;
    picture_medium: string;
  };
  album: {
    title: string;
    cover_medium: string;
    cover_small: string;
  };
}

interface ISearch {
  textSearch: string;
  dataSearch: {
    artists?: {
      data: Array<IArtists>;
      total: number;
    };
  };
}

export const Search = ({ textSearch, dataSearch }: ISearch): JSX.Element => {
  const navigation = useNavigation();
  const { sound } = useSelector(selectPlayerBottom);
  const [dataPlaylist, setDataPlaylist] = useState({
    data: [],
  });

  const [dataArtist, setDataArtist] = useState({
    data: [],
  });

  const getPlaylist = useCallback(async () => {
    try {
      const data = await deezer.searchPlaylist(textSearch);
      setDataPlaylist(data);
    } catch (e) {}
  }, [dataPlaylist]);

  const getArtist = useCallback(async () => {
    try {
      const data = await deezer.searchArtist(textSearch);
      setDataArtist(data);
    } catch (e) {}
  }, [dataArtist]);

  const ItemPlaylist = ({ playlist }) => {
    return (
      <Box pr={"xxxs"} pt={"none"}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("ViewPlaylist", {
              playlist,
            })
          }
          style={{ width: 100 }}
        >
          <PicturePlaylist uri={playlist.picture_big} size="small" />

          <Typography
            mt={"nano"}
            variant="title2"
            ellipsizeMode="tail"
            numberOfLines={1}
          >
            {playlist.title}
          </Typography>
        </TouchableOpacity>
      </Box>
    );
  };

  const ItemArtist = ({ artist }) => {
    return (
      <Box
        alignContent={"center"}
        justifyContent={"center"}
        p={"prim"}
        mr="prim"
      >
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("ViewArtist", {
              artist,
            })
          }
        >
          <Image
            source={{
              uri: artist.picture_big,
            }}
            width={65}
            height={65}
            style={{ borderRadius: 100, alignSelf: "center" }}
          />
          <Box alignItems={"center"} width={70}>
            <Typography
              mt={"prim"}
              ellipsizeMode="tail"
              numberOfLines={1}
              variant="title3"
            >
              {artist.name}
            </Typography>
          </Box>
        </TouchableOpacity>
      </Box>
    );
  };

  const Title = ({ desc }) => {
    return (
      <Box
        flexDirection={"row"}
        justifyContent={"space-between"}
        alignContent={"center"}
        alignItems={"center"}
        mb={"xx"}
        mt={"xxxs"}
      >
        <Typography variant="title1">{desc}</Typography>
      </Box>
    );
  };

  useEffect(() => {
    getPlaylist();
    getArtist();
  }, [dataSearch]);

  return (
    <ScrollView>
      {dataPlaylist && <Title desc={"Playlists"} />}

      <ScrollView horizontal={true}>
        {dataPlaylist.data.map((track: IArtists, key) => {
          return <ItemPlaylist playlist={track} key={key} />;
        })}
      </ScrollView>

      {dataArtist.data.length > 0 && <Title desc={"Artistas"} />}

      <ScrollView horizontal={true}>
        {dataArtist.data.map((artist: IArtists, key) => {
          return <ItemArtist artist={artist} key={key} />;
        })}
      </ScrollView>

      {dataSearch.data.length > 0 && <Title desc={"Músicas"} />}

      {dataSearch.data.map((track: ITrack, key) => {
        return (
          <ItemTrack
            current={sound?.id == track.id}
            trackData={track}
            key={key}
          />
        );
      })}

      <Box height={100}></Box>
    </ScrollView>
  );
};
