import { AlertCircle, CheckCircle2, Clock, ListTodo } from "lucide-react";
import { Card } from "../ui/card";


interface StatCardProps {
  icon: React.ReactNode
  label: string
  value: number
  color: string
}

function Task({ icon, label, value, color }: StatCardProps) {
  return (
    <div className="">
      <Card className="flex w-full lg:w-50 flex-row items-center gap-3 rounded-lg border border-[#ffffffe0]/50 p-4 bg-[#0F0F0F]">
        <div className={`rounded-lg p-2 ${color}`}>{icon}</div>
        <div>
          <p className="text-2xl text-[#ffffffe4] font-semibold ">{value}</p>
          <p className="text-xs text-[#ffffffe0]/50">{label}</p>
        </div>
      </Card >
    </div>
  )

}


export async function TaskStats() {


  const url = `${process.env.NEXT_PUBLIC_HOST_URL}/api/tasks`
  const getTask = await fetch(url, { next: { tags: ['tasks-stats'] } })
  const { total, completed, pending, late } = await getTask.json()

  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-2 lg:grid-cols-4  w-full max-w-lg lg:max-w-4xl">
      <Task
        icon={<ListTodo className="h-5 w-5 text-[#ffffffe4]" />}
        label="Total"
        value={total.length}
        color="bg-blue-700"
      />
      <Task
        icon={<CheckCircle2 className="h-5 w-5 text-emerald-400" />}
        label="Concluídas"
        value={completed.length}
        color="bg-emerald-500/20"
      />
      <Task
        icon={<Clock className="h-5 w-5 text-yellow-400" />}
        label="Pendentes"
        value={pending.length}
        color="bg-yellow-500/20"
      />
      <Task
        icon={<AlertCircle className="h-5 w-5 text-red-400" />}
        label="Atrasadas"
        value={late.length}
        color="bg-red-500/20"
      />
    </div>
  )
}
