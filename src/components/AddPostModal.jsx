import {
    IonButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonInput,
    IonItem,
    IonLabel,
    IonModal,
    IonSelect,
    IonSelectOption,
    IonTitle,
    IonToolbar
} from "@ionic/react";
import { useState } from "react";
export default function AddPostModal({ show, setShow, reload }) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState("");
    const [duration, setDuration] = useState(0);
    const [url, setUrl] = useState("");
    const [category, setCategory] = useState("");

    function dismiss() {
        setShow(false);
    }

    async function createPost() {
        const newPost = {
            title,
            description,
            image,
            url,
            category,
            duration,
            createdBy: "fjpRTRTjZHwrq3tTLHri",
            createdAt: {
                ".sv": "timestamp"
            }
        };

        const res = await fetch(
            "https://race-later-list-default-rtdb.firebaseio.com/posts.json?orderBy='createdAt'",
            {
                method: "POST",
                body: JSON.stringify(newPost)
            }
        );

        if (res.ok) {
            reload();
            setShow(false);
        } else {
            console.log("Something went wrong");
        }
    }

    return (
        <IonModal isOpen={show}>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonButton onClick={dismiss}>Cancel</IonButton>
                    </IonButtons>
                    <IonTitle>Add new post</IonTitle>
                    <IonButtons slot="end">
                        <IonButton strong={true} onClick={createPost}>
                            Create
                        </IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <IonItem>
                    <IonLabel position="stacked">Title</IonLabel>
                    <IonInput
                        type="text"
                        placeholder="Type title"
                        onIonChange={e => setTitle(e.target.value)}
                    />
                </IonItem>
                <IonItem>
                    <IonLabel position="stacked">Description</IonLabel>
                    <IonInput
                        type="text"
                        placeholder="Type description"
                        onIonChange={e => setDescription(e.target.value)}
                    />
                </IonItem>
                <IonItem>
                    <IonLabel position="stacked">Image</IonLabel>
                    <IonInput
                        type="url"
                        placeholder="Paste image url"
                        onIonChange={e => setImage(e.target.value)}
                    />
                </IonItem>
                <IonItem>
                    <IonLabel position="stacked">Duration</IonLabel>
                    <IonInput
                        type="number"
                        placeholder="Choose duration"
                        onIonChange={e => setDuration(e.target.value)}
                    />
                </IonItem>
                <IonItem>
                    <IonLabel position="stacked">Url to post</IonLabel>
                    <IonInput
                        type="url"
                        placeholder="Paste url to post"
                        onIonChange={e => setUrl(e.target.value)}
                    />
                </IonItem>
                <IonItem>
                    <IonLabel position="stacked">Category</IonLabel>
                    <IonSelect placeholder="Select category" onIonChange={e => setCategory(e.detail.value)}>
                        <IonSelectOption value="Article">Article</IonSelectOption>
                        <IonSelectOption value="Video">Video</IonSelectOption>
                        <IonSelectOption value="Podcast">Podcast</IonSelectOption>
                        <IonSelectOption value="Inspiration">Inspiration</IonSelectOption>
                    </IonSelect>
                </IonItem>
            </IonContent>
        </IonModal>
    );
}
