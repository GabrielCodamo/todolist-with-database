import { ListTodo } from "lucide-react"

export default function Headers() {
  return (
    <div className="w-full max-w-lg lg:max-w-4xl">
      <div className="flex items-center justify-center gap-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-700">
          <ListTodo className=" h-5 w-5 primary-foreground " />
        </div>
        <h1 className="text-2xl font-bold sm:text-3xl text-[#ffffffe4]">Lista de Tarefas</h1>
      </div>
      <div className="flex justify-center mt-2">
        <span className="font-medium text-[#ffffffe0]/50">Organize e acompanhe suas atividades diárias</span>
      </div>
    </div>
  )
}