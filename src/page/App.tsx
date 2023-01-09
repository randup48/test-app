import "../style/App.scss";
import Button from "@mui/material/Button/Button";
import ButtonGroup from "@mui/material/ButtonGroup/ButtonGroup";
import IconButton from "@mui/material/IconButton/IconButton";
import { Delete, Edit, Visibility } from "@mui/icons-material";
import { Users } from "../model/users";
import type { AppDispatch, RootState } from "../redux/store";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getUsers, reset } from "../redux/load_table_user";
import Divider from "@mui/material/Divider/Divider";
import Backdrop from "@mui/material/Backdrop/Backdrop";
import CircularProgress from "@mui/material/CircularProgress/CircularProgress";
import Pagination from "@mui/material/Pagination/Pagination";
import { headerTableUser } from "../constant/constant";
import { ResourceUser } from "../data/resource";
import { Link } from "react-router-dom";
import { modalAddUser, modalDelete } from "../components/modal";
import {
  setEmail,
  setGender,
  setId,
  setName,
  setStatus,
} from "../redux/field_user";
import { getDetailUsers } from "../redux/load_detail_user";

function App() {
  const [updateData, setUpdateData] = useState(true);

  const [modalBuatEditUser, setModalBuatEditUser] = useState(false);
  const handelModalBuatEditUser = () =>
    setModalBuatEditUser(!modalBuatEditUser);

  const [modalHapusUser, setModalHapusUser] = useState(false);
  const handelModalHapusUser = () => setModalHapusUser(!modalHapusUser);

  // redux load data table
  const dataListUser: Users[] | undefined = useSelector(
    (state: RootState) => state.loadDataUser.value
  );
  const loading: boolean = useSelector(
    (state: RootState) => state.loadDataUser.isLoading
  );
  // redux load detail user
  const dataUser: Users | undefined = useSelector(
    (state: RootState) => state.loadDetailDataUser.value
  );

  // redux set value add user
  const fieldUser: Users = useSelector(
    (state: RootState) => state.setFieldAddUser
  );

  const dispatchLoad = useDispatch<AppDispatch>();

  useEffect(() => {
    if (updateData) {
      dispatchLoad(getUsers());
    }
    setUpdateData(false);
  }, [updateData, setUpdateData, dispatchLoad]);

  const handleAddUser = async (user: Users) => {
    if (user.name !== "" && user.email !== "") {
      await ResourceUser.postUser(user);
      dispatchLoad(getUsers());
    }
    handelModalBuatEditUser();
    setUpdateData(true);
  };
  const handleEditUser = async (user: Users) => {
    if (user.name !== "" && user.email !== "") {
      await ResourceUser.putUser(user);
      dispatchLoad(getUsers());
    }
    handelModalBuatEditUser();
    setUpdateData(true);
  };

  const handleDeleteUser = async (user_id: string) => {
    await ResourceUser.deleteUser(user_id);
    dispatchLoad(reset());
    dispatchLoad(getUsers());

    handelModalHapusUser();
    setUpdateData(true);
  };

  return (
    <div className="App">
      {/* loading */}
      {!loading ? null : (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      )}

      {/* content */}
      <main>
        <section>
          <h3>Daftar Pengguna</h3>

          <Button onClick={handelModalBuatEditUser} variant="contained">
            Buat Pengguna Baru
          </Button>
        </section>

        {/* popup */}
        {modalAddUser({
          openModal: modalBuatEditUser,
          closeModal: handelModalBuatEditUser,
          ontap: async () => {
            handleAddUser({
              name: fieldUser.name,
              email: fieldUser.email,
              gender: fieldUser.gender,
              status: fieldUser.status,
            });
          },
          field: {
            name: fieldUser.name,
            fieldName: (event: React.ChangeEvent<HTMLInputElement>) => {
              dispatchLoad(setName(event.target.value));
            },
            email: fieldUser.email,
            fieldEmail: (event: React.ChangeEvent<HTMLInputElement>) => {
              dispatchLoad(setEmail(event.target.value));
            },
            gender: fieldUser.gender,
            fieldGender: (event: React.ChangeEvent<HTMLInputElement>) => {
              dispatchLoad(setGender(event.target.value));
            },
            status: fieldUser.status,
            fieldStatus: (event: React.ChangeEvent<HTMLInputElement>) => {
              dispatchLoad(setStatus(event.target.value));
            },
          },
        })}

        {/* pop up delete */}
        {modalDelete({
          name: fieldUser.name,
          openModal: modalHapusUser,
          closeModal: handelModalHapusUser,
          ontap: async () => {
            handleDeleteUser(fieldUser.id ?? "");
          },
        })}

        {/* table */}
        {dataListUser!.length && dataListUser !== undefined ? (
          <section id="TableUser">
            <div id="HeaderTable">
              {headerTableUser.map((e) => (
                <p>{e.headerName}</p>
              ))}
            </div>

            <div id="BodyTable">
              {dataListUser.map((dataTable, index) => (
                <div>
                  <article key={index}>
                    <p>{dataTable.id}</p>
                    <p>{dataTable.name}</p>
                    <p>{dataTable.email}</p>
                    <p>{dataTable.gender}</p>
                    <p>{dataTable.status}</p>

                    <ButtonGroup
                      variant="outlined"
                      aria-label="outlined button group"
                    >
                      <Link to={`/detail/${dataTable.id}`}>
                        <IconButton aria-label="view">
                          <Visibility sx={{ color: "orange" }} />
                        </IconButton>
                      </Link>
                      <IconButton
                        aria-label="update"
                        onClick={() => {
                          dispatchLoad(getDetailUsers(dataTable.id ?? ""));
                          handelModalBuatEditUser();
                        }}
                      >
                        <Edit sx={{ color: "blue" }} />
                      </IconButton>
                      <IconButton
                        aria-label="delete"
                        onClick={() => {
                          dispatchLoad(setId(dataTable.id ?? ""));
                          dispatchLoad(setName(dataTable.name));
                          handelModalHapusUser();
                        }}
                      >
                        <Delete sx={{ color: "red" }} />
                      </IconButton>
                    </ButtonGroup>
                  </article>
                  {index + 1 !== dataListUser.length ? <Divider light /> : null}
                </div>
              ))}
            </div>
          </section>
        ) : (
          <p>Data belum tersedia, silahkan buat data baru</p>
        )}

        {dataListUser!.length && dataListUser !== undefined ? (
          <Pagination
            count={5}
            siblingCount={0}
            showFirstButton
            showLastButton
          />
        ) : null}
      </main>
    </div>
  );
}

export default App;
