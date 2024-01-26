import React, { useEffect, useState } from "react";
import { Dimensions } from "react-native";
import { soundController, helpers } from "@services/index";
import { Box } from "@components/Box";
import { Typography } from "@components/Typography";
import Slider from "@react-native-community/slider";
import { theme } from "@themes/default";

export const ProgressBar = () => {
  const [timeStatus, setTimeStatus] = useState({
    total: "0:00",
    current: "0:00",
  });
  const [timePercent, setTimePercent] = useState(0);
  const windowWidth = Dimensions.get("window").width;

  const setPositionTrack = async (percent: number) => {
    if (soundController.fnController.getStatusAsync !== undefined) {
      let status = await soundController.fnController.getStatusAsync();
      const equivalent = (status.durationMillis * percent) / 100;
      soundController.fnController.setPositionAsync(equivalent);
    }
  };

  useEffect(() => {
    let interval = setInterval(async () => {
      if (soundController.fnController.getStatusAsync !== undefined) {
        let status = await soundController.fnController.getStatusAsync();

        if (status.isLoaded) {
          const time = helpers.convertMlInTime(status.positionMillis);
          const percent = helpers.getPercentTimeMusic(
            status.durationMillis,
            status.positionMillis
          );
          setTimePercent(percent);

          setTimeStatus({
            total: time,
            current: helpers.convertMlInTime(status.durationMillis),
          });
        }
      }
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <Box>
      <Box alignItems={"center"} mt={"sm"} mb={"prim"}>
        <Box>
          <Slider
            style={{
              width: (windowWidth / 100) * 70,
              padding: 0,
            }}
            minimumValue={0}
            maximumValue={100}
            minimumTrackTintColor={theme.colors.primary}
            maximumTrackTintColor={theme.colors.base}
            thumbTintColor={theme.colors.primary}
            value={timePercent}
            onValueChange={(value) => {
              console.log(value);
              setPositionTrack(value);
            }}
          />

          <Box flexDirection={"row"} justifyContent={"space-between"}>
            <Typography fontSize={10}>{timeStatus.total}</Typography>
            <Typography fontSize={10}>{timeStatus.current}</Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
