import { useEffect, useState } from "react";
import { useApi } from "../useApi";
import { mapDemanda } from "../../mappers/demanda.mapper";

export function useGetDemands() {
  const [data] = useApi({ url: "/demandas" });
  const [demandas, setDemandas] = useState();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (data) {
      setDemandas(data.map(mapDemanda));
      setLoaded(true);
    }
  }, [data]);

  return [demandas, loaded];
}
