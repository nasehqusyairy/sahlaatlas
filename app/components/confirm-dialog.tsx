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

export function ConfirmDialog(props: {
    title: string
    description: string
    isOpen: boolean
    isConfirming: boolean
    onClose: () => void
    onConfirm: () => void
    onAbort: () => void
}) {
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
                    <AlertDialogAction onClick={props.onConfirm} disabled={props.isConfirming}>
                        {props.isConfirming ? "Processing..." : "Confirm"}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
