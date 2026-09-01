import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "~/components/ui/alert-dialog"
import { Button } from "~/components/ui/button"

export type ConfirmDialogProps = {
    title: string
    description: string
    isOpen: boolean
    onClose: () => void
    onConfirm: () => void
    onAbort: () => void
}

export function ConfirmDialog(props: ConfirmDialogProps) {
    return (
        <AlertDialog open={props.isOpen} onOpenChange={props.onClose}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{props.title}</AlertDialogTitle>
                    <AlertDialogDescription>
                        {props.description}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={props.onAbort}>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={props.onConfirm}>Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
