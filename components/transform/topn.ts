import { sektor } from "@/constant/initialData";

export const MapTopn = (
  cy: {
    sum: number;
    map: string;
  }[],
  py: {
    sum: number;
    map: string;
  }[],
  n: number
) => {
  cy.sort((a, b) => b.sum - a.sum);
  const topncy = cy.slice(0, n);
  const restSum_cy = cy.slice(n).reduce((acc, curr) => acc + curr.sum, 0);

  const lainnya_cy = {
    sum: restSum_cy,
    map: "Lainnya",
  };

  topncy.push(lainnya_cy);

  const topnpy = py.filter((pys) => {
    const match = topncy.find((topncyObj) => topncyObj.map === pys.map);
    return match !== undefined;
  });

  const restSum_py = py
    .filter((py_item) => topnpy.some((toppy_item) => py_item !== toppy_item))
    .reduce((acc, curr) => acc + curr.sum, 0);
  const lainnya_py = {
    sum: restSum_py,
    map: "Lainnya",
  };

  topnpy.push(lainnya_py);

  const topnCySektor = topncy.map((item) => ({
    ...item,
  }));
  const topnPySektor = topnpy.map((item) => ({
    ...item,
  }));
  return { cy: topnCySektor, py: topnPySektor };
};

export const SektorTopn = (
  cy: {
    sum: number;
    kd_kategori: string;
  }[],
  py: {
    sum: number;
    kd_kategori: string;
  }[],
  n: number
) => {
  cy.sort((a, b) => b.sum - a.sum);
  const topncy = cy.slice(0, n);
  const restSum_cy = cy.slice(n).reduce((acc, curr) => acc + curr.sum, 0);

  const lainnya_cy = {
    sum: restSum_cy,
    kd_kategori: "Lainnya",
  };

  topncy.push(lainnya_cy);

  const topnpy = py.filter((pys) => {
    const match = topncy.find(
      (topncyObj) => topncyObj.kd_kategori === pys.kd_kategori
    );
    return match !== undefined;
  });

  const restSum_py = py
    .filter((py_item) => topnpy.some((toppy_item) => py_item !== toppy_item))
    .reduce((acc, curr) => acc + curr.sum, 0);
  const lainnya_py = {
    sum: restSum_py,
    kd_kategori: "Lainnya",
  };

  topnpy.push(lainnya_py);

  const topnCySektor = topncy.map((item) => ({
    ...item,
    nm_sektor:
      sektor.find((label) => label.value === item.kd_kategori)?.label ||
      "Lainnya",
  }));
  const topnPySektor = topnpy.map((item) => ({
    ...item,
    nm_sektor:
      sektor.find((label) => label.value === item.kd_kategori)?.label ||
      "Lainnya",
  }));
  // console.log("topcy:", topnCySektor);
  // console.log("toppy:", topnPySektor);
  return { cy: topnCySektor, py: topnPySektor };
};

export const SektorSingkat = (
  data: { kd_kategori: string | null }[]
): { kd_kategori: string | null; nm_sektor: string | null }[] => {
  const mergedSektor = data.map((item) => ({
    ...item,
    nm_sektor:
      sektor.find((label) => label.value === item.kd_kategori)?.label ||
      "Lainnya",
  }));

  return mergedSektor;
};
