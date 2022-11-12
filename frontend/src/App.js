import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [contactList, setContactList] = useState([]);
  const [editId, setEditId] = useState(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  // const API_PATH  = "http://localhost:8080";
  const API_PATH = "https://app-ddxluknoaq-as.a.run.app";

  useEffect(() => {
    handleGet();
  }, []);

  useEffect(() => {
    if (editId) {
      let newList = contactList.map((item) => {
        if (item._id == editId) {
          return { name: name, phone: phone };
        } else {
          return item;
        }
      });
      setContactList(newList);
    }
  }, [editId, name, phone]);

  const handleEdit = (item) => {
    setName(item.name);
    setPhone(item.phone);
    setEditId(item._id);
  };

  const handleGet = async () => {
    await axios
      .get(API_PATH + "/api/contacts")
      .then((res) => {
        setContactList(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleAdd = async () => {
    await axios
      .post(API_PATH + "/api/contacts", {
        name: name,
        phone: phone,
      })
      .then((res) => {
        console.log(res);

        setName("");
        setPhone("");
        handleGet();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleUpdate = async () => {
    await axios
      .put(
        API_PATH + "/api/contacts",
        {
          name: name,
          phone: phone,
        },
        { params: { contact_id: editId } }
      )
      .then((res) => {
        console.log(res);
        handleGet();
        setName("");
        setPhone("");
        setEditId(null);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDelete = async (id) => {
    await axios
      .delete(API_PATH + "/api/contacts", {
        data: {
          contact_id: id,
        },
      })

      .then((res) => {
        console.log(res);
        handleGet();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="App">
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <div
          className="d-flex justify-content-center align-items-start flex-column"
          style={{
            border: "1px solid grey",
            width: "300px",
          }}
        >
          <div className="input-group mb-0">
            <input
              type="text"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Contact name"
              aria-label="Contact name"
              aria-describedby="basic-addon2"
            />
          </div>
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Phone number"
              aria-label="Phone number"
              aria-describedby="basic-addon2"
            />
            <div className="input-group-append">
              <button
                onClick={() => {
                  editId ? handleUpdate() : handleAdd();
                }}
                className="btn btn-outline-primary"
                type="button"
              >
                {editId ? "Confirm" : "Add"}
              </button>
            </div>
          </div>
          <ol
            className="list-group list-group-flush container list-group-numbered"
            style={{ padding: 0 }}
          >
            {contactList.map((item) => (
              <li
                className={`list-group-item d-flex align-items-center justify-content-between`}
                key={item._id}
              >
                <div className="d-flex flex-column align-items-start ms-3 container">
                  <div className="fw-bold">{item.name}</div>
                  {item.phone}
                </div>
                <div className="d-flex flex-column align-self-end">
                  <div
                    onClick={() => handleEdit(item)}
                    className="link-primary"
                  >
                    edit
                  </div>
                  <div
                    onClick={() => handleDelete(item._id)}
                    className="link-secondary"
                  >
                    delete
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}

export default App;
