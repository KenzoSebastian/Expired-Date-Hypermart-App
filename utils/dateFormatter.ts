export const formatDate = (date: Date | null | undefined): string => {
  if (!date) return "N/A";
  const dateRaw = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const arrayDate = dateRaw.split(",").join("").split(" ");
  return `${arrayDate[1]} ${arrayDate[0]} ${arrayDate[2]}`;
};
