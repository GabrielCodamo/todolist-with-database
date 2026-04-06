import { BookCheck, Calendar, Info, ListChecks } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { Table, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";

import { getTaskItem } from "./_data_acess/getItemsTask";
import { TaskData } from "../taslitem/components/tabledata/taskdata";


interface TaskItemProps {
  status: string | undefined;
  search: string | undefined;
}

export async function TaskItem({ status, search }: TaskItemProps) {

  const data = await getTaskItem()

  const searchParamsStatus = status

  const searchParamsSearch = search

  return (
    <Card className="mt-5 w-full pt-0 pb-1 bg-[#0f0f0ff9] rounded-b-sm">
      <CardContent className="px-0 ">
        <Table>
          <TableHeader >
            <TableRow className="bg-muted/20 hover:bg-muted/20 border-b-transparent">
              <TableHead className="w-12"></TableHead>
              <TableHead className="font-semibold text-[#ffffffe4]">
                <div className="flex items-center gap-1.5 text-[#ffffffe4]">
                  <BookCheck className="h-4 w-4 text-[#ffffffe4]" />
                  Tarefa
                </div>
              </TableHead>
              <TableHead className="font-semibold">
                <div className="flex items-center gap-1.5 text-[#ffffffe4]">
                  <Info className="h-4 w-4 text-[#ffffffe4]" />
                  Status
                </div>
              </TableHead>
              <TableHead className="font-semibold">
                <div className="flex items-center gap-1.5 text-[#ffffffe4]">
                  <ListChecks className="h-4.5 w-4.5 text-[#ffffffe4]" />
                  Categoria
                </div>
              </TableHead>
              <TableHead className="font-semibold">
                <div className="flex items-center gap-1.5 text-[#ffffffe4]">
                  <Calendar className="h-4 w-4 text-[#ffffffe4]" />
                  Data
                </div>
              </TableHead>
              <TableHead className="font-semibold">
                <div className="flex items-center gap-1.5 text-[#ffffffe4]">
                  <Calendar className="h-4 w-4 text-[#ffffffe4]" />
                  Prazo
                </div>
              </TableHead>
              <TableCell className="w-12"></TableCell>
            </TableRow>
          </TableHeader>
          <TaskData data={data.tasks ?? []} searchParamsTask={searchParamsStatus} search={searchParamsSearch} />
        </Table>
      </CardContent>
    </Card >
  )
}
