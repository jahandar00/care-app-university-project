import { useContext } from "react";
import "./about.scss";
import { AuthContext } from "../../context/AuthContext";

export default function AboutPage() {

    const { currentUser } = useContext(AuthContext)
    console.log(currentUser);
    return (
        <div className="homePage">
            <div className="textContainer">
                <div className="wrapper">
                    <h1 className="title">
                        About us
                    </h1>
                    <p>
                        Our mission is to provide easy and efficient access to information about educational and care facilities essential for children, adolescents, and young adults. 
                        <br /> <br />
                        Our platform presents up-to-date information on the location, contact details, and accessibility of schools, daycare centers, and other relevant institutions within Chemnitz. 
                        <br /> <br />
                        Whether you are a parent searching for the nearest school, or a young adult exploring educational opportunities, our application is here to guide you. Join us in creating a more informed and connected community in Chemnitz.
                    </p>

                </div>
            </div>
            <div className="imgContainer">
                <img src="bg.png" alt="" />
            </div>
        </div>
    )
}
