import { Box } from "@components/Box";
import { Typography } from "@components/Typography";
import { FlatList, Image, ScrollView, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Dispatch, SetStateAction } from "react";
import { FeaturedTracks } from "./FeaturedTracks";
import { soundController } from "../../services";

interface IArtists {
  name: string;
  tracklist: string;
  picture_big: string;
}

interface ISearch {
  setDataSearch: Dispatch<SetStateAction<string>>;
  data: {
    artists?: {
      data: Array<IArtists>;
      total: number;
    };
  };
}

export const Search = ({ dataSearch, setDataSearch }: ISearch): JSX.Element => {
  const navigation = useNavigation();

  const ItemSearch = ({ itemData, index }) => {
    const play = async () => {
      await soundController.setSoundCurrent(itemData, true);
      //setSoundCurrent(itemData);
    };

    return (
      <Box flexDirection={"row"} p={"prim"} mb={"nano"}>
        <Box mr={"cake"} justifyContent={"center"}>
          <Typography fontSize={10}>{index + 1}.</Typography>
        </Box>
        <Box mr={"cake"}>
          <Image
            source={{
              uri: itemData.album.cover_medium,
            }}
            width={56}
            height={56}
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
                >
                  {itemData.title}
                </Typography>
              </Box>

              <Typography
                color={"textColor2"}
                fontSize={12}
                ellipsizeMode="tail"
                numberOfLines={1}
              >
                {itemData.album.title}
              </Typography>
            </TouchableOpacity>
          </Box>
        </Box>
      </Box>
    );
  };

  return (
    <Box>
      <Typography variant="title1">Resultados</Typography>

      <Box p={"nano"}>
        {dataSearch.data && (
          <FlatList
            data={dataSearch.data}
            renderItem={({ item, index }) => (
              <ItemSearch itemData={item} index={index} />
            )}
            keyExtractor={(item) => item.id}
          />
        )}
      </Box>
    </Box>
  );
};
