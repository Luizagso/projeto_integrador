import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Container, Dropdown } from "react-bootstrap";
import { useAuth } from "../../context/AuthContext";
import { BsGraphUpArrow } from "react-icons/bs";
import { CiShoppingTag } from "react-icons/ci";
import { TbArrowsTransferDown } from "react-icons/tb";
import { BsFileEarmarkRuled } from "react-icons/bs";
import { IoNotificationsOutline } from "react-icons/io5";
import "./NavigationBar.css"; // Importe o arquivo CSS
import api from "../../services/api";

export default function NavigationBar() {
  const { isAuthenticated, logout } = useAuth();
  const [name, setName] = React.useState("");
  const [unreadCount, setUnreadCount] = React.useState(0);
  const [previousUnreadCount, setPreviousUnreadCount] = React.useState(0);
  const [showNotificationEffect, setShowNotificationEffect] = React.useState(false);

  async function fetchUserData() {
    try {
      const response = await api.get("/usuarios");
      setName(response?.data?.nome);
    } catch (error) {
      console.error("Erro ao buscar dados do usuário", error);
    }
  }

  async function fetchUnreadNotifications() {
    try {
      const response = await api.get("/notificacao/all");
      const unread = response.data.filter((notif: any) => !notif.lida).length;
      
      // Verifica se o número de notificações aumentou
      if (unread > previousUnreadCount && previousUnreadCount !== 0) {
        setShowNotificationEffect(true);
        // Remove o efeito após 1 segundo
        setTimeout(() => setShowNotificationEffect(false), 500);
      }
      
      setPreviousUnreadCount(unreadCount);
      setUnreadCount(unread);
    } catch (error) {
      console.error("Erro ao buscar notificações", error);
    }
  }

  // Função para atualizar notificações a cada 10 segundos
  React.useEffect(() => {
    fetchUserData();
    if (isAuthenticated) {
      fetchUnreadNotifications();
      
      // Configura um intervalo para atualizar as notificações
      const interval = setInterval(() => {
        fetchUnreadNotifications();
      }, 500); // 10 segundos (reduzido de 30 para melhor experiência)
      
      // Limpa o intervalo quando o componente for desmontado
      return () => clearInterval(interval);
    }
  }, [isAuthenticated, unreadCount, previousUnreadCount]);

  return (
    <Navbar expand="lg" className="custom-navbar">
      <Container>
        <Navbar.Brand
          as={Link}
          to="/dashboard"
          className="d-flex align-items-center"
        >
          <img src="./logo-navbar.png" alt="Castor Financeiro Logo" className="navbar-logo" />{" "}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto">
            {isAuthenticated ? (
              <>
                <Nav.Link as={Link} to="/dashboard">
                  <BsGraphUpArrow className="mb-1 me-1" /> Dashboard
                </Nav.Link>
                <Nav.Link as={Link} to="/categorias">
                  <CiShoppingTag className="mb-1" size={20} /> Categorias
                </Nav.Link>
                <Nav.Link as={Link} to="/transacoes">
                  <TbArrowsTransferDown className="mb-1" /> Transações
                </Nav.Link>
                <Nav.Link as={Link} to="/relatorios">
                  <BsFileEarmarkRuled className="me-1 mb-1" />
                  Relatórios
                </Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/login">
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to="/register">
                  Registro
                </Nav.Link>
              </>
            )}
          </Nav>

          {isAuthenticated && (
            <Nav className="mx-3 position-relative">
              <Nav.Link as={Link} to="/notificacao" className="d-flex align-items-center position-relative notification-bell">
                <IoNotificationsOutline 
                  size={24} 
                  className={`${unreadCount > 0 ? "bell-animation" : ""} ${showNotificationEffect ? "new-notification" : ""}`} 
                />
                {unreadCount > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger notification-badge" 
                        style={{ fontSize: '0.6rem', padding: '0.25em 0.4em' }}>
                    {unreadCount}
                  </span>
                )}
              </Nav.Link>
            </Nav>
          )}

          <Dropdown title={"Usuário"} id="basic-nav-dropdown">
            <Dropdown.Toggle
              className="d-flex align-items-center"
              variant="light"
              id="dropdown-basic"
            >
              <p className="mb-0 me-2 d-flex">{name}</p>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item as={Link} to="/usuario">
                Perfil
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item as={Link} to="/notificacao">
                Notificações
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item onClick={logout}>Sair</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}