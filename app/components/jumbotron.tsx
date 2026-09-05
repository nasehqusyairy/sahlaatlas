import { Card, CardContent } from "~/components/ui/card"
// import { Button } from "~/components/ui/button"
// import { ArrowRight } from "lucide-react"

interface JumbotronProps {
    userName?: string
}

export function Jumbotron({ userName = "Admin" }: JumbotronProps) {
    const getGreeting = () => {
        const hour = new Date().getHours()
        if (hour < 12) return "Good morning"
        if (hour < 15) return "Good afternoon"
        if (hour < 18) return "Good evening"
        return "Good evening"
    }

    return (
        <Card>
            <CardContent className="p-6 sm:p-8">
                <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
                    <div className="space-y-2">

                        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                            {getGreeting()}, {userName}
                        </h1>

                        <p className="max-w-xl text-sm sm:text-base">
                            Welcome back.
                            {/* Here is a summary of your performance and system activity today. */}
                        </p>
                    </div>

                    {/* <div className="flex shrink-0 items-center gap-3">
                        <Button variant="outline">
                            Lihat Laporan
                        </Button>
                        <Button>
                            Buat Projek <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </div> */}
                </div>
            </CardContent>
        </Card>
    )
}