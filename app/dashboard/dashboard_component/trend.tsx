import useFilterData from "@/app/store/useFilterData";
import { TTrend } from "@/app/types/types";
import { useQuery } from "@tanstack/react-query";
import querystring from "querystring";

const TrendPage = () => {
  const { filterData, parseFilterData } = useFilterData();
  const cleanFilterData = parseFilterData(filterData) || {};
  const queryParamsString = querystring.stringify(cleanFilterData);

  const { data, isFetching, error } = useQuery<TTrend[]>({
    queryKey: ["trend", queryParamsString],
    queryFn: () =>
      fetch("http://localhost:3000/api/trend?" + queryParamsString, {
        cache: "no-store",
      }).then((res) => res.json()),
  });

  console.log("tren:", data);

  return <div>TrendPage</div>;
};
export default TrendPage;
