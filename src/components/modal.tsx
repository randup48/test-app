import Box from "@mui/material/Box/Box";
import Button from "@mui/material/Button/Button";
import FormControl from "@mui/material/FormControl/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel/FormControlLabel";
import FormLabel from "@mui/material/FormLabel/FormLabel";
import Modal from "@mui/material/Modal/Modal";
import Radio from "@mui/material/Radio/Radio";
import RadioGroup from "@mui/material/RadioGroup/RadioGroup";
import TextField from "@mui/material/TextField/TextField";

export function modalDelete(param: paramModalDelete) {
  return (
    <Modal
      open={param.openModal}
      onClose={param.closeModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        component="form"
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "400px",
          bgcolor: "background.paper",
          p: "24px 32px",
          borderRadius: "10px",
          margin: "0 auto",
          textAlign: "center",
        }}
        noValidate
        autoComplete="off"
      >
        <h3 style={{ marginBottom: "24px", width: "30ch" }}>
          Apakah anda yakin ingin menghapus data "{param.name}"?
        </h3>

        <div
          style={{
            display: "grid",
            gap: "16px",
            gridTemplateColumns: "1fr 1fr",
          }}
        >
          <Button onClick={param.closeModal}>Batal</Button>
          <Button
            onClick={param.ontap}
            variant="contained"
            sx={{ alignSelf: "flex-start" }}
          >
            Hapus User
          </Button>
        </div>
      </Box>
    </Modal>
  );
}

export function modalAddUser(param: paramModalAddUser) {
  return (
    <Modal
      open={param.openModal}
      onClose={param.closeModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        component="form"
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "50vw",
          bgcolor: "background.paper",
          p: "24px 32px",
          borderRadius: "10px",
        }}
        noValidate
        autoComplete="off"
      >
        <h3 style={{ gridColumn: "1/3" }}>Pengguna Baru</h3>
        <FormControl
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(2,1fr)",
            gap: "30px",
            my: "26px",
          }}
        >
          <TextField
            required
            id="standard-required"
            label="Nama"
            value={param.field.name}
            variant="standard"
            onChange={param.field.fieldName}
          />
          <TextField
            required
            id="standard-required"
            label="E-mail"
            value={param.field.email}
            variant="standard"
            onChange={param.field.fieldEmail}
          />
          <div>
            <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-radio-buttons-group-label"
              value={param.field.gender}
              name="radio-buttons-group"
              onChange={param.field.fieldGender}
            >
              <FormControlLabel value="male" control={<Radio />} label="Male" />
              <FormControlLabel
                value="female"
                control={<Radio />}
                label="Female"
              />
            </RadioGroup>
          </div>
          <div>
            <FormLabel id="demo-radio-buttons-group-label">Status</FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-radio-buttons-group-label"
              value={param.field.status}
              name="radio-buttons-group"
              onChange={param.field.fieldStatus}
            >
              <FormControlLabel
                value="active"
                control={<Radio />}
                label="Aktif"
              />
              <FormControlLabel
                value="inActive"
                control={<Radio />}
                label="Tidak Aktif"
              />
            </RadioGroup>
          </div>
        </FormControl>
        <Button
          onClick={
            param.ontap
            //   async () => {
            //   handleAddUser({
            //     name: nameUser,
            //     email: emailUser,
            //     gender: genderUser,
            //     status: statusUser,
            //   });
            // }
          }
          variant="contained"
          sx={{ alignSelf: "flex-start" }}
        >
          Tambah Pengguna
        </Button>
      </Box>
    </Modal>
  );
}

export function modalAddPost(params: paramModalAddPost) {
  return (
    <Modal
      open={params.openModal}
      onClose={params.closeModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        component="form"
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "50vw",
          bgcolor: "background.paper",
          p: "24px 32px",
          borderRadius: "10px",
        }}
        noValidate
        autoComplete="off"
      >
        <h3 style={{ gridColumn: "1/3" }}>Post</h3>
        <FormControl
          sx={{
            // display: "grid",
            // gridTemplateColumns: "repeat(2,1fr)",
            // gap: "30px",
            display: "block",
            my: "26px",
          }}
        >
          <TextField
            sx={{ width: "100%", mb: "24px" }}
            required
            id="outlined-basic"
            label="Title"
            variant="outlined"
            value={params.field.title}
            onChange={params.field.fieldTitle}
          />
          <TextField
            sx={{ width: "100%" }}
            required
            id="outlined-multiline-static"
            label="Body"
            multiline
            rows={4}
            value={params.field.body}
            onChange={params.field.fieldBody}
          />
        </FormControl>
        <Button
          onClick={
            params.ontap
            //   async () => {
            //   handleAddPost({
            //     user_id: id!,
            //     title: titlePost,
            //     body: bodyPost,
            //   });
            // }
          }
          variant="contained"
          sx={{ alignSelf: "flex-start" }}
        >
          Tambah Post
        </Button>
      </Box>
    </Modal>
  );
}

interface paramModal {
  openModal: boolean;
  closeModal: () => void;
  ontap: () => void;
}

interface paramModalDelete extends paramModal {
  name: string;
}
interface paramModalAddUser extends paramModal {
  field: UserField;
}

interface paramModalAddPost extends paramModal {
  field: PostField;
}

interface UserField {
  name: string;
  fieldName: (event: React.ChangeEvent<HTMLInputElement>) => void;
  email: string;
  fieldEmail: (event: React.ChangeEvent<HTMLInputElement>) => void;
  gender: string;
  fieldGender: (event: React.ChangeEvent<HTMLInputElement>) => void;
  status: string;
  fieldStatus: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

interface PostField {
  id_user: string;
  title: string;
  fieldTitle: (event: React.ChangeEvent<HTMLInputElement>) => void;
  body: string;
  fieldBody: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
