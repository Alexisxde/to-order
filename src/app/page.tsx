import Footer from "@/components/footer"
import Hero from "@/components/hero"
import { ListTodo, MonitorCog, NotebookPen, Palette } from "lucide-react"

export default function HomePage() {
	const items = [
		{
			icon: <NotebookPen className="size-5" />,
			title: "Notas rápidas",
			description:
				"Toma notas al instante. Al entrar en la aplicación, tendrás un recuadro listo para escribir."
		},
		{
			icon: <ListTodo className="size-5" />,
			title: "Lista de Tareas",
			description:
				"Un sistema de lista de tareas simple y funcional. Organizá y marcá tus objetivos fácimente."
		},
		{
			icon: <MonitorCog className="size-5" />,
			title: "Multiplataforma",
			description:
				"Usable en cualquier dispositivo, ya sea que prefieras una computadora, tablet o teléfono."
		},
		{
			icon: <Palette className="size-5" />,
			title: "Personalización",
			description:
				"Adaptá la aplicación a tu estilo con temas y colores. Cambiá la apariencia según tu preferencia."
		}
	]

	return (
		<>
			<section className="flex h-dvh flex-col gap-4 p-4">
				<header></header>
				<Hero />
				<Footer />
			</section>
			<section className="mb-6 flex flex-col gap-4 p-6">
				<h2 className="mt-2 text-center text-6xl">
					Tan simple como bien hecha
				</h2>
				<div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-4">
					{items.map(({ icon, title, description }, index) => (
						<article key={index} className="bg-card flex gap-2 rounded-md p-4">
							<div>
								<div className="bg-accent rounded-full p-2">{icon}</div>
							</div>
							<div className="flex flex-col gap-2">
								<h3 className="text-2xl">{title}</h3>
								<p className="text-primary/80 text-sm">{description}</p>
							</div>
						</article>
					))}
				</div>
			</section>
		</>
	)
}
