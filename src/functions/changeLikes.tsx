import React from 'react';
import { doc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../components/app';
import { increment } from 'firebase/database';

function changeLikes(PostID: string , like:number, e:any) {
    const Post = doc(db, 'Posts', PostID);
    const temp = async () => {
        await updateDoc(Post, {
            Likes: like + 1
        });
    };
    console.log(e.target)
    temp();
    e.target.innerHTML = `Likes: ${like + 1}`; 
}

export default changeLikes;
