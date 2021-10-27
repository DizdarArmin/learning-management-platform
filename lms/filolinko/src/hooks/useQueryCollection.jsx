import { useCallback, useEffect, useState } from "react";
import { getQueryCollection } from "../scripts/fireStore";

export default function useQueryCollection(collectionName, id, reload) {
  const [collection, setCollection] = useState([]);
  const [collectionLoading, setLoading] = useState(false);

  const fetchData = useCallback(async (path, id) => {
    try {
      const data = await getQueryCollection(path, id);
      setCollection(data);
      setLoading(true);
    } catch {
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData(collectionName, id);
  }, [collectionName, reload]);

  return { collection, collectionLoading };
}
