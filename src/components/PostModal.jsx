import {
    IonButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonImg,
    IonInput,
    IonItem,
    IonLabel,
    IonModal,
    IonSelect,
    IonSelectOption,
    IonTitle,
    IonToolbar
} from "@ionic/react";
import { useEffect, useState } from "react";
export default function PostModal({ show, setShow, post, reload }) {
    const [modalTitle, setModalTitle] = useState("Add new post");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState("");
    const [duration, setDuration] = useState(0);
    const [url, setUrl] = useState("");
    const [category, setCategory] = useState("");

    useEffect(() => {
        if (post) {
            setModalTitle("Update post");
            setTitle(post.title);
            setDescription(post.description);
            setImage(post.image);
            setDuration(post.duration);
            setUrl(post.url);
            setCategory(post.category);
        }
    }, [post]);

    function dismiss() {
        setShow(false);
    }

    function handleSave() {
        if (post) {
            updatePost();
        } else {
            createPost();
        }
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

        const res = await fetch("https://race-later-list-default-rtdb.firebaseio.com/posts.json", {
            method: "POST",
            body: JSON.stringify(newPost)
        });

        if (res.ok) {
            setShow(false);
        } else {
            console.log("Something went wrong");
        }
    }

    async function updatePost() {
        const postToUpdate = {
            title,
            description,
            image,
            url,
            category,
            duration
        };

        const res = await fetch(`https://race-later-list-default-rtdb.firebaseio.com/posts/${post.id}.json`, {
            method: "PATCH", // update without setting: https://firebase.google.com/docs/reference/rest/database#section-patch
            body: JSON.stringify(postToUpdate)
        });

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
                    <IonTitle>{modalTitle}</IonTitle>
                    <IonButtons slot="end">
                        <IonButton strong={true} onClick={handleSave}>
                            Save
                        </IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <form>
                    <IonItem>
                        <IonLabel position="stacked">Title</IonLabel>
                        <IonInput
                            type="text"
                            placeholder="Type title"
                            value={title}
                            onIonChange={e => setTitle(e.target.value)}
                        />
                    </IonItem>
                    <IonItem>
                        <IonLabel position="stacked">Description</IonLabel>
                        <IonInput
                            type="text"
                            placeholder="Type description"
                            value={description}
                            onIonChange={e => setDescription(e.target.value)}
                        />
                    </IonItem>

                    <IonItem>
                        <IonLabel position="stacked">Duration</IonLabel>
                        <IonInput
                            type="number"
                            placeholder="Choose duration"
                            value={duration}
                            onIonChange={e => setDuration(e.target.value)}
                        />
                    </IonItem>
                    <IonItem>
                        <IonLabel position="stacked">Url to post</IonLabel>
                        <IonInput
                            type="url"
                            placeholder="Paste url to post"
                            value={url}
                            onIonChange={e => setUrl(e.target.value)}
                        />
                    </IonItem>
                    <IonItem>
                        <IonLabel position="stacked">Category</IonLabel>
                        <IonSelect
                            placeholder="Select category"
                            value={category}
                            onIonChange={e => setCategory(e.detail.value)}>
                            <IonSelectOption value="Article">Article</IonSelectOption>
                            <IonSelectOption value="Video">Video</IonSelectOption>
                            <IonSelectOption value="Podcast">Podcast</IonSelectOption>
                            <IonSelectOption value="Inspiration">Inspiration</IonSelectOption>
                        </IonSelect>
                    </IonItem>
                    <IonItem>
                        <IonLabel position="stacked">Image</IonLabel>
                        <IonInput
                            type="url"
                            placeholder="Paste image url"
                            value={image}
                            onIonChange={e => setImage(e.target.value)}
                        />
                    </IonItem>
                    {image && (
                        <IonItem>
                            <IonLabel position="stacked">Image Preview</IonLabel>
                            <IonImg className="ion-padding" src={image} />
                        </IonItem>
                    )}
                </form>
            </IonContent>
        </IonModal>
    );
}
