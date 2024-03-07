import React, { useEffect } from "react";
import { useState } from "react";
import User from "./User";
import axios from "axios";
import "./index.css";

export default function ListBooks() {
  const [users, setUsers] = useState([]);
  const url = "http://localhost:8085/";

  function getAllUsers() {
    axios
      .get(url + "users")
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    getAllUsers();
  }, [users]);

  function addUser(user) {
    console.log(user);
    axios
      .post(url + "user", user)
      .then((res) => {
        console.log(res.status);
        console.log(res.data);
      })
      .catch((err) => console.log(err));

    setUsers((prevUsers) => {
      return [...prevUsers, user];
    });
  }

  function deleteUser(index) {
    console.log("Delete called on Book with Id:" + index);
    let id = users[index]._id;
    axios
      .delete(url + "user/" + id)
      .then((res) => {
        console.log(res.status);
      })
      .catch((err) => console.log(err));
    setUsers((prevUsers) => {
      return prevUsers.filter((user, idx) => index != idx);
    });
  }

  function editUser(index, newUser) {
    let id = users[index]._id;
    axios
      .put(url + "user/" + id, { id: id, ...newUser })
      .then((res) => console.log(res.status))
      .catch((err) => console.log(err));
    setUsers((prevUsers) => {
      const newUsers = [...prevUsers];
      newUsers[index].name = newUser.name;
      newUsers[index].profession = newUser.profession;
      return newUsers;
    });
  }

  return (
    <div>
      <div className="container">
        <div className="table-wrapper">
          <div className="table-title">
            <div className="row">
              <div className="col-sm-8">
                <h2>
                  User <b>Details</b>
                </h2>
              </div>
              <div className="col-sm-4">
                <button
                  type="button"
                  className="btn btn-info add-new"
                  onClick={() => {
                    addUser({ name: "", profession: "" });
                  }}
                >
                  <i className="fa fa-plus"></i> Add New
                </button>
              </div>
            </div>
          </div>
          {users.length > 0 ? (
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Name</th>
                  <th>Profession</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <>
                  {users.map((user, index) => {
                    return (
                      <User
                        key={user._id}
                        index={index}
                        user={user}
                        deleteUser={deleteUser}
                        editUser={editUser}
                      />
                    );
                  })}
                </>
              </tbody>
            </table>
          ) : (
            <div class="alert alert-secondary empty-book-message" role="alert">
              Your users list is currently empty. Add some users to start
              browsing!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
