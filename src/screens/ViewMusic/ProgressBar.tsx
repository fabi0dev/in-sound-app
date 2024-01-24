import React, { useEffect, useRef, useState } from "react";
import { Dimensions } from "react-native";
import { soundController } from "../../services/SoundController";
import { useDispatch, useSelector } from "react-redux";
import { selectPlayerBottom } from "../../redux/playerBottomSlice";
import { Box } from "@components/Box";
import { Typography } from "@components/Typography";
import { helpers } from "../../services";

export const ProgressBar = () => {
  const dispatch = useDispatch();
  const { playing, sound } = useSelector(selectPlayerBottom);
  const [timeStatus, setTimeStatus] = useState("0:00");
  const [timeTotal, setTimeTotal] = useState("0:00");
  const [timePercent, setTimePercent] = useState(0);
  const windowWidth = Dimensions.get("window").width;

  const getProgress = () => {
    soundController.fnController.setOnPlaybackStatusUpdate((status) => {
      const time = helpers.convertMlInTime(status.positionMillis);
      const percent = helpers.getPercentTimeMusic(
        status.durationMillis,
        status.positionMillis
      );
      setTimeStatus(time);
      setTimePercent(percent);
      setTimeTotal(helpers.convertMlInTime(status.durationMillis));
    });
  };

  useEffect(() => {
    getProgress();
    return () => {};
  }, [playing]);

  return (
    <Box>
      <Box alignItems={"center"} mt={"sm"} mb={"prim"}>
        <Box>
          <Box bg={"base"} height={5} width={(windowWidth / 100) * 70}>
            <Box bg={"primary"} height={5} width={timePercent + "%"}></Box>
          </Box>

          <Box flexDirection={"row"} justifyContent={"space-between"}>
            <Typography fontSize={10}>{timeStatus}</Typography>
            <Typography fontSize={10}>{timeTotal}</Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
