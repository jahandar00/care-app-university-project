import HomePage from "./routes/homePage/HomePage";
import Layout from "./routes/layout/Layout";
import {
  createBrowserRouter,
  RouterProvider

} from "react-router-dom";
import SinglePage from "./routes/singlePage/SinglePage";
import Login from "./routes/login/Login";
import ProfilePage from "./routes/profilePage/ProfilePage";
import RegisterPage from "./routes/register/RegisterPage";
import AboutPage from "./routes/about/About";
import ProfileUpdatePage from "./routes/profileUpdatePage/ProfileUpdatePage";
import SchoolListPage from "./routes/schoolListPage/SchoolListPage";
import KindergardenListPage from "./routes/kindergardenListPage/KindergardenListPage";
import ChildListPage from "./routes/childListPage/ChildListPage";
import TeenagerListPage from "./routes/teenagerListPage/TeenagerListPage";
import { singlePageLoaderSchool, singlePageLoaderKindergarden, singlePageLoaderChild, singlePageLoaderTeenager } from "./lib/loaders";

function App() {


  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout/>,
      children: [
        {
          path: "/",
          element: <HomePage/>
        },
        {
          path: "list-school",
          element: <SchoolListPage/>
        },
        {
          path: "list-school/:id",
          element: <SinglePage/>,
          loader: singlePageLoaderSchool
        },
        {
          path: "list-kindergarden",
          element: <KindergardenListPage/>
        },
        {
          path: "list-kindergarden/:id",
          element: <SinglePage/>,
          loader: singlePageLoaderKindergarden
        },
        {
          path: "list-child",
          element: <ChildListPage/>
        },
        {
          path: "list-child/:id",
          element: <SinglePage/>,
          loader: singlePageLoaderChild
        },
        {
          path: "list-teenager",
          element: <TeenagerListPage/>
        },
        {
          path: "list-teenager/:id",
          element: <SinglePage/>,
          loader: singlePageLoaderTeenager
        },
        {
          path: "/profile",
          element: <ProfilePage/>
        },
        {
          path: "/register",
          element: <RegisterPage/>
        },
        {
          path: "/login",
          element: <Login/>
        },
        {
          path: "/about",
          element: <AboutPage/>
        },
        {
          path: "/profile/update",
          element: <ProfileUpdatePage/>
        }
      ]
    }
  ])
  return (
    <RouterProvider router={router}/>
    )
}

export default App