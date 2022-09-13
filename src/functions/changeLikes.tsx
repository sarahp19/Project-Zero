import React from 'react';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../components/app';
import { increment } from 'firebase/database';

function changeLikes(PostInfo: any, PostID: any, e: any) {
    const user = auth.currentUser?.uid;
    const Post = doc(db, 'Posts', PostID);

    if (!PostInfo.likedUsers.includes(user)) {
        const like = async () => {
            await updateDoc(Post, {
                Likes: PostInfo.Likes + 1,
                likedUsers: [...PostInfo.likedUsers, user]
            });
        };
        like();
        e.target.innerHTML = `Likes: ${PostInfo.Likes + 1}`;
    } else {
        const dislike = async () => {
            await updateDoc(Post, {
                Likes: PostInfo.Likes - 1,
                likedUsers: [
                    ...PostInfo.likedUsers.filter((item: any) => {
                        return item != user;
                    })
                ]
            });
        };
        dislike();
        e.target.innerHTML = `Like  : ${PostInfo.Likes - 1}`;
    }
}

export default changeLikes;
