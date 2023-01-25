import { TRoute } from "./RouteSelectionList";
import { Box, Button, Slider } from "@mui/material";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import React, { useState } from "react";

export interface PlayRouteControlsParams {
  route: TRoute | null;
  playPercent: number;
  progressChanged: (event: any) => void;
}

export function PlayRouteControls(props: PlayRouteControlsParams) {
  const [playing, setPlaying] = useState(false);

  return (
    <Box hidden={props.route == null}
         sx={{
           position: "absolute",
           bottom: 0,
           right: 0,
           left: 0,
           margin: 2,
           marginBottom: 6,
           backgroundColor: "white",
           padding: "2rem",
           borderRadius: 3,
           display: "flex"
         }}>
      <Button variant="text"
              color="inherit"
              sx={{ backgroundColor: "white", marginTop: 1, visibility: `${playing ? 'hidden' : 'visible'}`}}
              onClick={playPath}>
        <PlayCircleOutlineIcon sx={{ color: "black" }} />
      </Button>

      <Slider sx={{ width: "90%", marginRight: 2, marginLeft: 4 }}
              value={props.playPercent}
              onChange={(event) => props.progressChanged((event as any).target.value)}
              valueLabelDisplay="auto"
              min={0}
              step={1}
              max={100}
              marks={[{ value: 0, label: "0%" }, { value: 50, label: "50%" }, { value: 100, label: "100%" }]} />
    </Box>);

  function playPath() {
    setPlaying(true);

    for (let i = 0; i <= 100; i += 0.25) {
      setTimeout(() => props.progressChanged(i), i * 200);
    }
    setTimeout(() => setPlaying(false), 20000);
  }
}
