export const getNotify = async (token) => {
  try {
    if (!token) return [];
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_PORT}api/notify/get/`,
      { method: "GET", headers: { cookie: `accessToken=${token}` } }
    );
    if(!response.ok){ console.error(response.statusText); return []}
    const responseValue = await response.json()
    if(responseValue.status === "Success") return responseValue.notify
    return []
  } catch (err) {
    console.log(err)
    return []
  }
};
