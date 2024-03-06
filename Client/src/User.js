import React, { useEffect, useState } from "react";
import "./index.css";

export default function User(props) {
  const [user, setUser] = useState({});
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (props.user.name == "" && props.user.profession == "") setShow(true);
    else {
      setUser(props.user);
    }
  }, []);

  function handleUserDelete() {
    props.deleteUser(props.index);
  }

  function handleUserEdit(e) {
    if (show) handleSubmit(e);
    setShow((prevShow) => !prevShow);
  }

  function handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    setUser({ ...user, [name]: value });
    console.log(user);
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log(user);
    props.editUser(props.index, user);
  }

  return (
    <>
      {show ? (
        <tr>
          <td>{props.index + 1}</td>
          <td>
            <input
              type="text"
              class="form-control"
              id="userName"
              name="name"
              onChange={handleChange}
              value={user.name}
              placeholder="Enter User Name"
            />
          </td>
          <td>
            <input
              type="text"
              class="form-control"
              id="userProfession"
              name="profession"
              onChange={handleChange}
              value={user.profession}
              placeholder="Enter User Profession"
            />
          </td>
          <td>
            <a
              className="add"
              title="Add"
              data-toggle="tooltip"
              onClick={handleUserEdit}
            >
              <i className="material-icons">&#xE03B;</i>
            </a>

            <a
              className="delete"
              title="Delete"
              data-toggle="tooltip"
              onClick={handleUserDelete}
            >
              <i className="material-icons">&#xE872;</i>
            </a>
          </td>
        </tr>
      ) : (
        <tr>
          <td>{props.index + 1}</td>
          <td>{props.user.name}</td>
          <td>{props.user.profession}</td>
          <td>
            <a
              className="edit"
              title="Edit"
              data-toggle="tooltip"
              onClick={handleUserEdit}
            >
              <i className="material-icons">&#xE254;</i>
            </a>
            <a
              className="delete"
              title="Delete"
              data-toggle="tooltip"
              onClick={handleUserDelete}
            >
              <i className="material-icons">&#xE872;</i>
            </a>
          </td>
        </tr>
      )}
    </>
  );
}
