import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { nanoid } from "nanoid";
import { toast, ToastContainer } from "react-toastify";

import { addTodo, deleteTodo, editTodos, toggleStatus } from "../redux/action";
import ReadOnly from "./ReadOnly";
import EditableRow from "./editableRow";

var inititalData = {
  title: "",
  date: "",
  time: "",
  status: false,
};

const Todo = () => {
  //redux
  const { allData } = useSelector((state) => ({ ...state }));

  const [todo, setTodo] = useState(inititalData);
  const [editTodo, setEditTodo] = useState(inititalData);
  const [editId, setEditId] = useState(null);

  const dispatch = useDispatch();

  const handleChange = (e) => {
    e.preventDefault();
    const name = e.target.name;
    const newFormData = { ...todo };
    newFormData[name] = e.target.value;
    setTodo(newFormData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newData = {
      ...todo,
      id: nanoid(),
    };
    if (!newData.title || !newData.time || !newData.date) {
      toast.error("Fill the required fields");
      return;
    }
    for(var i = 0 ; i< allData.length;i++){
      if(allData[i].title.toLowerCase()===newData.title.toLowerCase()){
        toast.error(`Title with name "${allData[i].title}" already exist`)
        return
      }
    }

    dispatch(addTodo(newData));
    toast.success(`Title "${newData.title}" is added`);
  };

  //toggle status
  const handleCheckChange = (e, id) => {
    const value = e.target.checked;
    const filterTodoIndex = allData.findIndex((el) => el.id === id);
    allData[filterTodoIndex].status = value;
    dispatch(toggleStatus(allData));
  };

  // delete todo
  const handleDelete = (id) => {
    const data = [...allData];
    const deletedTask = data.filter((el) => el.id === id);
    const dataAfterDelete = allData.filter((el) => el.id !== id);
    dispatch(deleteTodo(dataAfterDelete));
    toast.success(`"${deletedTask[0].title}" is deleted`);
  };

  //edit todo
  const handleEdit = (e, el) => {
    e.preventDefault();
    setEditId(el.id);
    const newEditData = { ...editTodo, ...el };
    setEditTodo(newEditData);
  };

  const handleEditChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    const newEditFormData = { ...editTodo };
    newEditFormData[name] = value;
    setEditTodo(newEditFormData);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    const newEditData = {
      ...editTodo,
      id: editId,
    };
    const newData = [...allData];

    const newEditDataIndex = newData.findIndex((el) => el.id === editId);
    newData[newEditDataIndex] = newEditData;
    dispatch(editTodos(newData));
    toast.success(`${newEditData.title} is successfully updated`)
    setEditId(null);
  };

  const handleClearCompleted = () => {
    const data = [...allData];
    const filterData = data.filter((el) => el.status === false);

    if ((data.length - filterData.length) === 0) {
      toast.error("None of the task is completed");
    } else {
      console.log(filterData.length)
      toast.success(`Cleared completed tasks `);
    }
    dispatch(deleteTodo(filterData));
  };
  return (
    <>
      <ToastContainer />
      <div className="container-fluid">
        <h3 className="text-center text-primary mt-3">Todo Application</h3>
        <div className="container text-center">
          <form action="" className="form-group">
            <input
              type="text"
              name="title"
              className=" m-3  text-secondary border-muted "
              placeholder="add todo..."
              onChange={handleChange}
            />
            <input
              type="date"
              name="date"
              className="m-3 text-secondary border-muted"
              onChange={handleChange}
            />
            <input
              type="time"
              name="time"
              className="m-3 text-secondary border-muted"
              onChange={handleChange}
            />
            <button
              type="submit"
              className="btn btn-primary btn-sm  px-4"
              onClick={handleSubmit}
            >
              Add{" "}
            </button>
          </form>
        </div>

        <div className="container">
          <form>
            <table className="table table-bordered">
              <thead className="bg-dark text-white">
                <tr>
                  <td>Title</td>
                  <td>Date</td>
                  <td>Time</td>
                  <td>Status</td>
                  <td>Actions</td>
                </tr>
              </thead>
              <tbody>
                {allData.map((el) => (
                  <>
                    {editId === el.id ? (
                      <EditableRow
                        key={el.id}
                        el={editTodo}
                        handlDelete={handleDelete}
                        handleEditChange={handleEditChange}
                        handleEditSubmit={handleEditSubmit}
                      />
                    ) : (
                      <ReadOnly
                        key={el.id}
                        el={el}
                        handleCheckChange={handleCheckChange}
                        handlDelete={handleDelete}
                        handleEdit={handleEdit}
                      />
                    )}
                  </>
                ))}
              </tbody>
            </table>
          </form>
        </div>
        {allData.length ? (
          <button
            key="1"
            className="btn btn-primary btn-sm mb-4 "
            onClick={handleClearCompleted}
          >
            Clear Completed Task
          </button>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default Todo;
