import { doc, getDoc } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../config/config";
import { onAuthStateChanged } from "firebase/auth";
import { collection, query, onSnapshot } from "firebase/firestore";

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {


    const [currentUser, setCurrentUser] = useState(null);
    const [userTodos, setUserTodos] = useState([]);
    const [editableTodo, setEditableTodo] = useState({});
    const [isPreloader, setIsPreloader] = useState(true);


    useEffect(() => {

        const unsubscribeAuth = onAuthStateChanged(auth, async (user) => {
            if (user) {
                const uid = user.uid;
                const docRef = doc(db, "users", uid);
                const docSnap = await getDoc(docRef);
                setCurrentUser(docSnap.data());
                
            }else{
                setIsPreloader(false);
            }
        });

        return () => unsubscribeAuth();

    }, [])

    useEffect(() => {
        if (currentUser && currentUser.userID) {
            const q = query(collection(db, "users", currentUser.userID, "todos"));
            const unsubscribe = onSnapshot(q, (querySnapshot) => {
                const mytodos = [];
                querySnapshot.forEach((doc) => {
                    mytodos.unshift({ ...doc.data(), id: doc.id });
                });

                // sorting array of object according to time field and it will show first come first show basis 

                mytodos.sort((a, b) => b.time - a.time);


                setUserTodos(mytodos);
                setIsPreloader(false);
            });


            return () => unsubscribe(); // Cleanup function to unsubscribe when the component unmounts
        }
    }, [currentUser]);



    

    return (
        <UserContext.Provider value={{ currentUser, setCurrentUser, userTodos, setUserTodos, editableTodo, setEditableTodo, isPreloader, setIsPreloader }}>
            {children}
        </UserContext.Provider>
    )

}




export default function useUser() {
    return useContext(UserContext);
}