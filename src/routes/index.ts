import storiesRoute from "./stories.routes";
import userRoute from "./user.routes";

const mountRoutes = (app: any) => {
  // Middleware
  app.use("/api/v1/users", userRoute);
  app.use("/api/v1/stories", storiesRoute);
};

export default mountRoutes;
