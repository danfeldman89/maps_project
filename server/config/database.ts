import config from "config";
import { connect } from "mongoose";
import Route from "../src/models/Routes";
import gpxRawData1 from '../src/routesData/gmxData1'
import gpxRawData2 from '../src/routesData/gmxData2'

const connectDB = async () => {
  try {
    const mongoURI: string = config.get("mongoURI");
    await connect(mongoURI);
    console.log("MongoDB Connected...");

    const gpxData1 = {
      routeKey: "123123",
      gpx: gpxRawData1,
      title: 'A nice route through London',
      description: 'This is the description for the first route that is around London'
    };

    let newRoute = new Route(gpxData1);
    newRoute.save(err => {
      if (err) console.log(err.message);

      console.log('Gpx data saved successfully');
    })

    const gpxData2 = {
      routeKey: "123124",
      gpx: gpxRawData2,
      title: 'A second nice route through London',
      description: 'This is the description for the second route that is around London'
    };

    // TODO: make this more normal
    let newRoute2 = new Route(gpxData2);
    newRoute2.save(err => {
      if (err) console.log(err.message);

      console.log('Gpx data saved successfully');
    })
    
    const gpxData3 = {
      routeKey: "123125",
      gpx: gpxRawData2
    };

    let newRoute3 = new Route(gpxData3);
    newRoute3.save(err => {
      if (err) console.log(err.message);

      console.log('Gpx data saved successfully');
    })
  } catch (err) {
    console.error(err.message);
    // Exit process with failure
    process.exit(1);
  }
};

export default connectDB;
