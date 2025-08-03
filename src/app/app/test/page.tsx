import {
	MorphingDialog,
	MorphingDialogClose,
	MorphingDialogContainer,
	MorphingDialogContent,
	MorphingDialogTitle,
	MorphingDialogTrigger
} from "@/components/ui/morphing-dialog"

export default function MorphingDialogPage() {
	return (
		<div className="p-4">
			<MorphingDialog
				transition={{ type: "spring", stiffness: 200, damping: 24 }}>
				<MorphingDialogTrigger
					style={{ borderRadius: "4px" }}
					className="bg-foreground border-muted border">
					<div className="flex items-center space-x-3 p-3">
						<div className="flex flex-col items-start justify-center space-y-0">
							<MorphingDialogTitle className="text-primary text-[10px] font-medium sm:text-xs">
								About
							</MorphingDialogTitle>
						</div>
					</div>
				</MorphingDialogTrigger>
				<MorphingDialogContainer>
					<MorphingDialogContent
						style={{ borderRadius: "12px" }}
						className="bg-foreground border-muted relative h-[98dvh] w-[98vw] border lg:h-[95dvh]">
						<div className="relative p-6">
							<div>
								<MorphingDialogTitle className="text-primary">
									About
								</MorphingDialogTitle>
							</div>
						</div>
						<MorphingDialogClose className="hover:text-primary text-zinc-500 transition-colors duration-150 ease-in" />
					</MorphingDialogContent>
				</MorphingDialogContainer>
			</MorphingDialog>
		</div>
	)
}
