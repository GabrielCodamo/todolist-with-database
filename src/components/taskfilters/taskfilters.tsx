"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent, useState } from "react";


export function TaskFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const pathname = usePathname()

  // Pega o filtro atual da URL ou define como "Todas" por padrão
  const currentFilter = searchParams.get("status") || "Todas"
  const search = searchParams.get("search")

  const [searchValue, setSearchValue] = useState(search || "")


  // const [activeIndex, setActiveIndex] = useState<number>(0);

  const filters = ["Todas" as const, "Concluidas" as const, "Pendentes" as const, "Atrasadas" as const]


  function handleFilter(filter: string) {
    const params = new URLSearchParams(searchParams)
    if (filter !== "Todas") {
      params.set("status", filter)
    } else {
      params.delete("status")
    }
    // Atualiza a URL, o que faz o Next.js re-renderizar os Server Components
    router.replace(`${pathname}?${params.toString()}`)
  }

  function handleSearchFilter(e: ChangeEvent<HTMLInputElement>) {
    const term = e.target.value
    setSearchValue(term)

    const params = new URLSearchParams(searchParams)
    if (term) {
      params.set("search", term)
    } else {
      params.delete("search")
    }
    router.replace(`${pathname}?${params.toString()}`)
  }

  const statusColors = {
    Todas: "bg-blue-700 hover:bg-blue-700",
    Concluidas: "bg-emerald-700 hover:bg-emerald-700",
    Pendentes: "bg-yellow-700 hover:bg-yellow-700",
    Atrasadas: "bg-red-700 hover:bg-red-700"
  }
  const hoverStatus = { Todas: "hover:bg-blue-700", Concluidas: "hover:bg-emerald-700", Pendentes: "hover:bg-yellow-700", Atrasadas: " hover:bg-red-700" }


  return (
    <div className="flex flex-col items-center md:flex-row gap-2 w-70 md:w-[836] max-w-lg lg:max-w-4xl justify-between">
      <div className="flex gap-2  justify-center max-[640px]:justify-center flex-wrap">
        {
          filters.map((filter) => (
            <div key={filter}>
              <Button
                onClick={() => handleFilter(filter)}
                // onClick={() => filterTasks(index)}
                className={
                  currentFilter === filter
                    ? ` ${statusColors[filter]} text-[#ffffffe4] h-9.5 w-[99.2]`
                    : `bg-[#0F0F0F]  text-[#ffffffe4] h-9.5 w-[99.2] ${hoverStatus[filter]}`}
              >{filter}
              </Button>
            </div>
          ))
        }
      </div>
      <div className="flex items-center gap-2">
        <div className="relative flex-1 sm:w-75 md:w-69">
          <Search className="absolute left-3 top-1/2 h-5 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Buscar tarefas..."
            className="pl-9 bg-[#0F0F0F] h-9.5 w-full border-[#ffffffe0]/50 placeholder:text-muted-foreground"
            value={searchValue}
            onChange={handleSearchFilter}
          />
        </div>
      </div>
    </div >
  )
}
