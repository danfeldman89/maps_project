import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Card, List, ListItem, ListItemText } from "@mui/material";

export type TRoute = { // TODO: move to a more common place, it is used in App.tsx
  routeKey: string;
  title: string;
  description: string;
  gpx?: string;
};

interface Props {
  routeSelected: Function;
}

function RouteSelectionList(props: Props) {
  const [routes, setRoutes] = useState<TRoute[]>([]);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/routes')
      .then((response) => response.json())
      .then((data) => setRoutes(data))
      .catch((error) => console.error('Error:', error));
  }, []);

  useEffect(() => {
    if (selectedItem == null) return;

    fetch(`http://localhost:5000/api/routes/${selectedItem}`)
      .then((response) => response.json())
      .then((data) => props.routeSelected(data))
      .catch((error) => console.error('Error:', error));
  }, [selectedItem]);

  return (
  <Card>
    <List>
      {routes.map((value) => (
        <ListItem key={value.routeKey}
                  onClick={() => setSelectedItem(value.routeKey)}
                  sx={{ color: `${value.routeKey === selectedItem ? 'red' : 'purple'}` }}>
          <ListItemText primary={value.title} />
        </ListItem>))}
    </List>
  </Card>
);
};

export default RouteSelectionList;
