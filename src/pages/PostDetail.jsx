import { IonAvatar, IonBackButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonHeader, IonIcon, IonImg, IonItem, IonLabel, IonList, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import { timerOutline } from "ionicons/icons";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

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
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton />
                    </IonButtons>
                    <IonTitle>{post.title}</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonList>
                    <IonImg src={post.image} />
                    <IonCard key={post.id} routerLink={`posts/${post.id}`}>
                        {/* <IonItem>
                            <IonAvatar slot="start">
                                <IonImg src={user.image} />
                            </IonAvatar>
                            <IonLabel>
                                <h3>{user.name}</h3>
                                <p>{user.title}</p>
                            </IonLabel>
                        </IonItem> */}

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
                    </IonCard>
                </IonList>
            </IonContent>
        </IonPage>
    );
}
