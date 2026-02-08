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
import { addTimetableBlock, BlockState } from "@/lib/actions";
import Link from "next/link";
import { useState, useActionState } from "react";

export default function AddTimetableBlock() {
    const initialState: BlockState = { message: null, errors: {} };
    const [state, formAction] = useActionState(addTimetableBlock, initialState); // TODO - sort out state could be null issue
    const [dayValue, setDayValue] = useState<string>("");

    const dow = [
    { label: "Monday", value: 1 },
    { label: "Tuesday", value: 2 },
    { label: "Wednesday", value: 3 },
    { label: "Thursday", value: 4 },
    { label: "Friday", value: 5 },
    { label: "Saturday", value: 6 },
    { label: "Sunday", value: 7 },
    ];

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

                    <Combobox value={dayValue} onValueChange={(value) => setDayValue(value ?? "")}>
                        <ComboboxInput
                        placeholder="Select a day"
                        value={dow.find(d => String(d.value) === dayValue)?.label ?? ""}
                        readOnly
                        />

                        <ComboboxContent>
                        <ComboboxEmpty>No days found.</ComboboxEmpty>

                        <ComboboxList>
                            {dow.map((item) => (
                            <ComboboxItem
                                key={item.value}
                                value={String(item.value)}
                            >
                                {item.label}
                            </ComboboxItem>
                            ))}
                        </ComboboxList>
                        </ComboboxContent>
                    </Combobox>

                    {/* This is what the server action reads */}
                    <input type="hidden" name="day_of_week" value={dayValue} />
                    {/* TODO - Sort out why this isn't working*/}
                    <div id="day_error" aria-live="polite" aria-atomic="true">
                        {state.errors?.day &&
                        state.errors.day.map((error: string) => (
                            <p className="text-sm text-red-500" key={error}>
                                {error}
                            </p>))
                        }
                    </div>
                    </div>
                <div className="grid gap-3">
                    <Label>Subject</Label>
                    <Input type="text" id="subject" name="subject" placeholder="e.g. Maths" />
                    <div id="subject_error" aria-live="polite" aria-atomic="true">
                        {state.errors?.subject &&
                        state.errors.subject.map((error: string) => (
                            <p className="text-sm text-red-500" key={error}>
                                {error}
                            </p>))
                        }
                    </div>
                </div>
                <div className="grid gap-3">
                    <Label>Location</Label>
                    <Input type="text" id="location" name="location" placeholder="e.g. Room 101" />
                    <div id="location_error" aria-live="polite" aria-atomic="true">
                        {state.errors?.location &&
                        state.errors.location.map((error: string) => (
                            <p className="text-sm text-red-500" key={error}>
                                {error}
                            </p>))
                        }
                    </div>
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
                        <div id="start_time_error" aria-live="polite" aria-atomic="true">
                            {state.errors?.start_time &&
                            state.errors.start_time.map((error: string) => (
                                <p className="text-sm text-red-500" key={error}>
                                    {error}
                                </p>))
                            }
                        </div>
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
                    <div id="end_time_error" aria-live="polite" aria-atomic="true">
                        {state.errors?.end_time &&
                        state.errors.end_time.map((error: string) => (
                            <p className="text-sm text-red-500" key={error}>
                                {error}
                            </p>))
                        }
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