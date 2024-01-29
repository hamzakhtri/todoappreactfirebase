import React, { } from 'react'
import './TodoItem.css'
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import useUser from '../../context/UserContext';
import { db } from '../../config/config';
import Swal from 'sweetalert2';


function TodoItem({ todo }) {

  const { currentUser, setEditableTodo } = useUser();


  const deletTodo = async () => {
    Swal.fire({
      title: 'Confirmation',
      text: 'Do you want to Delete?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteDoc(doc(db, "users", currentUser.userID, "todos", todo.id));
        setEditableTodo({});
      }
    });

  }

  const toggleComplete = async () => {
    const clonedTodo = { ...todo };
    const updatedCompleted = !clonedTodo.isCompleted;
    const isCompletedRef = doc(db, "users", currentUser.userID, "todos", todo.id);
    await updateDoc(isCompletedRef, {
      isCompleted: updatedCompleted
    });
  }


  const editTodo = () => {
    // Set editableTodo
    setEditableTodo(todo);

    // Check if screen width is less than 480px
    const screenWidth = window.innerWidth;
    if (screenWidth < 480) {
      // Scroll to the top of the page
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  };


  return (

    <div className={`card h-100 ${todo.isCompleted === true ? "completed-style" : "bg-white"}`}>
      <div className="card-body">
        <h5 className="card-title">{todo.title}</h5>
        <p className="card-text">{todo.todo}</p>
        <p className="card-text text-end small"><small>{new Date(todo.time).toLocaleString()}</small></p>
      </div>
      <div className="card-footer d-flex justify-content-around align-items-center">
        <div className="checkbox-wrapper-40">
          <label>
            <input checked={todo.isCompleted} onChange={toggleComplete} type="checkbox" />
            <span className="checkbox"></span>
          </label>
        </div>

        <button onClick={editTodo} className='m-0 p-0 border-none btn border-0'>
          <svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="38px" height="38px" viewBox="0 0 512.000000 512.000000" preserveAspectRatio="xMidYMid meet"> <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)" fill="#000000" stroke="none"> <path d="M2394 4870 c-1072 -83 -1938 -871 -2118 -1930 -40 -236 -40 -524 0 -760 166 -979 928 -1740 1904 -1904 802 -134 1629 170 2152 794 483 575 656 1343 467 2077 -214 836 -910 1501 -1754 1676 -221 46 -447 62 -651 47z m394 -251 c383 -41 771 -204 1076 -450 336 -270 586 -656 696 -1073 56 -212 64 -281 64 -531 0 -252 -10 -338 -65 -544 -187 -704 -756 -1273 -1460 -1460 -206 -55 -292 -65 -544 -65 -244 0 -310 7 -519 60 -199 50 -434 155 -614 274 -452 297 -767 756 -885 1290 -185 834 174 1707 894 2176 249 162 561 279 853 318 124 17 373 20 504 5z" /> <path d="M3250 3892 c-39 -18 -78 -53 -194 -177 -124 -132 -126 -136 -126 -181 0 -39 5 -51 34 -80 30 -30 40 -34 86 -34 l53 0 94 92 94 92 156 -157 157 -156 -91 -93 c-70 -72 -93 -102 -98 -130 -12 -64 35 -133 96 -138 65 -6 72 -1 226 152 160 159 174 181 158 245 -7 31 -501 534 -547 559 -28 15 -72 17 -98 6z" /> <path d="M2713 3371 c-88 -71 -1472 -1465 -1482 -1494 -7 -17 -11 -132 -11 -294 0 -386 -23 -363 363 -363 146 0 276 4 289 9 20 8 1508 1489 1529 1522 5 8 9 34 9 59 l0 45 -278 277 -277 278 -47 0 c-39 0 -54 -6 -95 -39z m-265 -1238 l-673 -673 -157 0 -158 0 0 157 0 158 672 672 673 673 157 -157 158 -158 -672 -672z" /> </g> </svg>
        </button>
        <button onClick={deletTodo} className='m-0 p-0 border-none btn border-0'>
          <svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="38px" height="38px" viewBox="0 0 512.000000 512.000000" preserveAspectRatio="xMidYMid meet"> <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)" fill="#FF3333" stroke="none"><path d="M2351 5109 c-606 -50 -1153 -303 -1587 -734 -77 -77 -167 -174 -200 -215 -246 -312 -420 -677 -503 -1056 -74 -335 -74 -753 0 -1088 83 -379 258 -746 503 -1056 76 -96 299 -319 395 -394 309 -245 658 -413 1036 -500 346 -79 765 -81 1109 -5 379 84 746 259 1056 503 182 144 412 400 553 616 339 522 474 1187 368 1806 -92 530 -335 999 -716 1379 -535 536 -1265 805 -2014 744z m686 -1089 c55 -33 63 -61 63 -230 l0 -150 280 0 c312 0 334 -4 370 -62 13 -21 20 -51 20 -82 0 -43 -4 -53 -39 -87 l-39 -39 -1132 0 -1132 0 -39 39 c-35 34 -39 44 -39 87 0 31 7 61 20 82 36 58 58 62 370 62 l280 0 0 150 c0 169 8 197 63 230 30 19 53 20 477 20 424 0 447 -1 477 -20z m-1357 -800 c8 -5 26 -20 40 -35 l25 -27 5 -806 c6 -891 1 -837 70 -916 18 -20 52 -47 74 -59 41 -22 42 -22 666 -22 624 0 625 0 666 22 22 12 56 39 74 59 69 79 64 25 70 916 l5 807 29 30 c70 73 184 54 222 -36 11 -26 14 -177 14 -817 0 -531 -4 -802 -11 -838 -39 -187 -189 -346 -378 -402 -48 -14 -138 -16 -691 -16 -553 0 -643 2 -691 16 -189 56 -339 215 -378 402 -7 36 -11 309 -11 843 0 844 -2 817 49 863 35 32 105 39 151 16z m670 -272 c83 -43 80 -25 80 -588 0 -552 1 -540 -69 -587 -61 -41 -145 -22 -188 44 -17 25 -18 65 -21 525 -3 479 -2 500 17 544 16 35 29 49 63 64 55 25 65 25 118 -2z m538 2 c34 -15 47 -29 63 -64 19 -44 20 -65 17 -544 -3 -460 -4 -500 -21 -525 -43 -66 -127 -85 -188 -44 -70 47 -69 35 -69 585 0 540 0 539 59 581 48 34 82 37 139 11z" /><path d="M2290 3705 l0 -65 270 0 270 0 0 65 0 65 -270 0 -270 0 0 -65z" /> </g> </svg>
        </button>
      </div>
    </div>
  )
}

export default TodoItem