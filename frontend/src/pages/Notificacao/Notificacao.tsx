// src/pages/Notificacao/NotificacaoList.tsx
import { useState, useEffect } from "react";
import { Spinner, ListGroup, Button } from "react-bootstrap";
import { LuRefreshCcw } from "react-icons/lu";
import api from "../../services/api";
import Template from "../../components/Template/Template";
import CustomAlert from "../../components/CustomAlert/CustomAlert";

interface Notificacao {
  id: number;
  titulo: string;
  mensagem: string;
  lida: boolean;
  tipo: string;
  createdAt: string;
}

export default function NotificacaoList() {
  const [notificacoes, setNotificacoes] = useState<Notificacao[]>([]);
  const [alert, setAlert] = useState({ show: false, message: "", type: "" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadNotificacoes();
  }, []);

  const loadNotificacoes = async () => {
    setLoading(true);
    try {
      const response = await api.get("/notificacao/all");
      setNotificacoes(response.data);
    } catch (error) {
      setAlert({
        show: true,
        message: "Erro ao carregar notificações",
        type: "danger",
      });
    } finally {
      setLoading(false);
    }
  };

  const marcarComoLida = async (id: number) => {
    try {
      await api.patch(`/notificacao/${id}/lida`);
      loadNotificacoes();
    } catch (error) {
      setAlert({
        show: true,
        message: "Erro ao marcar notificação como lida",
        type: "danger",
      });
    }
  };

  const getBackgroundColor = (notificacao: Notificacao) => {
    if (!notificacao.lida) return "#fff8e1"; // amarelo bem claro para não lida
    return "#f1f3f5"; // cinza muito claro para lida
  };

  const getBorderColor = (tipo: string) => {
    switch (tipo) {
      case "SUCCESS":
        return "#a3e635"; // verde claro
      case "INFO":
        return "#60a5fa"; // azul claro
      case "WARNING":
        return "#facc15"; // amarelo claro
      case "ERROR":
        return "#f87171"; // vermelho claro
      default:
        return "#6c757d"; // cinza padrão
    }
  };

  return (
    <Template>
      <div className="container mt-5">
        <CustomAlert
          show={alert.show}
          dismissible
          message={alert.message}
          type={alert.type}
          onClose={() => setAlert({ show: false, message: "", type: "" })}
        />

        {/* Cabeçalho com título e botão de atualizar */}
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2>Notificações</h2>
          <Button onClick={loadNotificacoes}>
            <div className="d-flex align-items-center">
              <LuRefreshCcw className="me-2" />
              Atualizar
            </div>
          </Button>
        </div>

        {loading ? (
          <div className="text-center mt-4">
            <Spinner animation="border" />
          </div>
        ) : notificacoes.length === 0 ? (
          <p className="text-center mt-4 text-muted">Nenhuma notificação encontrada.</p>
        ) : (
          <ListGroup>
            {notificacoes.map((n) => (
              <ListGroup.Item
                key={n.id}
                style={{
                  backgroundColor: getBackgroundColor(n),
                  borderLeft: `5px solid ${getBorderColor(n.tipo)}`,
                  marginBottom: "8px",
                  borderRadius: "5px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  padding: "1rem",
                }}
              >
                <div style={{ flex: 1, marginRight: "1rem" }}>
                  <strong>{n.titulo}</strong>
                  <p className="mb-0">{n.mensagem}</p>
                </div>
                <div className="text-end" style={{ minWidth: "120px" }}>
                  <small className="d-block text-muted mb-2">
                    {new Date(n.createdAt).toLocaleString()}
                  </small>
                  {!n.lida && (
                    <Button
                      size="sm"
                      variant="outline-primary"
                      onClick={() => marcarComoLida(n.id)}
                    >
                      Marcar como lida
                    </Button>
                  )}
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </div>
    </Template>
  );
}
