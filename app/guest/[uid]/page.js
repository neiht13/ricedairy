// components/TimelinePage.jsx
import Contact from "./Contact.js"
import InfoCard from "./InfoCard.js"
import Hero from "./Hero.js"
import Timeline from "./Timeline.js"
import Header from "./Header.js"
import Footer from "./Footer.js"
import ScrollToTopButton from "./ScrollToTopButton.js"

export default async function TimelinePage({ params }) {
    const { uid } = params

    // Fetch data trên server
    const productRes = await fetch(`http://test.nhanchauthanhdt.vn/api/product/getby?masp=${uid}`);
    const product = await productRes.json();

    console.log(product);
     
    const username = product?.[0]?.user;

    let user = null;
    let certifications = [];
    let nhatkys = [];
    let muavu = new Date().getFullYear();

    if (username) {
        const userRes = await fetch(`http://test.nhanchauthanhdt.vn/api/user/get?user=${username}`);
        user = await userRes.json();
        console.log(user);

        const certRes = await fetch(`http://test.nhanchauthanhdt.vn/api/chungnhan/fetch?user=${username}`);
        certifications = await certRes.json();

        const logsRes = await fetch(`http://test.nhanchauthanhdt.vn/api/nhatky/fetch?user=${username}&muavu=${muavu}`);
        nhatkys = await logsRes.json();
        console.log(`http://test.nhanchauthanhdt.vn/api/nhatky/fetch?user=${username}&muavu=${muavu}`,nhatkys);
        
    }

    // if (!product.length) return <div>Không tìm thấy sản phẩm.</div>
    // if (username && (!user.length || certifications.length === 0)) return <div>Loading...</div>

    return (
        <div className="space-y-8 scroll-smooth">
            <Header />
            <Hero user={user[0]} />
            <InfoCard user={user[0]} certifications={certifications} product={product?.[0]} />
            <Timeline user={user[0]}nhatkys= {nhatkys}/>
            <Contact />
            <Footer />
            <ScrollToTopButton />
        </div>
    )
}
