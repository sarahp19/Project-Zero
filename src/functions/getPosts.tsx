import React, { useState } from 'react';
import { auth, db } from '../components/app';
import {getDocs, collection, query, QuerySnapshot, where } from 'firebase/firestore';

async function getPosts(user: string) {
    let Posts:any = []
    const postsRef = collection(db, 'Posts');

    const q = query(postsRef, where('UserID', '==', user));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        Posts.push([doc.id,doc.data()]);
    });

    console.log(Posts)
    return Posts;
}

export default getPosts;
