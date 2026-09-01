import { Button } from "~/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "~/components/ui/dialog"
import type { ReactNode } from "react";

export type FormDialogProps = {
    title: string
    description: string
    isOpen: boolean
    isSubmitting: boolean
    onClose: () => void
    onSubmit: (data: FormData) => void
    children: ReactNode
}

export function FormDialog(props: FormDialogProps) {
    return (
        <Dialog open={props.isOpen} onOpenChange={props.onClose}>
            <form onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                props.onSubmit(formData);
            }}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className={'capitalize'}>{props.title}</DialogTitle>
                        <DialogDescription>
                            {props.description}
                        </DialogDescription>
                    </DialogHeader>
                    {props.children}
                    <DialogFooter>
                        <DialogClose render={<Button variant="outline">Cancel</Button>} onClick={props.onClose} />
                        <Button type="submit" disabled={props.isSubmitting}>{props.isSubmitting ? 'Saving...' : 'Save'}</Button>
                    </DialogFooter>
                </DialogContent>
            </form>
        </Dialog>
    )
}
