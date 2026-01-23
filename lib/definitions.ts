export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  created_at: string;
  updated_at: string;
};

export type TimetableSet = {
  id: string;
  owner_id: string;
  title: string;
  description: string;
  created_at: string;
  updated_at: string;
};

export type TimetableBlock = {
  id: string;
  timetable_set_id: string;
  start_time: string;
  end_time: string;
  day_of_week:
    | "Monday"
    | "Tuesday"
    | "Wednesday"
    | "Thursday"
    | "Friday"
    | "Saturday"
    | "Sunday";
  created_at: string;
  updated_at: string;
};

export type TimetableEntry = {
  id: string;
  timetable_set_id: string;
  timetable_block_id: string;
  subject: string;
  location: string;
  created_at: string;
  updated_at: string;
};

export type UserTimetableSets = {
  id: string;
  user_id: string;
  timetable_set_id: string;
};

export type Version = {
  version: string;
};
