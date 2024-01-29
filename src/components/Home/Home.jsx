import React from 'react'
import Header from '../Header/Header'
import TodoForm from '../TodoForm/TodoForm'
import useUser from '../../context/UserContext'
import TodoItem from '../TodoItem/TodoItem';

function Home() {

  const { currentUser, userTodos } = useUser();

  return (
    <>
      <div>
        <Header />
      </div>
      <div>
        {currentUser && <TodoForm />}
        <div className='container'>
          <div className="row mb-5 py-5">
            {userTodos && userTodos.length > 0 ? userTodos.map((todo, index) => {
              return (
                <div key={index} className="col-lg-4 mt-4 todo-card">
                  <TodoItem todo={todo} />
                </div>
              )
            })
              :
              <div className="col-12 text-center">
                <h2 className='text-secondary text-center my-5 '>Nothing to show</h2>
              </div>
            }
          </div>
        </div>
      </div>
    </>
  )
}

export default Home