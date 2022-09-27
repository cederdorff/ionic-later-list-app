import {
    IonContent,
    IonFab,
    IonFabButton,
    IonHeader,
    IonIcon,
    IonLabel,
    IonList,
    IonPage,
    IonSegment,
    IonSegmentButton,
    IonTitle,
    IonToolbar
} from "@ionic/react";
import { add } from "ionicons/icons";
import { useEffect, useState } from "react";
import AddPostModal from "../components/AddPostModal";
import PostCard from "../components/PostCard";

export default function Home() {
    const [posts, setPosts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [showAddPostModal, setShowAddPostModal] = useState(false);

    useEffect(() => {
        getData();
    }, []);

    async function getData() {
        const res = await fetch("https://race-later-list-default-rtdb.firebaseio.com/posts.json");
        const dataObj = await res.json();
        const postsArray = Object.keys(dataObj).map(key => ({ id: key, ...dataObj[key] })); // from object to array
        setPosts(postsArray);
    }

    const filteredPosts =
        selectedCategory === "All" ? [...posts] : posts.filter(post => post.category === selectedCategory);

    function openModal() {
        setShowAddPostModal(true);
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Later List</IonTitle>
                </IonToolbar>
                <IonToolbar>
                    <IonSegment
                        value={selectedCategory}
                        onIonChange={e => setSelectedCategory(e.detail.value)}>
                        <IonSegmentButton value="All">
                            <IonLabel>All</IonLabel>
                        </IonSegmentButton>
                        <IonSegmentButton value="Article">
                            <IonLabel>Articles</IonLabel>
                        </IonSegmentButton>
                        <IonSegmentButton value="Video">
                            <IonLabel>Videos</IonLabel>
                        </IonSegmentButton>
                        <IonSegmentButton value="Inspiration">
                            <IonLabel>Inspiration</IonLabel>
                        </IonSegmentButton>
                        <IonSegmentButton value="Podcast">
                            <IonLabel>Podcasts</IonLabel>
                        </IonSegmentButton>
                    </IonSegment>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonList>
                    {filteredPosts.map(postObj => (
                        <PostCard key={postObj.id} post={postObj} />
                    ))}
                </IonList>
            </IonContent>
            <IonFab vertical="bottom" horizontal="end" slot="fixed">
                <IonFabButton onClick={openModal} id="open-modal">
                    <IonIcon icon={add} />
                </IonFabButton>
            </IonFab>
            <AddPostModal show={showAddPostModal} setShow={setShowAddPostModal} reload={getData} />
        </IonPage>
    );
}
