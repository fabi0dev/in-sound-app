import { Box } from "@components/Box";
import { Typography } from "@components/Typography";
import {
  Image,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { storage } from "@services/Storage";
import { deezer } from "@services/DeezerAPI";
import { useEffect, useState } from "react";

interface IGenres {
  id: string;
  name: string;
  tracklist: string;
  picture_big: string;
}

interface IDataGenre {
  data: Array<IGenres>;
}

export const FeaturedGenres = (): JSX.Element => {
  const navigation = useNavigation();

  const [dataGenre, setDataGenre] = useState<IDataGenre>({
    data: [],
  });

  const getGenreHome = async (reload: boolean = false) => {
    let data = await storage.getGenre();

    if (data == null || reload === true) {
      data = await deezer.getGenre();
      await storage.saveGenre(data);
    }

    setDataGenre(data);
  };

  useEffect(() => {
    getGenreHome();
  }, []);

  return (
    <Box>
      <Box mt={"xs"} mb={"xx"}>
        <Typography marginBottom={"nano"} variant="title1">
          Estilos musicais
        </Typography>

        <ScrollView horizontal={true}>
          <Box flexWrap={"wrap"} height={270}>
            {dataGenre.data.map((genre: IGenres, key) => {
              if (key > 0) {
                return (
                  <Box
                    width={200}
                    height={120}
                    key={key}
                    p={"prim"}
                    mb="nano"
                    mr="nano"
                  >
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate("ViewGenre", {
                          genre,
                        })
                      }
                    >
                      <ImageBackground
                        source={{ uri: genre.picture_big }}
                        style={{
                          height: "100%",
                          width: "100%",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Typography
                          style={{
                            textShadowColor: "rgba(0, 0, 0, 0.6)",
                            textShadowOffset: { width: -1, height: 1 },
                            textShadowRadius: 10,
                          }}
                          variant="title1"
                        >
                          {genre.name}
                        </Typography>
                      </ImageBackground>
                    </TouchableOpacity>
                  </Box>
                );
              }
            })}
          </Box>
        </ScrollView>
      </Box>
    </Box>
  );
};
