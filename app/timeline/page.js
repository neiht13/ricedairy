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
    const userColection = db.collection("usernew");
    const nhatkyColection = db.collection("nhatkynew");
    let userR = await userColection.findOne({username: user});
    let nhatkynew = await nhatkyColection.find({uId: userR?._id.toString()}).toArray();

  console.log('user', user);
  console.log('userR', userR);
  console.log('nhatky', nhatkynew);
  

  return (
    <div className="space-y-8 scroll-smooth">
    <Header/>
    <Hero/>
    <InfoCard user={userR}/>
    <Timeline nhatky={nhatkynew}/>
    <Contact/>
    <Footer/>
    <ScrollToTopButton/>
    </div>
  )
}