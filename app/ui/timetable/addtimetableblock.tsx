"use client";

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
import { getTimetableSets } from "@/lib/data";
import Link from "next/link";

export default function AddTimetableBlock() {
    const dow = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    const formAction = addTimetableBlock;
    const timetable_set_id = getTimetableSets;

    return (
        <form action={formAction}>
            <div className="pb-4">
                <h1 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">
                    Add Timetable Block
                </h1>
                <div className="grid gap-3">
                    Fill in the details below to add a new block to your timetable.
                </div>
            </div>
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
                <div className="grid gap-3">
                    <Label>Location</Label>
                    <Input type="text" id="location" name="location" placeholder="e.g. Room 101" />
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
                            id="end_time"
                            name="end_time"
                            step="300"
                            defaultValue="10:30"
                            className="pr-4 bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                            />
                        </Field>
                        {/* <Field className="hidden">
                            <Input id="timetable_set_id" readOnly/>{timetable_set_id}
                        </Field> */}
                    </div> 
                </div>
            </div>
            <div className="flex flex-row py-4 gap-4">
                <Link href='/dashboard/timetable'>
                    <Button variant="outline">Cancel</Button>
                </Link>
                <Button type="submit">Save changes</Button>
            </div>
        </form>
    


    )
}