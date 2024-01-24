import { Box } from "@components/Box";
import { Typography } from "@components/Typography";
import { Image, ScrollView, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { deezer, soundController } from "../../services";
import Icon from "react-native-vector-icons/Ionicons";
import { theme } from "@themes/default";
import { useDispatch, useSelector } from "react-redux";
import { changeMusic, selectPlayerBottom } from "../../redux/playerBottomSlice";

interface IArtists {
  name: string;
  tracklist: string;
  picture_big: string;
}

interface ISearch {
  textSearch: string;
  setDataSearch: Dispatch<SetStateAction<string>>;
  dataSearch: {
    artists?: {
      data: Array<IArtists>;
      total: number;
    };
  };
}

export const Search = ({
  textSearch,
  setDataSearch,
  dataSearch,
}: ISearch): JSX.Element => {
  const dispatch = useDispatch();
  const { sound } = useSelector(selectPlayerBottom);

  const navigation = useNavigation();
  const [dataPlaylist, setDataPlaylist] = useState({
    data: [],
  });
  const [dataArtist, setDataArtist] = useState({
    data: [],
  });

  const getPlaylist = async () => {
    try {
      const data = await deezer.searchPlaylist(textSearch);
      setDataPlaylist(data);
    } catch (e) {}
  };

  const getArtist = async () => {
    try {
      const data = await deezer.searchArtist(textSearch);
      setDataArtist(data);
    } catch (e) {}
  };

  const ItemTrack = ({ trackData }) => {
    const play = async () => {
      dispatch(changeMusic(trackData));
      await soundController.play(trackData.preview);
    };

    return (
      <Box flexDirection={"row"} mb={"nano"}>
        <Box mr={"cake"}>
          <Image
            source={{
              uri: trackData.album.cover_medium,
            }}
            width={50}
            height={50}
            style={{ borderRadius: 10 }}
          />
        </Box>

        <Box flexDirection={"row"}>
          <Box justifyContent={"center"} flexDirection={"column"}>
            <TouchableOpacity onPress={() => play()}>
              <Box mb={"prim"}>
                <Typography
                  fontSize={14}
                  ellipsizeMode="tail"
                  numberOfLines={1}
                  color={sound.id == trackData.id ? "primary" : "textColor1"}
                >
                  {trackData.title}
                </Typography>
              </Box>

              <Typography
                color={"textColor2"}
                fontSize={12}
                ellipsizeMode="tail"
                numberOfLines={1}
              >
                {trackData.artist.name}
              </Typography>
            </TouchableOpacity>
          </Box>
        </Box>
      </Box>
    );
  };

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
          <Image
            source={{
              uri: playlist.picture_big,
            }}
            width={100}
            height={100}
            style={{ borderRadius: 10 }}
          />

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

  const descViewAll = (title: string, fn: () => void) => {
    return (
      <Box
        flexDirection={"row"}
        justifyContent={"space-between"}
        alignContent={"center"}
        alignItems={"center"}
        mb={"xx"}
        mt={"xxxs"}
      >
        <Typography variant="title1">{title}</Typography>
        <TouchableOpacity onPress={fn}>
          <Box flexDirection={"row"}>
            <Typography variant="title2">Ver todos</Typography>
            <Icon
              name="chevron-forward"
              size={18}
              color={theme.colors.textColor1}
            />
          </Box>
        </TouchableOpacity>
      </Box>
    );
  };

  useEffect(() => {
    getPlaylist();
    getArtist();
  }, [dataSearch]);

  return (
    <ScrollView>
      {descViewAll("Playlists", () => {
        console.log("Ver playlist");
      })}

      <ScrollView horizontal={true}>
        {dataPlaylist.data.map((track: IArtists, key) => {
          return <ItemPlaylist playlist={track} key={key} />;
        })}
      </ScrollView>

      {dataArtist.data.length > 0 &&
        descViewAll("Artistas", () => {
          console.log("Ver artistas");
        })}

      <ScrollView horizontal={true}>
        {dataArtist.data.map((artist: IArtists, key) => {
          return <ItemArtist artist={artist} key={key} />;
        })}
      </ScrollView>

      {dataSearch.data.length > 0 &&
        descViewAll("Musicas", () => {
          console.log("Ver musicas");
        })}

      {dataSearch.data.map((track: IArtists, key) => {
        return <ItemTrack trackData={track} key={key} />;
      })}

      {/* {dataSearch.data && (
        <FlatList
          data={dataSearch.data}
          renderItem={({ item, index }) => (
            <ItemSearch itemData={item} index={index} />
          )}
          keyExtractor={(item) => item.id}
        />
      )} */}

      <Box height={100}></Box>
    </ScrollView>
  );
};
