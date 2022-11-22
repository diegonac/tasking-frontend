import "./login.css";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useContext } from "react";
import { Context } from "../../context/Context";



export default function Login() {
 
 const navigate = useNavigate();

 const { setToken } = useContext(Context);

  function create() {
    navigate("/create-user");
  }

  const style = document.documentElement.style;

  style.setProperty("--heightRoot", "100vh");
  style.setProperty("--minHeightRoot", "620px");

  function login() {
    const email = document.getElementById("input-email").value;
    const password = document.getElementById("input-password").value;
    const error = document.getElementById("error");
    const user = axios.post(
      "https://tasking-app.herokuapp.com/api/v1/auth/login",
      {
        username: `${email}`,
        password: `${password}`,
      }
    );
    user
      .then((res) => {
        console.log(res.data);
        if (res.data.token) {
          localStorage.setItem("token", `${res.data.token}`);
          setToken(res.data.token);
          return navigate("/");
        }
      })
      .catch((e) => {
        console.log(e.response);
        if (e.response.status == 400) {
          error.textContent = `Ingrese su email y contraseña`;
        } else if (e.response.status == 401 || 404) {
          error.textContent = `Contraseña incorrecta`;
        }
      });
  }

  return (
    <>
      <Header />

      <main className="main-login">
        <div className="main-login__login">
          <input id="input-email" type={"email"} placeholder="Email" />
          <input
            id="input-password"
            type={"password"}
            placeholder="Contraseña"
          />
          <button className="button" onClick={login}>
            Iniciar sesión
          </button>
          <p id="error"></p>
        </div>

        <Link className="main-login__link-rp" to="/recovery-password">
          ¿Olvidaste tu contraseña?
        </Link>

        <div className="main-login__create-user">
          <h3>¿Aún no tienes un usuario?</h3>
          <button className="button" onClick={create}>
            Crear usuario
          </button>
        </div>
      </main>

      <Footer />
    </>
  );
}
