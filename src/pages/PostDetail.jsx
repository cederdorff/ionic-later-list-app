import {
    IonBackButton,
    IonButton,
    IonButtons,
    IonCardContent,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonContent,
    IonHeader,
    IonIcon,
    IonImg,
    IonItem,
    IonLabel,
    IonList,
    IonPage,
    IonTitle,
    IonToolbar,
    useIonAlert,
    useIonViewWillEnter
} from "@ionic/react";
import { pencil, timerOutline, trash } from "ionicons/icons";
import { useState } from "react";
import { useHistory, useParams } from "react-router";
import PostModal from "../components/PostModal";
import UserDetails from "../components/UserDetails";

export default function PostDetail() {
    const params = useParams();
    const history = useHistory();
    const [post, setPost] = useState({});
    const [presentDeleteDialog] = useIonAlert();
    const url = `https://race-later-list-default-rtdb.firebaseio.com/posts/${params.id}.json`;
    const [showPostModal, setShowPostModal] = useState(false);

    useIonViewWillEnter(() => {
        getPost();
    }, [url]);

    async function getPost() {
        const res = await fetch(url);
        const postData = await res.json();
        setPost({ id: params.id, ...postData });
    }

    function handleDelete() {
        presentDeleteDialog({
            header: "Delete post",
            subHeader: post.title,
            message: "Do you want to delete the post?",
            buttons: [
                {
                    text: "No",
                    role: "cancel"
                },
                {
                    text: "Yes",
                    role: "destructive",
                    handler: deletePost
                }
            ]
        });
    }

    async function deletePost() {
        const res = await fetch(url, { method: "DELETE" });
        if (res.ok) {
            history.goBack();
        } else {
            console.log("Something went wrong");
        }
    }

    function showUpdateModal() {
        setShowPostModal(true);
    }

    return (
        <IonPage>
            <IonHeader collapse>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/home" />
                    </IonButtons>
                    <IonTitle>{post.title}</IonTitle>
                    <IonButtons slot="end">
                        <IonButton onClick={showUpdateModal}>
                            <IonIcon slot="icon-only" icon={pencil} />
                        </IonButton>
                        <IonButton onClick={handleDelete}>
                            <IonIcon slot="icon-only" icon={trash} />
                        </IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <UserDetails uid={post.createdBy} />
                <IonList>
                    <IonImg src={post.image} />
                    <IonCardHeader>
                        <IonCardSubtitle>
                            <IonLabel>{post.category}</IonLabel>
                        </IonCardSubtitle>
                        <IonCardTitle>{post.title}</IonCardTitle>
                    </IonCardHeader>

                    <IonCardContent>
                        <p>{post.description}</p>
                    </IonCardContent>
                    <IonItem lines="none">
                        <IonIcon icon={timerOutline} slot="end"></IonIcon>
                        <IonLabel>{post.duration} min</IonLabel>
                    </IonItem>
                    <IonButton expand="full" href={post.url}>
                        Go to content
                    </IonButton>
                </IonList>
                <PostModal show={showPostModal} setShow={setShowPostModal} post={post} reload={getPost} />
            </IonContent>
        </IonPage>
    );
}
