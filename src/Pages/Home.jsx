import Announcement from "../Components/Announcement";
import Banner from "../Components/Banner";
import Categories from "../Components/Categories";
import ForumPost from "../Components/ForumPost";


const Home = () => {

    return (
        <div>
            <div className="mx-20">
                <Banner />
            </div>

            <div className="grid md:grid-cols-4">
                <div className="col-span-1">
                    <Categories />
                </div>

                <div className="col-span-2">
                    <ForumPost />
                </div>

                <div className="col-span-1">
                    <Announcement />
                </div>
            </div>
            {/* <AllComments /> */}

        </div>
    );
};

export default Home;