import { IonImg, IonItem, IonLabel, IonAvatar } from "@ionic/react";
import { useEffect, useState } from "react";

export default function UserDetails({ uid }) {
    const [user, setUser] = useState({});

    useEffect(() => {
        async function getUser() {
            const url = `https://race-later-list-default-rtdb.firebaseio.com/users/${uid}.json`;
            const res = await fetch(url);
            const data = await res.json();
            setUser(data);
        }
        getUser();
    }, [uid]);

    return (
        <IonItem>
            <IonAvatar slot="start">
                <IonImg src={user?.image} />
            </IonAvatar>
            <IonLabel>
                <h3>{user?.name}</h3>
                <p>{user?.title}</p>
            </IonLabel>
        </IonItem>
    );
}
