import useFilterData from "@/app/store/useFilterData";
import querystring from "querystring";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const KPI = () => {
  const { filterData, parseFilterData } = useFilterData();

  const cleanFilterData = parseFilterData(filterData) || {};

  const queryParamsString = querystring.stringify(cleanFilterData);
  console.log("KPI:", queryParamsString);

  return (
    <section className="flex flex-col justify-center items-center gap-1  w-full h-full mx-auto bg-background-primary">
      <Card>
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <CardDescription>Card Description</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Card Content</p>
        </CardContent>
        <CardFooter>
          <p>Card Footer</p>
        </CardFooter>
      </Card>

      <div className="flex justify-center items-center w-full h-full ">
        <p>sdfsd</p>
      </div>
    </section>
  );
};
export default KPI;
