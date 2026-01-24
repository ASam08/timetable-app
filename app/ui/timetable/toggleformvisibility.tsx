"use client";

import CreateTimetable from "@/app/ui/timetable/createtimetableform";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function ToggleFormVisibility() {   
    const [isVisible, setIsVisible] = useState(false);
    const toggleVisibility = () => {
        setIsVisible(!isVisible);
    }
    return (
        <div>
            {/* {isVisible && <CreateTimetable />            } */}
            <div className={`${isVisible ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0' } overflow-hidden transition-all duration-500 ease-in-out`}>
                <CreateTimetable />
            </div>
            <Button onClick={toggleVisibility} className="mb-4 text-white bg-blue-600">
                {isVisible ? 'Close' : 'Create New Timetable'} 
            </Button>
        </div>
    );
}