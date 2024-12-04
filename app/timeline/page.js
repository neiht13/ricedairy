import Contact from "./Contact"
import InfoCard from "./InfoCard"
import Hero from "./Hero"
import Timeline from "./Timeline.js"
import Header from "./Header"
import Footer from "./Footer"
import ScrollToTopButton from "./ScrollToTopButton"
import clientPromise from "../../mongo/client";

export default async function TimelinePage({searchParams}) {

    const { user } = searchParams;
    const { db } = await clientPromise;
    const userId = user ? user : "nguyenvanman"
    const userColection = db.collection("usernew");
    const nhatkyColection = db.collection("nhatkynew");
    const muavuColection = db.collection("muavunew");
    let userR = await userColection.findOne({username: userId});
    let nhatkynew = await nhatkyColection.find({uId: userR?._id.toString()}).toArray();
    let muaVunew = await muavuColection.find({uId: userR?._id.toString()}).toArray();

  // console.log('user', user);
  // console.log('userR', userR);
  // console.log('nhatky', nhatkynew);
  

  return (
    <div className="space-y-8 scroll-smooth">
    <Header/>
    <Hero user={userR}/>
    <InfoCard user={userR}/>
    <Timeline nhatky={nhatkynew} muavu= {muaVunew}/>
    <Contact/>
    <Footer/>
    <ScrollToTopButton/>
    </div>
  )
}