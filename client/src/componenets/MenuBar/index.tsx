import { Menubar } from "primereact/menubar";
import { useNavigate, useLocation } from "react-router-dom";
import "./MenuBar.css";

const MenuBar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const items = [
    {
      label: "Recipes",
      icon: "pi pi-book",
      command: () => navigate("/recipes"),
      className:
        location.pathname === "/recipes" || location.pathname === "/"
          ? "p-menuitem-active"
          : "",
    },
    {
      label: "Ingredients",
      icon: "pi pi-list",
      command: () => navigate("/ingredients"),
      className:
        location.pathname === "/ingredients" ? "p-menuitem-active" : "",
    },
  ];

  return <Menubar model={items} className="mb-4" />;
};

export default MenuBar;
