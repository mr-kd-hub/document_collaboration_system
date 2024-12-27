import TextEditor from "../components/TextEditor/TextEditor";

export default function Home() {
  return (
    <div className="w-full grid grid-rows-[20px_1fr_20px] justify-items-center p-8 pb-20  font-[family-name:var(--font-geist-sans)]">
      <main className="w-full flex flex-col row-start-2 items-center sm:items-start">
       <TextEditor />
      </main>
    </div>
  );
}
