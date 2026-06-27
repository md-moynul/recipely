import RegisterPage from "./RegisterPage";

export default async function Page({ searchParams }) {
  const params = await searchParams;

  return (
    <RegisterPage
      redirectBy={params?.redirectBy || "/"}
    />
  );
}