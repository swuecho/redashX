import { useEffect, useState, useMemo } from "react";
import { get, find } from "lodash";
import axios from "axios";

const REDASH_BASE_URL = "";
const USER_API_KEY = "mmaDqcIgA7qjQlqYmQLsXCQugXxhaeeCK9agLg8b";

const axiosOptions = {
  headers: { Authorization: `Key ${USER_API_KEY}` }
};

export function useRedashQueries() {
  const [loading, setLoading] = useState(true);
  const [queries, setQueries] = useState([]);

  useEffect(() => {
    axios
      .get(`${REDASH_BASE_URL}/api/queries`, axiosOptions)
      .then(({ data }) => {
        setQueries(
          get(data, "results", []).filter(
            query => query && query.latest_query_data_id
          )
        );
        setLoading(false);
      });
  }, []);

  return [queries, loading];
}

export function useRedashQueryData(queryId) {
  const [data, setData] = useState();
  useEffect(() => {
    if (queryId) {
      axios
        .get(`${REDASH_BASE_URL}/api/queries/${queryId}/results`, axiosOptions)
        .then(({ data }) => setData(get(data, "query_result.data")));
    }
  }, [queryId]);

  return useMemo(() => data, [data]);
}


export function useRedashPlot(queryId, plotId) {
  const [data, setData] = useState();
  useEffect(() => {
    if (plotId && queryId) {
      // curl 'http://192.168.0.135/api/visualizations/41' \

      axios
        .get(`${REDASH_BASE_URL}/api/queries/${queryId}`, axiosOptions)
        .then(({ data }) => setData(find(get(data, `visualizations`), { id: plotId })));
    }
  }, [queryId, plotId]);

  return useMemo(() => data, [data]);
}

// TODO; get query id from query 