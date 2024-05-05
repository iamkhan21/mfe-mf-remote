import type { Story, StoryDefault } from "@ladle/react";
import UserCard from "./user-card";

export default {
  title: "User Card",
} satisfies StoryDefault;

export const DefaultUserCard: Story = UserCard;

DefaultUserCard.storyName = "User Card";

DefaultUserCard.args = {
  label: "Click me",
};
