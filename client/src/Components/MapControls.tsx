import RouteSelectionList, { TRoute } from "./RouteSelectionList";
import { Box, Button, ButtonGroup } from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import RemoveRoundedIcon from "@mui/icons-material/RemoveRounded";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import RotateRightIcon from "@mui/icons-material/RotateRight";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";
import React from "react";

export function MapControls(props: { zoomIn: () => void, zoomOut: () => void, pitchIncrease: () => void, pitchDecrease: () => void, rotateClockwise: () => void, rotateCounterClockwise: () => void, routeSelected: (activeRoute: TRoute) => void }) {
  return <Box margin={2} sx={{ display: "flex", justifyContent: "space-between", position: "relative" }}>
    <ButtonGroup
      orientation="vertical">

      <Button variant="contained"
              color="inherit"
              sx={{ backgroundColor: "white" }}
              onClick={props.zoomIn}>
        <AddRoundedIcon sx={{ color: "black" }} />
      </Button>

      <Button variant="contained"
              color="inherit"
              sx={{ backgroundColor: "white" }}
              onClick={props.zoomOut}>
        <RemoveRoundedIcon sx={{ color: "black" }} />
      </Button>

      <Button variant="contained"
              color="inherit"
              sx={{
                backgroundColor: "white"
              }}
              onClick={props.pitchIncrease}>
        <ArrowDropUpIcon sx={{ color: "black" }} />
      </Button>

      <Button variant="contained"
              color="inherit"
              sx={{ backgroundColor: "white" }}
              onClick={props.pitchDecrease}>
        <ArrowDropDownIcon sx={{ color: "black" }} />
      </Button>

      <Button variant="contained"
              color="inherit"
              sx={{ backgroundColor: "white" }}
              onClick={props.rotateClockwise}>
        <RotateRightIcon sx={{ color: "black" }} />
      </Button>

      <Button variant="contained"
              color="inherit"
              sx={{ backgroundColor: "white" }}
              onClick={props.rotateCounterClockwise}>
        <RotateLeftIcon sx={{ color: "black" }} />
      </Button>
    </ButtonGroup>

    <RouteSelectionList routeSelected={props.routeSelected} />
  </Box>;
}
