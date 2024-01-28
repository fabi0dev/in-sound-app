import { Box } from "@components/Box";
import { Typography } from "@components/Typography";
import { ItemTrack } from "@components/ItemTrack";

interface IFeaturedTracks {
  data: {
    tracks?: {
      data: [];
    };
  };
}

export const FeaturedTracks = ({ data }: IFeaturedTracks): JSX.Element => {
  return (
    <Box>
      <Box mt={"nano"} mb={"nano"}>
        <Typography marginBottom={"nano"} variant="title1">
          Músicas populares
        </Typography>

        <Box
          flexDirection={"row"}
          flexWrap={"wrap"}
          justifyContent={"space-between"}
        >
          {data?.tracks?.data.map((track, key) => {
            return (
              <Box key={key} mb={"cake"}>
                <ItemTrack trackData={track} />
              </Box>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
};
