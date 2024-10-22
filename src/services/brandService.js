import api from "./api";

export const getBrands = async (token) => {
  try {
    const response = await api.get("/api/brands", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return { erro: false, data: response.data };
  } catch (error) {
    console.error("Erro ao buscar marcas:", error);
    return {
      erro: true,
      mensagem: error.response?.data?.message || "Erro ao buscar marcas.",
    };
  }
};

export const createBrand = async (brand, token) => {
  try {
    const response = await api.post("/api/brands", brand, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return { erro: false, data: response.data };
  } catch (error) {
    console.error("Erro ao criar marca:", error);
    return {
      erro: true,
      mensagem: error.response?.data?.message || "Erro ao criar marca.",
    };
  }
};

export const updateBrand = async (id, brand, token) => {
  try {
    const response = await api.put(`/api/brands/${id}`, brand, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return { erro: false, data: response.data };
  } catch (error) {
    console.error("Erro ao atualizar marca:", error);
    return {
      erro: true,
      mensagem: error.response?.data?.message || "Erro ao atualizar marca.",
    };
  }
};

export const deleteBrand = async (id, token) => {
  try {
    await api.delete(`/api/brands/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return { erro: false, mensagem: "Marca deletada com sucesso." };
  } catch (error) {
    console.error("Erro ao deletar marca:", error);
    return {
      erro: true,
      mensagem: error.response?.data?.message || "Erro ao deletar marca.",
    };
  }
};
