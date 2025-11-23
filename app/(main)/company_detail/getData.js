export const getCompany = async (id) => {
  try {
    const respone = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_PORT}api/company/get_one/?id=${id}`,
      { cache: "no-store" }
    );

    if (!respone.ok) {
      throw new Error(respone.status);
    }

    return await respone.json();
  } catch (err) {
    console.log(err);
    return {};
  }
};
