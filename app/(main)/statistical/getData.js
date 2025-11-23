export const getInfoChart = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_PORT}api/statistical/info_chart/`
    );
    if (!response.ok) {
      console.error(response.statusText);
      return {};
    }
    const responseValue = await response.json();
    if (responseValue.status === "Success") return responseValue;
    return {};
  } catch (err) {
    console.log(err);
    return {};
  }
};
