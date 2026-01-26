"use client";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
    DialogClose,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Combobox,
    ComboboxContent,
    ComboboxInput,
    ComboboxItem,
    ComboboxList,
    ComboboxEmpty,
} from "@/components/ui/combobox";
import { Field, FieldLabel } from "@/components/ui/field";
import { addTimetableBlock } from "@/lib/actions";
import { get } from "http";
import { getTimetableSets } from "@/lib/data";

export default function AddTimetableBlock() {
    const dow = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    const formAction = addTimetableBlock;
    const timetable_set_id = getTimetableSets;

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">Add Timetable Block</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-lg">
                <form id="blockform" onSubmit={formAction}>
                    <DialogHeader>
                        <DialogTitle>Add Timetable Block</DialogTitle>
                        <DialogDescription>
                            Fill in the details below to add a new block to your timetable.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4">
                        <div className="grid gap-3">
                            <Label>Day</Label>
                            <Combobox  items={dow}>
                                <ComboboxInput placeholder="Select a day" id="day" name="day" type="text" />
                                <ComboboxContent >
                                    <ComboboxEmpty>No days found.</ComboboxEmpty>
                                    <ComboboxList >
                                        {(item) => (
                                            <ComboboxItem key={item} value={item}>
                                                {item}
                                            </ComboboxItem>
                                        )}
                                    </ComboboxList>
                                </ComboboxContent>
                            </Combobox>
                            {/* <Input type="text" placeholder="e.g. Monday" /> */}
                        </div>
                        <div className="grid gap-3">
                            <Label>Subject</Label>
                            <Input type="text" id="subject" name="subject" placeholder="e.g. Maths" />
                        </div>
                        <div className="grid-cols-2 flex gap-8">
                            <div className="grid gap-3">
                                <Field className="flex">
                                    <FieldLabel htmlFor="start-time-picker">Start Time</FieldLabel>
                                    <Input
                                    type="time"
                                    id="start_time"
                                    name="start_time"
                                    step="300"
                                    defaultValue="09:30"
                                    className="pr-4 bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                                    />
                                </Field>
                            </div>
                            <div className="grid gap-3">
                                <Field className="flex">
                                    <FieldLabel htmlFor="finish-time-picker">Finish Time</FieldLabel>
                                    <Input
                                    type="time"
                                    id="finish_time"
                                    name="finish_time"
                                    step="300"
                                    defaultValue="10:30"
                                    className="pr-4 bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                                    />
                                </Field>
                                <Field className="hidden">
                                    <Input id="timetable_set_id" readOnly/>{timetable_set_id}
                                </Field>
                            </div> 
                        </div>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button type="submit" form="blockform">Save changes</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>

    )
}