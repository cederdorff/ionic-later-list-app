import { IonBackButton, IonButton, IonButtons, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonHeader, IonIcon, IonImg, IonItem, IonLabel, IonList, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import { timerOutline } from "ionicons/icons";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import UserDetails from "../components/UserDetails";

export default function PostDetail() {
    const params = useParams();
    const [post, setPost] = useState({});

    useEffect(() => {
        async function getPost() {
            const res = await fetch(`https://race-later-list-default-rtdb.firebaseio.com/posts/${params.id}.json`);
            const postData = await res.json();
            console.log(postData);
            setPost(postData);
        }
        getPost();
    }, [params.id]);

    return (
        <IonPage>
            <IonHeader collapse>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton />
                    </IonButtons>
                    <IonTitle>{post.title}</IonTitle>
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
            </IonContent>
        </IonPage>
    );
}
