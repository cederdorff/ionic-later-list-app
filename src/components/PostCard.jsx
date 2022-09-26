import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonIcon, IonImg, IonItem, IonLabel } from "@ionic/react";
import { timerOutline } from "ionicons/icons";
import UserDetails from "./UserDetails";
export default function PostCard({ post }) {
    return (
        <IonCard key={post.id} routerLink={`posts/${post.id}`}>
            <UserDetails uid={post.createdBy} />
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
