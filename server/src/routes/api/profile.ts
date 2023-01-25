import { Response, Router } from "express";
import HttpStatusCodes from "http-status-codes";

import Route, { IRoute } from "../../models/Routes";
import Request from "../../types/Request";

const router: Router = Router();

// @route   GET api/routes
// @desc    Get all routes
// @access  Public
router.get("/", async (_req: Request, res: Response) => {
  try {
    Route.find({}, (error: NativeError, result: IRoute[]) => {
      res.set({ 'Access-Control-Allow-Origin': '*', });

      return res.json(result.map(item => ({routeKey: item.routeKey, title: item.title, description: item.description})));
    });
  } catch (err) {
    console.error(err.message);
    res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
  }
});

// @route   GET api/routes/:routeKey
// @desc    Get route by routeKey
// @access  Public
router.get("/:routeKey", async (req: Request, res: Response) => {
  try {
    Route.findOne({ routeKey: req.params.routeKey }, (error: NativeError, result: IRoute) => {
      res.set({ 'Access-Control-Allow-Origin': '*' });

      return res.json(result);
    });
  } catch (err) {
    console.error(err.message);
    res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
  }
});

export default router;
