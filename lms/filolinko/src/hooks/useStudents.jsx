import { useCallback, useEffect, useState } from "react";
import { getStudents } from "../scripts/fireStore";

export default function useStudents(collectionName, role, reload) {
  const [collection, setCollection] = useState([]);
  const [collectionLoading, setLoading] = useState(false);

  const fetchData = useCallback(async (path, role) => {
    try {
      const data = await getStudents(path, role);
      setCollection(data);
      setLoading(true);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData(collectionName, role);
  }, [fetchData, collectionName, role, reload]);

  return { collection, collectionLoading };
}
