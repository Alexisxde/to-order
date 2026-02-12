import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function FolderCardSkeleton() {
  return (
    <Card>
      <CardContent className="flex justify-between">
        <CardHeader className="cursor-pointer flex flex-col w-full p-0">
          <CardTitle className="flex items-center gap-2 font-medium">
            <Skeleton className="size-5 rounded" />
            <Skeleton className="h-4 w-32" />
          </CardTitle>
          <CardDescription className="text-xs">
            <Skeleton className="h-3 w-24" /> 
          </CardDescription>
        </CardHeader>
        <Button variant="ghost" size="icon">
          <Skeleton className="size-5 rounded" />
        </Button>
      </CardContent>
    </Card>
  )
}
