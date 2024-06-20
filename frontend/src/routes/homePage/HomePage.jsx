import { useContext } from "react";
import "./homePage.scss";
import { AuthContext } from "../../context/AuthContext";

export default function HomePage() {


const { currentUser } = useContext(AuthContext)

return (
    <div className="homePage">
        <div className="textContainer">
            <div className="wrapper">
                <h1 className="title">
                    Explore Child Projects & Encourage Growth
                </h1>
                <p>
                    Explore programs for kindergartens, schools, social child projects, and social teenager projects to empower and educate young minds at every stage of development.
                </p>

            </div>
        </div>
        <div className="imgContainer">
            <img src="bg.png" alt="" />
        </div>
    </div>
)
}
