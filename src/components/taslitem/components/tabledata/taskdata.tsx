"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { TableBody, TableCell, TableRow } from "@/components/ui/table"
import { formatDate } from "@/utils/format.currency"
import { Check, Circle, Plus, Trash2 } from "lucide-react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { deleteTask } from "../../_actions/deleteTask"
import { mutationStatus } from "../../_actions/mutationStatus"
import { DataProps } from "@/types/tasks"


const formatSlug = (text: string) => {
  return text.replace(/-/g, ' ');
}

interface DynamicTaskProps {
  data: DataProps[]
  searchParamsTask: string | undefined
  search: string | undefined
}


export function TaskData({ data, searchParamsTask, search }: DynamicTaskProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const pathname = usePathname()


  function TaskTradutor(status: string) {

    switch (status) {
      case "PENDING":
        return <Badge
          variant="outline"
          className={`  
            bg-yellow-500/20 text-yellow-400 border-yellow-500/30 
            `}
        >
          pendente
        </Badge>

      case "COMPLETED":
        return <Badge
          variant="outline"
          className={`  
          bg-emerald-500/20 text-emerald-400 border-emerald-500/30
          `}
        >
          completo
        </Badge>

      case "LATE":
        return <Badge
          variant="outline"
          className={`  
          bg-red-500/20 text-red-400 border-red-500/30 
          `}
        >
          atrasado
        </Badge>
    }
  }

  function handleClickDelete(id: string) {
    deleteTask(id)
    router.refresh()
  }

  function handleMutatedStatus(id: string) {
    mutationStatus(id)
    router.refresh()
  }


  function handleClickPlus(id: string) {
    const params = new URLSearchParams(searchParams)
    if (id) {
      params.set("chave", id)
    } else {
      params.delete("chave")
    }
    router.replace(`${pathname}?${params.toString()}`)
  }

  // const getFilteredData = () => {

  //   if (search) {
  //     if ((searchParams === "Atrasadas")) {
  //       return data.filter((task) => task.taskName.toLowerCase().includes(search.toLowerCase()) &&
  //         task.status === "LATE")
  //     } else if ((searchParams === "Concluidas")) {
  //       return data.filter((task) => task.taskName.toLowerCase().includes(search.toLowerCase()) &&
  //         task.status === "COMPLETED")
  //     } else if ((searchParams === "Pendentes")) {
  //       return data.filter((task) => task.taskName.toLowerCase().includes(search.toLowerCase()) &&
  //         task.status === "PENDING")
  //     }

  //     return data.filter((task) => task.taskName.toLowerCase().includes(search.toLowerCase()))
  //   }

  //   switch (searchParams) {
  //     case "Concluidas":
  //       return data.filter((task) => task.status === "COMPLETED")
  //     case "Pendentes":
  //       return data.filter((task) => task.status === "PENDING")
  //     case "Atrasadas":
  //       return data.filter((task) => task.status === "LATE")
  //     default:
  //       return data
  //   }
  // }


  const getFilteredData = () => {
    let filteredData = data;

    if (searchParamsTask) {
      // Responsável por pegar o valor do searchParams
      const statusMap: { [key: string]: string } = {
        "Concluidas": "COMPLETED",
        "Pendentes": "PENDING",
        "Atrasadas": "LATE",
      };
      const statusToFilter = statusMap[searchParamsTask];
      if (statusToFilter) {
        filteredData = filteredData.filter((task) => task.status === statusToFilter);
      }
    }

    if (search) {
      filteredData = filteredData.filter((task) =>
        task.taskName.toLowerCase().includes(search.toLowerCase())
      );
    }

    return filteredData;
  }

  const tasksToRender = getFilteredData()

  return (
    <>
      {
        tasksToRender.map((task) => (
          <TableBody key={task.id} className="bg-[#0F0F0F] hover:bg-transparent">
            <TableRow className=" hover:bg-[#0F0F0F] group transition-all duration-200 ">
              <TableCell>
                <div className="flex">
                  <Button
                    onClick={() => handleMutatedStatus(task.id)}
                    className={`"flex w-5 h-6 items-center justify-center rounded-full border-2 transition-all duration-200  cursor-pointer border-bg-[#0F0F0F]
           ${task.status !== "COMPLETED" ? "hover:border-emerald-600" : "border-emerald-600"}`}>
                    {
                      task.status !== "COMPLETED" ?
                        <Circle className="h-3.5 w-3.5 text-[#ffffffe4] opacity-0 group-hover:opacity-30" />
                        :
                        <Check className="h-3.5 w-3.5 text-emerald-600" />
                    }
                  </Button>
                </div>
              </TableCell>
              <TableCell className="text-[#ffffffe4]">
                <div className="flex gap-3 items-center ">
                  {
                    task.status !== "COMPLETED" ?
                      formatSlug(task.taskName)
                      :
                      <div className="text-muted-foreground line-through decoration-muted-foreground/50">
                        {formatSlug(task.taskName)}
                      </div>
                  }
                </div>
              </TableCell>
              <TableCell className="text-[#ffffffe4] pl-3">
                {
                  TaskTradutor(task.status)
                }
              </TableCell>
              <TableCell className="capitalize text-[#ffffffe4] pl-3">
                {task.category}
              </TableCell>
              <TableCell className="text-[#ffffffe4]">
                {
                  formatDate(task.createdAt)
                }
              </TableCell>
              <TableCell className="text-[#ffffffe4]">
                {
                  formatDate(task.dueDate)
                }
              </TableCell>
              <TableCell>
                <div className="flex gap-4 justify-center items-center">
                  <Button
                    size="icon"
                    onClick={() => handleClickPlus(task.id)}

                    className="h-6 w-6 hover:cursor-pointer hover:bg-transparent bg-transparent shrink-0 rounded-lg "
                  >
                    <Plus className="hidden text-[#ffffffe4] bg-transparent hover:bg-transparent group-hover:block" />
                  </Button>
                  <Button
                    onClick={() => handleClickDelete(task.id)}
                    className="h-6 w-6 bg-transparent hover:bg-transparent cursor-pointer">
                    <Trash2 className="hidden hover:bg-transparent text-red-800 group-hover:block" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        ))
      }
    </>
  )
}

