import Headers from "@/components/headers/headers";
import { TaskInput } from "@/components/inputtask/input";
import { TaskStats } from "@/components/taskcard/task"
import { TaskFilters } from "@/components/taskfilters/taskfilters";
import { TaskItem } from "@/components/taslitem/taskitem";


export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string, search?: string, chave?: string }>
}) {


  const { status, search, chave } = await searchParams

  return (
    <main className="flex flex-col items-center px-4 mt-10">
      <Headers />
      <section className="flex flex-col justify-center items-center mt-8 ">
        <TaskStats />
        <div className="w-full max-w-lg lg:max-w-4xl mt-5">
          <TaskInput chave={chave} />
        </div>
      </section>
      <section className="flex flex-col items-center w-[836] justify-center mt-5">
        <TaskFilters />
        <div className="mb-10 w-full max-w-lg lg:max-w-4xl">
          <TaskItem status={status} search={search} />
        </div>
      </section>
    </main>
  );
}
