import { useEffect, useState } from "react";
import { useApi } from "../useApi";
import { mapDemandaUnica } from "../../mappers/demanda.mapper";

export function useGetDemandById({ id }: { id: number }) {
  const [data] = useApi({ url: `/demandas/${id}` });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [demanda, setDemanda] = useState<any>();

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (data) {
      setDemanda(mapDemandaUnica(data));
      setLoaded(true);
    }
  }, [data]);

  return [demanda, loaded];
}
