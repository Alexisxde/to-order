"use client"
import { Button } from "@/components/ui/button"
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogHeader,
	DialogTrigger
} from "@/components/ui/dialog"
import {
	DragDrawer,
	DragDrawerContent,
	DragDrawerTrigger
} from "@/components/ui/drag-draw"
import {
	Modal,
	ModalClose,
	ModalContent,
	ModalHeader,
	ModalPortal,
	ModalTrigger
} from "@/components/ui/modal"
import {
	MorphingDialog,
	MorphingDialogClose,
	MorphingDialogContainer,
	MorphingDialogContent,
	MorphingDialogTrigger
} from "@/components/ui/morphing-dialog"
import {
	MorphingPopover,
	MorphingPopoverContent,
	MorphingPopoverTrigger
} from "@/components/ui/morphing-popover"
import { useToast } from "@/components/ui/toast"
import { motion } from "motion/react"
import { useState } from "react"

export default function AppPage() {
	const { toast } = useToast()
	const [isOpen, setIsOpen] = useState(false)
	const [isOpen2, setIsOpen2] = useState(false)
	const [openDraw, setOpenDraw] = useState(false)

	return (
		<section className="flex flex-col p-4 md:p-6">
			<div className="flex items-center justify-start gap-2">
				<Button
					variant={"outline"}
					onClick={() => toast.default({ text: "Toast" })}>
					Open Toast
				</Button>

				<DragDrawer isOpen={openDraw} setIsOpen={setOpenDraw}>
					<DragDrawerTrigger>Open Drawer</DragDrawerTrigger>
					<DragDrawerContent>
						Hola
						<Button
							variant={"outline"}
							onClick={() => toast.default({ text: "Toast" })}>
							Open Toast
						</Button>
					</DragDrawerContent>
				</DragDrawer>

				<Modal isOpen={isOpen} setIsOpen={setIsOpen}>
					<ModalTrigger>Open Modal</ModalTrigger>
					<ModalPortal>
						<ModalContent>
							<ModalHeader>
								<div />
								<ModalClose />
							</ModalHeader>
							<div className="flex h-[200px] w-[300px] flex-col gap-2"></div>
						</ModalContent>
					</ModalPortal>
				</Modal>

				<MorphingDialog>
					<MorphingDialogTrigger>Open Morphing Dialog</MorphingDialogTrigger>
					<MorphingDialogContainer>
						<MorphingDialogContent className="h-[98dvh] w-[98vw] lg:h-[95dvh]">
							<MorphingDialogClose />
						</MorphingDialogContent>
					</MorphingDialogContainer>
				</MorphingDialog>

				<Dialog isOpen={isOpen2} setIsOpen={setIsOpen2}>
					<DialogTrigger variant={"outline"}>Open DropDown</DialogTrigger>
					<DialogContent className="bg-background border-border ring-muted/25 border shadow-xs ring">
						<DialogHeader>
							Test
							<DialogClose />
						</DialogHeader>
					</DialogContent>
				</Dialog>

				<MorphingPopover>
					<MorphingPopoverTrigger asChild>
						<Button variant="outline">
							<motion.span
								layoutId="morphing-popover-basic-label"
								layout="position">
								Open popover
							</motion.span>
						</Button>
					</MorphingPopoverTrigger>
					<MorphingPopoverContent className="z-50 w-80 p-4 shadow-sm">
						<div className="grid gap-4">
							<div className="space-y-2">
								<motion.h4
									layoutId="morphing-popover-basic-label"
									layout="position"
									className="leading-none font-medium">
									Dimensions
								</motion.h4>
								<p className="text-muted-foreground text-sm">
									Set the dimensions for the layer.
								</p>
							</div>
							<div className="grid gap-2"></div>
						</div>
					</MorphingPopoverContent>
				</MorphingPopover>
			</div>
		</section>
	)
}
