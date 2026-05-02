import { relations } from "drizzle-orm";
import {
  users,
  timetableSets,
  userTimetableSets,
  userSettings,
  timetableBlocks,
  session,
  account,
} from "./schema";

export const usersRelations = relations(users, ({ many }) => ({
  timetableSets: many(timetableSets),
  userTimetableSets: many(userTimetableSets),
  userSettings: many(userSettings),
  sessions: many(session),
  accounts: many(account),
}));

export const timetableSetsRelations = relations(
  timetableSets,
  ({ one, many }) => ({
    owner: one(users, {
      fields: [timetableSets.ownerId],
      references: [users.id],
    }),
    userTimetableSets: many(userTimetableSets),
    timetableBlocks: many(timetableBlocks),
  }),
);

export const userTimetableSetsRelations = relations(
  userTimetableSets,
  ({ one }) => ({
    user: one(users, {
      fields: [userTimetableSets.userId],
      references: [users.id],
    }),
    timetableSet: one(timetableSets, {
      fields: [userTimetableSets.timetableSetId],
      references: [timetableSets.id],
    }),
  }),
);

export const userSettingsRelations = relations(userSettings, ({ one }) => ({
  user: one(users, {
    fields: [userSettings.userId],
    references: [users.id],
  }),
}));

export const timetableBlocksRelations = relations(
  timetableBlocks,
  ({ one }) => ({
    timetableSet: one(timetableSets, {
      fields: [timetableBlocks.timetableSetId],
      references: [timetableSets.id],
    }),
  }),
);

export const sessionRelations = relations(session, ({ one }) => ({
  user: one(users, {
    fields: [session.userId],
    references: [users.id],
  }),
}));

export const accountRelations = relations(account, ({ one }) => ({
  user: one(users, {
    fields: [account.userId],
    references: [users.id],
  }),
}));
