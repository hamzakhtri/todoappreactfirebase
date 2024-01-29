import React, { useEffect, useState } from 'react'
import useUser from '../../context/UserContext';
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../config/config';
import Swal from 'sweetalert2';

function TodoForm() {

    const { currentUser, editableTodo, setEditableTodo } = useUser();
    const [title, setTitle] = useState("");
    const [todo, setTodo] = useState("");
    const [newTitle, setNewTitle] = useState("");
    const [newTodo, setNewTodo] = useState("");

    useEffect(() => {
        // Update state when editableTodo changes
        setNewTitle(editableTodo.title || '');
        setNewTodo(editableTodo.todo || '');
    }, [editableTodo]);



    const addUserTodo = async () => {
        try {
            if (title && todo) {
                setTodo("");
                setTitle("");
                const todosCollectionRef = collection(db, 'users', currentUser.userID, 'todos');
                await addDoc(todosCollectionRef, { title: title, todo: todo, isCompleted: false, time: Date.now() });

                const screenWidth = window.innerWidth;
                if (screenWidth < 480) {
                    const scrollY = window.scrollY;
                    const scrollTo = scrollY + 300; // Adjust the value based on your preference
                    window.scrollTo({
                        top: scrollTo,
                        behavior: 'smooth',
                    });
                }


            } else {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Empty Field",
                });
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    const updateTodo = async () => {
        if (newTitle && newTodo) {
            const docRef = doc(db, "users", currentUser.userID, "todos", editableTodo.id);
            await updateDoc(docRef, {
                title: newTitle,
                todo: newTodo
            });

            setEditableTodo({});

            Swal.fire({
                icon: "success",
                title: "Done",
                text: "Data Update Successfully",
            });

        } else {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Empty Field",
            });
        }

    }

    if (Object.keys(editableTodo).length !== 0) {
        return (
            <div className="todo-form">
                <div className="container col-xxl-8 px-5 py-3">
                    <div className="row align-items-center g-5 py-3 justify-content-center">
                        <input
                            type="text"
                            className='w-100 h5 p-2 fw-normal form-control'
                            placeholder='Enter Title'
                            value={newTitle}
                            onChange={(e) => setNewTitle(e.target.value)} />
                        <textarea
                            className='w-100 h5 p-2 fw-normal mt-2 form-control'
                            placeholder='Enter Description'
                            value={newTodo}
                            onChange={(e) => setNewTodo(e.target.value)}
                        ></textarea>
                        <button onClick={updateTodo} className='mt-2 btn btn-success p-2 update-btn' style={{ fontSize: "20px" }}>Update</button>
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <div className="todo-form">
                <div className="container col-xxl-8 px-5 py-3">
                    <div className="row align-items-center g-5 py-3 justify-content-center">
                        <input
                            type="text"
                            className='w-100 h5 p-2 fw-normal form-control'
                            placeholder='Enter Title'
                            value={title}
                            onChange={(e) => setTitle(e.target.value)} />
                        <textarea
                            className='w-100 h5 p-2 fw-normal mt-2 form-control'
                            placeholder='Enter Description'
                            value={todo}
                            onChange={(e) => setTodo(e.target.value)}
                        ></textarea>
                        <button onClick={addUserTodo} className='mt-2 btn btn-primary p-2 add-btn' style={{ fontSize: "20px" }}>Add Todo</button>
                    </div>
                </div>
            </div>
        )

    }
}

export default TodoForm