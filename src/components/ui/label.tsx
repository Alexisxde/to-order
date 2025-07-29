import { cn } from "@/lib/utils"
import * as React from "react"

interface Props extends React.ComponentPropsWithRef<"label"> {
	required?: boolean
}

export const Label = ({ className, children, required, ...props }: Props) => {
	return (
		<label className={cn("text-xs", className)} {...props}>
			{children}
			{/* <span
				className={cn(
					"text-primary mb-4 ml-1 rounded-sm px-1.5 py-0.5 text-[10px] leading-none font-medium select-none",
					required ? "bg-red-500" : "bg-muted"
				)}>
				{required ? "required" : "optional"}
			</span> */}
		</label>
	)
}
