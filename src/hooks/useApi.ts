import { useEffect, useState } from "react";
import { api } from "../api/axios";

type axiosApiRequestMapping = "GET" | "POST" | "DELETE" | "PATCH";

const axiosApiRequestCallbackMap: Record<
  axiosApiRequestMapping,
  CallableFunction
> = {
  GET: api.get,
  POST: api.post,
  DELETE: api.delete,
  PATCH: api.patch,
};

/**
 * Realiza uma requisição para a API, retornando sua resposta dependendo de seus parâmetros inseridos
 * @param url URL da API
 * @returns [data, loading]
 */
export function useApi({
  url,
  method = "GET",
}: {
  url: string;
  method?: axiosApiRequestMapping;
}) {
  const [data, setData] = useState<any>();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const load = async () => {
      const res = await axiosApiRequestCallbackMap[method](url);

      // Eu não sei muito bem como a API do axios funciona em relação ao seu comportamento em relação com as chamadas (talvez seja tudo a mesma coisa mas ok),
      // então eu deixei algo mais genérico e um pouco mais "flexível" ao mesmo tempo para lidar com o comportamento da API
      switch (method) {
        case "GET":
          setData(res.data);
          break;
      }

      setLoaded(true);
    };
    load();
  }, []);

  return [data, loaded];
}
