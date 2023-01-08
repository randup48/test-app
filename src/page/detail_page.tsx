import { Delete } from "@mui/icons-material";
import Backdrop from "@mui/material/Backdrop/Backdrop";
import Button from "@mui/material/Button/Button";
import ButtonGroup from "@mui/material/ButtonGroup/ButtonGroup";
import CircularProgress from "@mui/material/CircularProgress/CircularProgress";
import Divider from "@mui/material/Divider/Divider";
import IconButton from "@mui/material/IconButton/IconButton";
import Pagination from "@mui/material/Pagination/Pagination";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux/es/hooks/useDispatch";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useParams } from "react-router-dom";
import { modalAddPost } from "../components/modal";
import { headerTablePost } from "../constant/constant";
import { ResourcePost } from "../data/resource";
import { PostsUser } from "../model/posts";
import { Users } from "../model/users";
import { setBody, setTitle } from "../redux/field_add_post";
import { getDetailUsers } from "../redux/load_detail_user";
import { getPosts } from "../redux/load_table_post";
import { AppDispatch, RootState } from "../redux/store";
import "../style/detail.scss";

const DetailPage = () => {
  const { id } = useParams();

  const [modalBuatPost, setBuatPost] = useState(false);
  const handleBuatPost = () => setBuatPost(!modalBuatPost);

  // redux set value add post
  const fieldPost: PostsUser = useSelector(
    (state: RootState) => state.setFieldAddPost
  );
  const dispatchFieldPost = useDispatch<AppDispatch>();

  // redux load detail user
  const dataUser: Users | undefined = useSelector(
    (state: RootState) => state.loadDetailDataUser.value
  );
  const dispatchDetailData = useDispatch<AppDispatch>();

  // redux load data table
  const dataPosts: PostsUser[] | undefined = useSelector(
    (state: RootState) => state.loadDataPosts.value
  );
  const loading: boolean = useSelector(
    (state: RootState) => state.loadDataPosts.isLoading
  );
  const dispatchLoad = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatchDetailData(getDetailUsers(id ?? ""));
    dispatchLoad(getPosts(id ?? ""));
  }, [dispatchDetailData, dispatchLoad, id]);

  const handleAddPost = async (posts: PostsUser) => {
    await ResourcePost.postPosts(posts);
    handleBuatPost();
    dispatchDetailData(getDetailUsers(id ?? ""));
  };
  return (
    <div className="Detail">
      {/* loading */}
      {!loading ? null : (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
      <h3>Detail Pengguna</h3>

      <section id="Identitas">
        <div>
          <p>Nama</p>
          <p>: {dataUser?.name ?? "-"}</p>
        </div>
        <div>
          <p>Gender</p>
          <p>: {dataUser?.gender ?? "-"}</p>
        </div>
        <div>
          <p>Email</p>
          <p>: {dataUser?.email ?? "-"}</p>
        </div>
      </section>

      <main>
        <section>
          <h3>Daftar Pengguna</h3>

          <Button onClick={handleBuatPost} variant="contained">
            Buat Post Baru
          </Button>
        </section>

        {/* popup */}
        {modalAddPost({
          openModal: modalBuatPost,
          closeModal: handleBuatPost,
          ontap: async () => {
            handleAddPost({
              user_id: id!,
              title: fieldPost.title,
              body: fieldPost.body,
            });
          },
          field: {
            id_user: id!,
            title: fieldPost.title,
            fieldTitle: (event: React.ChangeEvent<HTMLInputElement>) => {
              dispatchFieldPost(setTitle(event.target.value));
            },
            body: fieldPost.body,
            fieldBody: (event: React.ChangeEvent<HTMLInputElement>) => {
              dispatchFieldPost(setBody(event.target.value));
            },
          },
        })}

        {/* table */}
        {dataPosts!.length && dataPosts !== undefined ? (
          <section id="TablePost">
            <div id="HeaderTable">
              {headerTablePost.map((e) => (
                <p>{e.headerName}</p>
              ))}
            </div>

            <div id="BodyTable">
              {dataPosts.map((dataTable, index) => (
                <div>
                  <article key={index}>
                    <p>{dataTable.title}</p>
                    <p>{dataTable.body}</p>

                    <ButtonGroup
                      variant="outlined"
                      aria-label="outlined button group"
                    >
                      <IconButton aria-label="delete">
                        <Delete sx={{ color: "red" }} />
                      </IconButton>
                    </ButtonGroup>
                  </article>
                  {index + 1 !== dataPosts.length ? <Divider light /> : null}
                </div>
              ))}
            </div>
          </section>
        ) : (
          <p>Data belum tersedia, silahkan buat data baru</p>
        )}

        {dataPosts!.length && dataPosts !== undefined ? (
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
};

export default DetailPage;
