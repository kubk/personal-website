import { Container } from "@/app/_components/container";
import { Header } from "@/app/_components/header";

export default function Index() {
  return (
    <main>
      <Header />
      <Container>
        <div className="py-16 sm:text-center">
          <h1 className="mb-4 text-3xl sm:text-4xl tracking-tight text-slate-900 font-extrabold ">
            Egor Gorbachev
          </h1>
          <h2 className="text-lg text-slate-600">
            I write about building software. Previously at X, and Y.
          </h2>
        </div>
      </Container>
    </main>
  );
}
