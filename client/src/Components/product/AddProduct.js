import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useDispatch } from 'react-redux';
import {useNavigate} from 'react-router-dom'
import { addproduct } from './../../js/actions/productActions';

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Movie App
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function AddProd() {
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const [img,setimg]=React.useState("");
  const [product, setproduct] = React.useState({
    title: "", 
    description: "",
    category: "",
    price: 0,
    qteS: 0,
  });
  const handleChange = (e) => {
    setproduct({ ...product, [e.target.name]: e.target.value });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
  // const prod={...product,disponible:product.qteS?true:false}
    const data = new FormData(event.currentTarget);
    console.log({
      title: data.get('title'),
      price: data.get('price'),
      description: data.get('description'),
      qteS: data.get('qteS'),
      category: data.get('category'),
      img: data.get('file'),
    });
    data.append("disponible",product.qteS?true:false)
     dispatch(addproduct(data,navigate))
    setproduct({
      title: "", 
      description: "",
      category: "",
      price: 0,
      qteS: 0,
    })
    setimg("")
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Add New Movie
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={5}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="title"
                  label="Title"
                  name="title"
                  onChange={handleChange}
                  value={product.title}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="description"
                  label="Description"
                  name="description"
                  onChange={handleChange}
                  value={product.description}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="price"
                  type="number"
                  label="Rating"
                  name="price"
                  onChange={handleChange}
                  value={product.price}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="qteS"
                  label="Video URL"
                  type="Video URL"
                  id="qteS"
                  value={product.qteS}
                  onChange={handleChange}
                />
                </Grid>
                <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="file"
                  label="Image"
                  type="file"
                  id="file"
                  onChange={(e)=>setimg(e.target.files[0])}
                />
                <Box sx={{ minWidth: 120 }} style={{ margin: 20 }}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Category
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="category"
                      value={product.category}
                      label="Category"
                      onChange={handleChange}
                      name="category"
                      required
                    >
                      <MenuItem value={"Action"}>Action</MenuItem>
                      <MenuItem value={"Comedy"}>Comedy</MenuItem>
                      <MenuItem value={"Adventure"}>Adventure</MenuItem>
                      <MenuItem value={"Horror"}>Horror</MenuItem>
                      <MenuItem value={"Arabic"}>Arabic</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </Grid>

              {/* <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="Check if Product is disponible"
                />
              </Grid> */}
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              ADD
            </Button>
            <Grid container justifyContent="flex-end"></Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}