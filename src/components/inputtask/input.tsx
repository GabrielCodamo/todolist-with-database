"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CalendarIcon, Plus } from "lucide-react"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { Calendar } from "../ui/calendar"
import { createTask } from "./_actions/createTask"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useEffect } from "react"
import { updateTask } from "./_actions/updateTask"


const taskSchema = z.object({
  taskName: z.string().min(5, { message: "O nome deve ter pelo menos 5 caracteres" }),
  category: z.string().min(4, { message: "Categoria tem que possuir no mínimo 4 caracteres" }),
  status: z.enum(["COMPLETED", "PENDING", "LATE"], {
    error: "Status sempre vem como pendente",
  }),
  dueDate: z.date().refine((date) => !isNaN(date.getTime()), {
    message: "Data inválida",
  })
})



type TaskFormData = z.infer<typeof taskSchema>;

interface chaveProps {
  chave: string | undefined
}

export function TaskInput({ chave }: chaveProps) {

  const router = useRouter()
  const searchParams = useSearchParams()
  const pathname = usePathname()

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue, // Limpa valores dos campos
    clearErrors, // Limpa os erros
    control,// Necessário para controlar o componente de Calendário
  } = useForm<TaskFormData>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      taskName: "",
      category: "",
      status: "PENDING",
      dueDate: new Date(),
    },
  });


  // função que reseta o formulário
  function resetForm() {
    // Usa setValue em cada campo individualmente com { shouldValidate: false }
    // para não acionar o resolver — evita o Zod transformar new Date() em string
    setValue("taskName", "", { shouldValidate: false, shouldDirty: false })
    setValue("category", "", { shouldValidate: false, shouldDirty: false })
    setValue("status", "PENDING", { shouldValidate: false, shouldDirty: false })
    setValue("dueDate", new Date(), { shouldValidate: false, shouldDirty: false })

    clearErrors()
  }

  async function onSubmit(data: TaskFormData) {

    if (chave) {
      try {
        await updateTask({
          chave: chave,
          category: data.category,
          taskName: data.taskName,
          dueDate: data.dueDate,
          status: data.status
        })

        resetForm()

        const params = new URLSearchParams(searchParams)

        params.delete("chave")

        router.replace(`${pathname}?${params.toString()}`)

      } catch (error) {
        console.log(`Nao foi possível enviar os dados para serem atualizados ${error}`)
      }
    } else {
      try {
        await createTask({
          nameTask: data.taskName,
          category: data.category,
          status: data.status,
          dueDate: data.dueDate,
        })

        resetForm()

        router.refresh()
      } catch (err) {
        console.log(`error ao criar tarefa ${err}`)
      }
    }
  }

  useEffect(() => {

    if (!chave) return;

    const getFetchData = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_HOST_URL}/api/search`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json", // Indica que estamos enviando JSON
          },
          body: JSON.stringify({ id: chave }), // Transforma o objeto JS em string JSON
        });

        const { category, taskName, dueDate } = await response.json()

        if (!response.ok) {
          console.warn("Resposta da rede não foi sucesso");
          return;
        }

        if (chave) {
          // Seta os valores nos campos desejados
          setValue("category", category, { shouldValidate: true });
          setValue("taskName", taskName, { shouldValidate: true });
          setValue("dueDate", new Date(dueDate), { shouldValidate: true });
        }
      } catch (err) {
        console.error("Erro no fetch:", err);
      }
    }

    getFetchData()
  }, [chave, setValue]); // Executa sempre que a 'chave' mudar


  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col md:flex-row gap-3.5 w-full">
        <div className="flex flex-col w-full">
          <div className={`flex items-center gap-2 rounded-lg border bg-[#0F0F0F] border-[#ffffffe0]/50 p-2 w-full
            ${errors.category ? "border-red-500/80" : "border-[#ffffffe0]/50"}
            `}>
            <Input
              type="text"
              className="bg-transparent border-0 focus:border-0 focus-visible:ring-0"
              placeholder="Categoria..."
              {...register("category")}
            />
            <div className="flex items-center gap-1 border-l border-border pl-2">
              <Controller
                control={control}
                name="dueDate"
                render={({ field }) => (
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        type="button"
                        className={`${field.value &&
                          'bg-blue-700  hover:bg-blue-500 rounded-lg text-white'
                          }`}
                      >
                        <CalendarIcon className="h-4 w-4 text-[#ffffffe4] " />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 bg-[#0F0F0F] text-[#ffffffe4] " align="end">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        // pega datas novas 
                        disabled={(date) => date < new Date()}
                        onSelect={(selectedDate) => {
                          if (selectedDate) field.onChange(selectedDate)
                        }}
                      />

                    </PopoverContent>
                  </Popover>
                )}
              />
            </div>
          </div>
          {errors.category?.message && (
            <p className="mt-1 text-xs text-red-500">{errors.category.message}</p>
          )}
        </div>
        <div className=" md:w-[109%]">
          <div className={`flex items-center gap-2 rounded-lg border bg-[#0F0F0F] border-[#ffffffe0]/50 p-2  
          ${errors.taskName ? "border-red-500/80" : "border-[#ffffffe0]/50"}`}>
            <Input
              type="text"
              {...register("taskName")}
              placeholder="Adicionar nova tarefa..."
              className="text-[#ffffffe4] border-0 bg-transparent placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0"
            />
            <div className=" flex justify-center items-center">
              <Button
                type="submit"
                size="icon"
                className="hover:cursor-pointer h-9 w-9 shrink-0 bg-blue-700 rounded-lg hover:bg-blue-500"
              >
                <Plus className="" />
              </Button>
            </div>
          </div>
          {errors.taskName?.message && (
            <p className="mt-1 text-xs text-red-500">{errors.taskName.message}</p>
          )}
        </div>
      </div>
    </form>
  )
}

// comando para entregar dara em ptBr

{/* {field.value ? (
                    format(field.value, "PPP", { locale: ptBR })
                  ) : (h-9 w-9 hover:cursor-pointer shrink-0 bg-blue-700 rounded-lg hover:bg-blue-500
                    <span>Selecione uma data</span>
                  )} */}