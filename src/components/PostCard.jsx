import { IonAvatar, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonIcon, IonImg, IonItem, IonLabel } from "@ionic/react";
import { timerOutline } from "ionicons/icons";
import { useEffect, useState } from "react";
export default function PostCard({ post }) {
    const [user, setUser] = useState({});

    useEffect(() => {
        async function getUser() {
            const url = `https://race-later-list-default-rtdb.firebaseio.com/users/${post.createdBy}.json`;
            console.log(url);
            const res = await fetch(url);
            const data = await res.json();
            setUser(data);
        }
        getUser();
    }, [post.createdBy]);

    return (
        <IonCard key={post.id}>
            <IonItem>
                <IonAvatar slot="start">
                    <IonImg src={user.image} />
                </IonAvatar>
                <IonLabel>
                    <h3>{user.name}</h3>
                    <p>{user.title}</p>
                </IonLabel>
            </IonItem>
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
        </IonCard>
    );
}
