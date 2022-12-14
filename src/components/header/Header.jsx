import React from "react";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { useContext } from "react";
import { Context } from "../../context/Context";
import { HiOutlineMenu } from "react-icons/hi";
import MenuBar from "../menuBar/MenuBar";
import Menu from "../../../Menu";
import "./header.css";

export default function Header({ ban }) {
  const { mode, changeMode, menuNone, stateMenu } = useContext(Context);

  const style = document.documentElement.style;

  const root = document.getElementById("root");

  mode == "dark"
    ? (style.setProperty(
        "--image",
        'url("https://i.ibb.co/kQZ260V/tasking-Blanco.png")'
      ),
      style.setProperty("--colorLetra", "rgb(0, 0, 0)"))
    : (style.setProperty(
        "--image",
        'url("https://i.ibb.co/h89BLcF/tasking.png")'
      ),
      style.setProperty("--colorLetra", "rgb(150, 150, 150)"));

  stateMenu == "false"
    ? (style.setProperty("--left", "0"),
      setTimeout(() => {
        root.setAttribute("style", "display:none");
      }, 1000))
    : (style.setProperty("--left", "-2000rem"), root.removeAttribute("style"));

  return (
    <header>
      {ban ? (
        <Menu>
          <MenuBar />{" "}
        </Menu>
      ) : (
        (ban = false)
      )}

      {ban ? (
        <button onClick={menuNone} className="menu">
          {<HiOutlineMenu />}
        </button>
      ) : (
        (ban = false)
      )}

      <div onClick={() => window.location = "/"} className="logo-contain">
        <span className="image"></span>
        <p className="letra">Tasking</p>
      </div>

      <button className="mode" onClick={changeMode}>
        {mode == "dark" ? <MdDarkMode /> : <MdLightMode />}
      </button>
    </header>
  );
}
