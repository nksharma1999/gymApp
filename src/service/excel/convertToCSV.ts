export const convertToCSV = (data: any) => {
  const csvRows = [];
  const headers = Object.keys(data[0]).join(',');
  csvRows.push(headers);

  data.forEach((row: {[s: string]: unknown} | ArrayLike<unknown>) => {
    const values = Object.values(row).join(',');
    csvRows.push(values);
  });

  return csvRows.join('\n');
};
