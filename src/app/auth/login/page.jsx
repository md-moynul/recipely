import LoginPage from "./LoginPage";

export default async function Page({ searchParams }) {
  const params = await searchParams;

  return (
    <LoginPage
      redirectBy={params?.redirectBy || "/"}
    />
  );
}