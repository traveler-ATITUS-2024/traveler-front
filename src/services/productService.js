import api from "./api";

export const getProducts = async (token) => {
  try {
    const response = await api.get("/api/products", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return { erro: false, data: response.data };
  } catch (error) {
    console.error("Erro ao buscar produtos:", error);
    return {
      erro: true,
      mensagem: error.response?.data?.message || "Erro ao buscar produtos.",
    };
  }
};

export const createProduct = async (product, token) => {
  try {
    const response = await api.post("/api/products", product, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return { erro: false, data: response.data };
  } catch (error) {
    console.error("Erro ao criar produto:", error);
    return {
      erro: true,
      mensagem: error.response?.data?.message || "Erro ao criar produto.",
    };
  }
};

export const updateProduct = async (id, product, token) => {
  try {
    const response = await api.put(`/api/products/${id}`, product, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return { erro: false, data: response.data };
  } catch (error) {
    console.error("Erro ao atualizar produto:", error);
    return {
      erro: true,
      mensagem: error.response?.data?.message || "Erro ao atualizar produto.",
    };
  }
};

export const deleteProduct = async (id, token) => {
  try {
    await api.delete(`/api/products/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return { erro: false, mensagem: "Produto deletado com sucesso." };
  } catch (error) {
    console.error("Erro ao deletar produto:", error);
    return {
      erro: true,
      mensagem: error.response?.data?.message || "Erro ao deletar produto.",
    };
  }
};
