import React, { useEffect, useState } from 'react';
import './App.css';
import DeckGL, { IconLayer, PathLayer } from 'deck.gl/typed';
import Map from 'react-map-gl';
import { MapContext } from 'react-map-gl/dist/esm/components/map';
import { Box } from "@mui/material";

import GpxParser from "gpxparser";
import { TRoute } from "./Components/RouteSelectionList";
import { MapControls } from "./Components/MapControls";
import { PlayRouteControls } from "./Components/PlayRouteControls";

const INITIAL_VIEW_STATE = {
  latitude: 51.47,
  longitude: 0.45,
  zoom: 14,
  bearing: 0,
  pitch: 30,
  transitionDuration: 0
};

const ICON_MAPPING = {
  marker: { x: 0, y: 0, width: 128, height: 128, mask: true }
};

function App() {
  const [view, setView] = useState(INITIAL_VIEW_STATE);
  const [iconLayer, setIconLayer] = useState(null);
  const [pathLayer, setPathLayer] = useState<PathLayer | undefined>(undefined);
  const [progress, setProgress] = useState(0);
  const [activeRoute, setActiveRoute] = useState<TRoute | null>(null);
  let gpxParser = new GpxParser();

  useEffect(() => {
    if (activeRoute == null) return;

    setPathLayer(createNewRouteLayer(true) as any);
    setIconLayer(createNewIconLayer() as any);
    setProgress(0);
  }, [activeRoute]);

  useEffect(() => {
    setPathLayer(createNewRouteLayer() as any);
  }, [progress]);

  return (
    <Box className="App">
      <DeckGL initialViewState={view}
              controller={true}
              layers={[iconLayer, pathLayer]}
              ContextProvider={MapContext.Provider as any}>
        <Map mapStyle="https://basemaps.cartocdn.com/gl/positron-nolabels-gl-style/style.json"
             mapboxAccessToken="pk.eyJ1IjoiZGFuMTE2OCIsImEiOiJjbGQ1OGNoaXExMGJ1M3BvZ3VqcnJzdWx3In0.6jSIxOLan4lg_QikaOfr0g" />

      </DeckGL>

      <MapControls zoomIn={() => setView({ ...view, zoom: view.zoom + 1, transitionDuration: 0 })}
                   zoomOut={() => setView({ ...view, zoom: view.zoom - 1, transitionDuration: 0 })}
                   pitchIncrease={() => setView({ ...view, pitch: view.pitch + 10, transitionDuration: 0 })}
                   pitchDecrease={() => setView({ ...view, pitch: view.pitch - 10, transitionDuration: 0 })}
                   rotateClockwise={() => setView({ ...view, bearing: view.bearing + 10, transitionDuration: 0 })}
                   rotateCounterClockwise={() => setView({ ...view, bearing: view.bearing - 10, transitionDuration: 0 })}
                   routeSelected={(activeRoute: TRoute) => setActiveRoute(activeRoute)} />

      {activeRoute != null && <PlayRouteControls route={activeRoute}
                                                 playPercent={progress}
                                                 progressChanged={event => setProgress(event.target.value)} />}
    </Box>
  );

  function createNewIconLayer() {
    return new IconLayer({ onClick: (item) => console.log(item),
                           id: 'icon-layer',
                           data: gpxParser.waypoints.map(value => ({ coordinates: [value.lon, value.lat], icon: 'location-icon' })),
                           pickable: true,
                           iconAtlas: 'https://raw.githubusercontent.com/visgl/deck.gl-data/master/website/icon-atlas.png',
                           iconMapping: ICON_MAPPING,
                           getIcon: d => 'marker',
                           sizeScale: 15,
                           getPosition: d => d.coordinates,
                           getSize: d => 5,
                           getColor: d => [Math.sqrt(d.exits), 140, 0]
                         });
  }

  function createNewRouteLayer(isStartPointReset = false) {
    if (activeRoute?.gpx == null) return null;

    gpxParser.parse(activeRoute.gpx);

    const coordinates = gpxParser.tracks[0].points;
    const pathPoints = coordinates.map(point => [point.lon, point.lat])
                                  .slice(0, isStartPointReset ? 1 : Math.round(coordinates.length * progress / 100));

    const routeLayer = new PathLayer({
                                       id: 'path-layer', data: [{ path: pathPoints, color: [144, 224, 239] }],
                                       pickable: true,
                                       widthScale: 15,
                                       getPath: d => d.path,
                                       getColor: d => d.color
                                     });

    pathPoints.length && setView({
                                     ...view,
                                     latitude: pathPoints[pathPoints.length - 1][1],
                                     longitude: pathPoints[pathPoints.length - 1][0],
                                     transitionDuration: 100
                                   });
    return routeLayer;
  }
}

export default App;
