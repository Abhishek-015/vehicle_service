import React from "react";;

const ReadOnly = ({el,handleCheckChange,handlDelete,handleEdit})=>(
    <tr   className={el.status?"text-success":""} key={el.id}>
    <td>{el.title}</td>
    <td>{el.date}</td>
    <td>{el.time}</td>
    <td >
      <input
        type="checkbox"
        name="status"
        defaultChecked={el.status}
        onChange={(e) => handleCheckChange(e, el.id)}
      
      />
      {el.status ? "Completed" : "Incomplete"}
    </td>
    <td>
      <button className="btn btn-outline-primary btn-sm m-1 px-3" onClick={(e)=>handleEdit(e,el)} >
        Edit
      </button>
      <button className="btn btn-outline-danger btn-sm m-1" onClick={()=>handlDelete(el.id)}>
        Delete
      </button>
    </td>
  </tr>
)

export default ReadOnly