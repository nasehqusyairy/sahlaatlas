import { Wrench } from "lucide-react"
import { Button } from "~/components/ui/button"
import {
    Empty,
    EmptyContent,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
} from "~/components/ui/empty"

export function Maintenance() {
    return (
        <div className="container mx-auto py-12 px-4">
            <div className="flex justify-center">
                <div className="md:w-1/2 lg:w-4/12">
                    <Empty className="border">
                        <EmptyHeader>
                            <EmptyMedia variant="icon">
                                <Wrench className="bg-primary text-primary-foreground p-2 size-8" />
                            </EmptyMedia>
                            <EmptyTitle>Under Maintenance</EmptyTitle>
                            <EmptyDescription>
                                This page is currently undergoing scheduled maintenance. We'll be back
                                shortly. Thank you for your patience.
                            </EmptyDescription>
                        </EmptyHeader>
                        <EmptyContent className="flex-row justify-center gap-2">
                            <Button variant={'outline'} onClick={() => window.location.reload()}>Refresh</Button>
                        </EmptyContent>
                    </Empty>
                </div>
            </div>
        </div>
    )
}